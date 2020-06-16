from typing import List, Dict

from django.db import transaction
from django.http import HttpResponse
import django_filters
from django.views.generic import CreateView
from rest_framework import generics, status, permissions, decorators
from rest_framework import viewsets, renderers
import json

from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action, api_view, authentication_classes, permission_classes
from rest_framework.generics import get_object_or_404, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import School, QA, Tag, User, PrioritizedTag
from .serializers import QASerializer, SchoolSerializer, TagSerializer, UserSerializer, PrioritizedTagsSerializer
from .models import School, QA, ApplicantAccount
from .serializers import QASerializer, SchoolSerializer


# Create your views here.

def index(request):
    return HttpResponse("Hello World!")


def return_json(request):
    search_result = request.GET.get('search')  # contains parameter passed to search bar
    tags_result = request.GET.get('tags')

    schools = School.objects.none()
    tags = Tag.objects.none()

    if search_result is not None:
        if search_result:
            schools = School.objects.filter(name=search_result)
        else:
            schools = School.objects.all()
        tags = get_all_tags(schools)
    elif tags_result is not None:
        if tags_result:
            tags = Tag.objects.filter(name=tags_result)
            for tag in tags:
                schools = schools | tag.school_set.all()
            tags = get_all_tags(schools)
        else:
            tags = Tag.objects.all()

    schools_json = renderers.JSONRenderer().render(SchoolSerializer(schools, many=True).data)
    tags_json = renderers.JSONRenderer().render(TagSerializer(tags, many=True).data)
    tags_school = b'{ "schools": ' + schools_json + b', "tags": ' + tags_json + b' }'
    return HttpResponse(tags_school, content_type='application/json')


class TagsViewSet(viewsets.ModelViewSet):
    renderers = [renderers.JSONRenderer]
    authentication_classes = []

    queryset = Tag.objects.all()
    serializer_class = TagSerializer


# FIXME there might be some unnecassy repetition with school list, which can probably be merged into this
class SchoolViewSet(viewsets.ModelViewSet):
    renderers = [renderers.JSONRenderer]
    authentication_classes = []

    queryset = School.objects.all()
    serializer_class = SchoolSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        (user, _) = TokenAuthentication().authenticate(request)

        school = serializer.instance
        user.schoolaccount.school = school
        user.schoolaccount.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


def get_all_tags(schools):
    tags = Tag.objects.none()
    for school in schools:
        tags = tags.union(school.tags.all())
    return tags


class PrioritizedTagsSet(viewsets.ModelViewSet):
    renderer_classes = [renderers.JSONRenderer]
    authentication_classes = []

    queryset = PrioritizedTag.objects.all()
    serializer_class = PrioritizedTagsSerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['school', 'tag', 'priority']

    # https://stackoverflow.com/questions/14666199/how-do-i-create-multiple-model-instances-with-django-rest-framework
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class QAViewSet(viewsets.ModelViewSet):
    renderer_classes = [renderers.JSONRenderer]  # Disables web view
    authentication_classes = []  # FIXME this drops authentication

    queryset = QA.objects.all()
    serializer_class = QASerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['recipient_school']


def current_user_account_or_default(request) -> ApplicantAccount:
    if (request.user is not None) and request.user.is_authenticated:
        return request.user.applicantaccount
    return ApplicantAccount.default()


# TODO need to check that user is useraccount and not schoolaccount
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_saved_schools(request):
    account = request.user.applicantaccount
    saved_schools = account.saved_schools.all()
    serializer = SchoolSerializer(saved_schools, many=True)
    return Response(serializer.data)


@api_view(['POST', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def saved_school(request, school_id):
    account = request.user.applicantaccount
    school = get_object_or_404(School, id=school_id)

    if request.method == 'POST':
        account.saved_schools.add(school)
        res_status = status.HTTP_201_CREATED
    elif request.method == 'DELETE':
        account.saved_schools.remove(school)
        res_status = status.HTTP_204_NO_CONTENT
    else:
        raise RuntimeError("This code should never run")

    return Response(status=res_status)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_saved_qas(request):
    account = request.user.applicantaccount
    saved_qas = account.saved_qas.all()
    serializer = QASerializer(saved_qas, many=True)
    return Response(serializer.data)


@api_view(['POST', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def saved_qa(request, qa_id):
    account = request.user.applicantaccount
    qa = get_object_or_404(QA, id=qa_id)

    if request.method == 'POST':
        account.saved_qas.add(qa)
        res_status = status.HTTP_201_CREATED
    elif request.method == 'DELETE':
        account.saved_qas.remove(qa)
        res_status = status.HTTP_204_NO_CONTENT
    else:
        raise RuntimeError("This code should never run")

    return Response(status=res_status)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def current_user(request):
    user: User = request.user
    serializer = UserSerializer(user)
    data = serializer.data

    if user.is_school and user.schoolaccount.school is not None:
        school_serializer = SchoolSerializer(user.schoolaccount.school)
        data.update({
            'school': school_serializer.data
        })

    return Response(data)


Priority = int


# general idea of matching algorithm
def sort_schools(schools: List[School], tag_priority: Dict[Tag, Priority]) -> List[School]:
    score = {}
    for school in schools:
        relevant_prioritized_tags = (pt for pt in school.prioritized_tags.all() if pt in tag_priority)
        score[school] = sum(min(tag_priority[pt.tag], pt.priority) for pt in relevant_prioritized_tags)

    return sorted(schools, key=lambda s: score[s])

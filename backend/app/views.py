from django.http import HttpResponse
import django_filters
from rest_framework import generics, status, permissions
from rest_framework import viewsets, renderers
from rest_framework.decorators import action, api_view, authentication_classes, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from .models import School, QA, UserAccount
from .serializers import QASerializer, SchoolSerializer


# Create your views here.

def index(request):
    return HttpResponse("Hello World!")


def return_json(request):
    search_result = request.GET.get('search')  # contains parameter passed to search bar

    schools = School.objects.all()

    if search_result:
        schools = schools.filter(name=search_result)

    ser = SchoolSerializer(schools, many=True)
    return HttpResponse(renderers.JSONRenderer().render(ser.data), content_type='application/json')


class SchoolList(generics.ListAPIView):
    serializer_class = SchoolSerializer

    def get_queryset(self):
        queryset = School.objects.all()
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = queryset.filter(name=search)
        return queryset


# FIXME there might be some unnecassy repetition with school list, which can probably be merged into this
class SchoolViewSet(viewsets.ModelViewSet):
    renderers = [renderers.JSONRenderer]
    authentication_classes = []

    queryset = School.objects.all()
    serializer_class = SchoolSerializer


class QAViewSet(viewsets.ModelViewSet):
    renderer_classes = [renderers.JSONRenderer]  # Disables web view
    authentication_classes = []  # FIXME this drops authentication

    queryset = QA.objects.all()
    serializer_class = QASerializer

    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['recipient_school']


def current_user_account_or_default(request) -> UserAccount:
    if (request.user is not None) and request.user.is_authenticated:
        return request.user.useraccount
    return UserAccount.objects.get(user_id=2)


@api_view(['GET'])
def list_saved_schools(request):
    account = current_user_account_or_default(request)
    return Response(account.saved_schools.all())


@api_view(['POST', 'DELETE'])
def saved_school(request, school_id):
    account = current_user_account_or_default(request)
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
def list_useful_qas(request):
    account = current_user_account_or_default(request)
    return Response(account.useful_qas.all())


@api_view(['POST', 'DELETE'])
def useful_qa(request, qa_id):
    account = current_user_account_or_default(request)
    qa = get_object_or_404(QA, id=qa_id)

    if request.method == 'POST':
        account.useful_qas.add(qa)
        res_status = status.HTTP_201_CREATED
    elif request.method == 'DELETE':
        account.useful_qas.remove(qa)
        res_status = status.HTTP_204_NO_CONTENT
    else:
        raise RuntimeError("This code should never run")

    return Response(status=res_status)

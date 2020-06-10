from django.http import HttpResponse
from rest_framework import viewsets, renderers
import json

from .models import School, QA, Tag
from .serializers import QASerializer, SchoolSerializer, TagSerializer


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
        tags = Tag.objects.filter(name=tags_result)
        for tag in tags:
            schools = schools | tag.school_set.all()
        tags = get_all_tags(schools)

    schools_json = renderers.JSONRenderer().render(SchoolSerializer(schools, many=True).data)
    tags_json = renderers.JSONRenderer().render(TagSerializer(tags, many=True).data)
    tags_school = b'{ "schools": ' + schools_json + b', "tags": ' + tags_json + b' }'
    return HttpResponse(tags_school, content_type='application/json')


def get_all_tags(schools):
    tags = Tag.objects.none()
    for school in schools:
        tags = tags.union(school.tags.all())
    return tags


class QAViewSet(viewsets.ModelViewSet):
    renderer_classes = [renderers.JSONRenderer]  # Disables web view
    authentication_classes = []  # FIXME this drops authentication

    queryset = QA.objects.all()
    serializer_class = QASerializer

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

    schools = School.objects.all()

    if search_result:
        schools = schools.filter(name=search_result)

    tags = Tag.objects.none()
    for school in schools:
        tags = tags | school.tags.all()

    schools_json = renderers.JSONRenderer().render(SchoolSerializer(schools, many=True).data)
    tags_json = renderers.JSONRenderer().render(TagSerializer(tags, many=True).data)
    tags_school = b'{ "schools": ' + schools_json + b', "tags": ' + tags_json + b' }'
    return HttpResponse(tags_school, content_type='application/json')


class QAViewSet(viewsets.ModelViewSet):
    renderer_classes = [renderers.JSONRenderer]  # Disables web view
    authentication_classes = []  # FIXME this drops authentication

    queryset = QA.objects.all()
    serializer_class = QASerializer

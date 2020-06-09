from django.http import HttpResponse
import django_filters
from rest_framework import generics
from rest_framework import viewsets, renderers
from rest_framework.decorators import action

from .models import School, QA
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
    filterset_fields =['recipient_school']

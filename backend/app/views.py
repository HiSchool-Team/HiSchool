from django.http import HttpResponse, JsonResponse
from rest_framework import serializers, generics
from rest_framework import viewsets, renderers

from .models import School, QA
from .serializers import QASerializer


# Create your views here.

def index(request):
    return HttpResponse("Hello World!")


def return_json(request):
    search_result = request.GET.get('search')  # contains parameter passed to search bar

    schools = School.objects.filter(name=search_result)

    # ser = SchoolSerializer(schools) TODO Rishi
    # return HttpResponse(ser.data, content_type='application/json')
    return JsonResponse(list(schools.values()), safe=False)


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'


class SchoolList(generics.ListAPIView):
    serializer_class = SchoolSerializer

    def get_queryset(self):
        queryset = School.objects.all()
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = queryset.filter(name=search)
        return queryset


class QAViewSet(viewsets.ModelViewSet):
    renderer_classes = [renderers.JSONRenderer]  # Disables web view
    authentication_classes = []  # FIXME this drops authentication

    queryset = QA.objects.all()
    serializer_class = QASerializer

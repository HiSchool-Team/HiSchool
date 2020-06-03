from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets, renderers

from .serializers import SchoolSerializer, QASerializer
from .models import School, QA


# Create your views here.


def index(request):
    return HttpResponse("Hello World!")


def schools(request):
    schools_list = School.objects.all()
    context = {'schools': schools_list}
    return render(request, 'app/schools.html', context)


def return_json(request):
    search_result = request.GET.get('search')  # contains parameter passed to search bar
    data = [
        {
            "id": 0,
            "name": "High School of Happy Sciences",
            "description": "XV. Gimnazija is the best school in Croatia",
            "img_src": "https://www.srednja.hr/app/uploads/2016/02/MIOC-1.jpg"
        },
    ]

    return JsonResponse(data, safe=False)


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer


class QAViewSet(viewsets.ModelViewSet):
    # Disable web view
    renderer_classes = [renderers.JSONRenderer]

    queryset = QA.objects.all()
    serializer_class = QASerializer


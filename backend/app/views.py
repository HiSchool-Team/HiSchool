from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets

from .api.serializers import SchoolSerializer
from .models import School


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
        {
            "id": 1,
            "name": "Paddington School of Arts",
            "description": "Former competitor with XV. Gimnazija for the title of the best school in Zagreb. Recently, it's reputation tumbled but is still a respectable school",
            "img_src": "https://radio.hrt.hr/data/article/188409_afb32584e4e79020976f.jpg"
        }
    ]

    return JsonResponse(data, safe=False)


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

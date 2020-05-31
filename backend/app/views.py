from django.http import HttpResponse
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


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

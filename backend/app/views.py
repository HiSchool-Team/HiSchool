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
    search_result = request.GET.get('search')
    data = {
        'search_result': search_result
    }

    return JsonResponse(data)


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

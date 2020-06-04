import json

from django.core import serializers as s
from rest_framework import serializers, generics
from django.http import HttpResponse, JsonResponse

from .models import School


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


class PurchaseList(generics.ListAPIView):
    serializer_class = SchoolSerializer

    def get_queryset(self):
        queryset = School.objects.all()
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = queryset.filter(name=search)
        return queryset

from django.urls import path, include

from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'qa', views.QAViewSet)

urlpatterns = [
    #path('', views.return_json),
    path('api/', include(router.urls))
]

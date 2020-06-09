from django.urls import path, include

from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'qa', views.QAViewSet)
router.register(r'school', views.SchoolViewSet)

urlpatterns = [
    path('api/search/', views.return_json),
    path('api/', include(router.urls)),
    path('api/user/saved_school/', views.list_saved_schools),
    path('api/user/saved_school/<int:school_id>/', views.saved_school),
    path('api/user/useful_qa/', views.list_useful_qas),
    path('api/user/useful_qa/<int:qa_id>/', views.useful_qa),
]

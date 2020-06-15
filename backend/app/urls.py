from django.conf.urls import url
from django.urls import path, include

from . import views
from rest_framework import routers
from rest_framework.authtoken import views as auth_views

router = routers.DefaultRouter()
router.register(r'qa', views.QAViewSet)
router.register(r'school', views.SchoolViewSet)
router.register(r'tag', views.TagsViewSet)

urlpatterns = [
    url(r'^api/rest_auth/', include('rest_auth.urls')),
    url(r'^api/rest_auth/registration/', include('rest_auth.registration.urls')),
    path('api/current_user/', views.current_user),
    path('api/search/', views.return_json),
    path('api/', include(router.urls)),
    path('api/account/applicant/saved_school/', views.list_saved_schools),
    path('api/account/applicant/saved_school/<int:school_id>/', views.saved_school),
    path('api/account/applicant/saved_qa/', views.list_saved_qas),
    path('api/account/applicant/saved_qa/<int:qa_id>/', views.saved_qa),
]

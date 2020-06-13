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
    path('api/search/', views.return_json),
    path('api/', include(router.urls)),
    path('api/user/saved_school/', views.list_saved_schools),
    path('api/user/saved_school/<int:school_id>/', views.saved_school),
    path('api/user/saved_qa/', views.list_saved_qas),
    path('api/user/saved_qa/<int:qa_id>/', views.saved_qa),
    path('api/token_auth/', auth_views.obtain_auth_token)
]

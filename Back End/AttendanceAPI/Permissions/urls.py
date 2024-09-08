from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PermisssionViewset
 
router = DefaultRouter()
router.register('', PermisssionViewset, basename='Permissions')
app_name ='Permissions'
 
urlpatterns=[
    path('', include(router.urls))
]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeaveTypeViewset
 
router = DefaultRouter()
router.register('', LeaveTypeViewset, basename='LeaveType')
app_name ='LeaveTypes'
 
urlpatterns=[
    path('', include(router.urls))
]
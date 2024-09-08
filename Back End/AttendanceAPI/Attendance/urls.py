from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttendanceViewset
 
router = DefaultRouter()
router.register('', AttendanceViewset, basename='Attendance')
app_name ='Attendance'
 
urlpatterns=[
    path('', include(router.urls))
]
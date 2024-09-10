from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttendanceViewset,AttendanceStatusViewSet
 
router = DefaultRouter()
router.register('detail', AttendanceViewset, basename='Attendance')
router.register(r'status', AttendanceStatusViewSet, basename='attendance-status')
app_name ='Attendance'
 
urlpatterns=[
    path('', include(router.urls))
]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeaveRequestsViewset,LeaveStatusViewset
 
router = DefaultRouter()
router.register('', LeaveRequestsViewset, basename='LeaveRequests')
router.register('', LeaveStatusViewset, basename='LeaveStatus')
app_name ='LeaveRequests'
 
urlpatterns=[
    path('', include(router.urls)),
    path('status', include(router.urls)),
]
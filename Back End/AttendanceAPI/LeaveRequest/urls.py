from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeaveRequestsViewset,LeaveStatusViewset
 
router = DefaultRouter()
router.register('details', LeaveRequestsViewset, basename='LeaveRequests')
router.register('status', LeaveStatusViewset, basename='LeaveStatus')
app_name ='LeaveRequests'
 
urlpatterns=[
    path('', include(router.urls)),
    path('', include(router.urls)),
]
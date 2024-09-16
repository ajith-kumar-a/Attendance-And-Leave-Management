from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeaveRequestsViewset,LeaveStatusViewset,LeaveRequestsByRoleView
 
router = DefaultRouter()
router.register('details', LeaveRequestsViewset, basename='LeaveRequests')
router.register('status', LeaveStatusViewset, basename='LeaveStatus')
app_name ='LeaveRequests'
 
urlpatterns=[
    path('', include(router.urls)),
    path('', include(router.urls)),
    path('leave-requests/by-role/<int:role_id>/', LeaveRequestsByRoleView.as_view(), name='leave-requests-by-role'),

]
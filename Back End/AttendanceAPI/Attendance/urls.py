from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttendanceViewset, AttendanceStatusViewSet, AttendanceByRoleView, AttendanceByUserView

router = DefaultRouter()
router.register('detail', AttendanceViewset, basename='Attendance')
router.register(r'status', AttendanceStatusViewSet, basename='attendance-status')
app_name = 'Attendance'

urlpatterns = [
    path('', include(router.urls)),
    # path('public-attendance/', PublicAttendanceListView.as_view(), name='public-attendance'),
    path('detail/by-role/<int:role_id>/', AttendanceByRoleView.as_view(), name='attendance-by-role'),
    path('detail/by-user/<int:user_id>/', AttendanceByUserView.as_view(), name='attendance-by-user'),
]

# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import RoleViewset
 
# router = DefaultRouter()
# router.register('re', RoleViewset, basename='Role')
# app_name ='Roles'
 
# urlpatterns=[
#     path('', include(router.urls))
# ]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoleViewset, PublicRoleListView  # Import the new view

router = DefaultRouter()
router.register('', RoleViewset, basename='Role')

app_name = 'Roles'

urlpatterns = [
    path('re/', include(router.urls)),
    path('public-roles/', PublicRoleListView.as_view(), name='public-role-list'), 
]

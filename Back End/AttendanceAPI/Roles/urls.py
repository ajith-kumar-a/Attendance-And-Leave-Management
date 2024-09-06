from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoleViewset
 
router = DefaultRouter()
router.register('', RoleViewset, basename='Role')
app_name ='Roles'
 
urlpatterns=[
    path('re', include(router.urls))
]
# from django.urls import path
 
# from .views import RoleViewset 
 
# app_name = 'Roleapp'
 
# urlpatterns = [
#     path('register',RoleViewset),
#     # path('me',ManageUserView.as_view(),name="me")
# ]
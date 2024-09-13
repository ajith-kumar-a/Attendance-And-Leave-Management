# userdetails/urls.py
from django.urls import path, re_path
from .views import UserDetailsViewSet

userdetails_list = UserDetailsViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

userdetails_detail = UserDetailsViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns = [
    path('userdetails/', userdetails_list, name='userdetails-list'),
    re_path(r'userdetails/(?P<user_id>\d+)/$', userdetails_detail, name='userdetails-detail'),
]

# from django.urls import path
# from .views import UserDetailsListCreateView, UserDetailsRetrieveUpdateDestroyView, UserDetailsByUserView

# urlpatterns = [
#     path('userdetails/', UserDetailsListCreateView.as_view(), name='userdetails-list-create'),
#     path('userdetails/<int:pk>/', UserDetailsRetrieveUpdateDestroyView.as_view(), name='userdetails-retrieve-update-destroy'),
#     path('userdetails/by-user/<int:user_id>/', UserDetailsByUserView.as_view(), name='userdetails-by-user'),
# ]


from django.urls import path
from .views import UserDetailsListCreateView, UserDetailsRetrieveUpdateDestroyView, UserDetailsByUserView, UserDetailsUpdateByUserView

urlpatterns = [
    path('userdetails/', UserDetailsListCreateView.as_view(), name='userdetails-list-create'),
    path('userdetails/<int:pk>/', UserDetailsRetrieveUpdateDestroyView.as_view(), name='userdetails-retrieve-update-destroy'),
    path('userdetails/by-user/<int:user_id>/', UserDetailsByUserView.as_view(), name='userdetails-by-user'),
    path('userdetails/update-by-user/<int:user_id>/', UserDetailsUpdateByUserView.as_view(), name='userdetails-update-by-user'),
]

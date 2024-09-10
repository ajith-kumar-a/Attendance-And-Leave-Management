from django.urls import path
from .views import RegisterUserAPIView, ManageUserView, ListUsersAPIView
from .views import UpdateUserProfilePictureView,UpdateUserDetailsView,UserListByRoleAPIView

urlpatterns = [
    path('all/', ListUsersAPIView.as_view(), name='list-users'),
    path('register/', RegisterUserAPIView.as_view(), name='register-user'),
    path('me/', ManageUserView.as_view(), name='manage-user'),
    # path('userupdate-profile-picture/<int:user_id>/', UpdateUserProfilePictureView.as_view(), name='update-profile-picture')
    path('api/user/update-profile-picture/<int:user_id>/', UpdateUserProfilePictureView.as_view(), name='update-profile-picture'),
    path('user/update-details/<int:user_id>/', UpdateUserDetailsView.as_view(), name='update-user-details'),
    path('users/by-role/<int:role_id>/', UserListByRoleAPIView.as_view(), name='user-list-by-role'),

]


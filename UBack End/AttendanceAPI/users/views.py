from django.shortcuts import render
from .serializers import UserSerializer, RegisterSerializer
from rest_framework.response import Response
from rest_framework import generics,status
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User  
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.http import Http404
from .serializers import UserDetailSerializer
from .serializers import UserImageSerializer

 # Create your views here.
# @extend_schema(auth=[])
class RegisterUserAPIView(APIView):
    """Create User for authentication."""
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer
 
    @swagger_auto_schema(
        request_body=RegisterSerializer,
        # query_serializer=RegisterSerializer,
        security=[],
    )
    def post(self, request):
        """Get request data & save."""
        serializer = RegisterSerializer(data=request.data)
 
        if not serializer.is_valid():
            print(serializer.errors)
            return Response({
                'status':status.HTTP_400_BAD_REQUEST,
                'errors':serializer.errors,
                'message':'Invalid data'
            })
 
        serializer.save()
        return Response({
            'status':status.HTTP_201_CREATED,
            'data':serializer.data,
            'message':'User added successfully'
        })
 
class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
 
    def get_object(self):
        return self.request.user
 
    #  get data
    def get(self, *args):
        user_obj = self.get_object()
        serializer = UserSerializer(user_obj)
 
        return Response(({
            'status':status.HTTP_200_OK,
            'data':serializer.data
        }))
    

class ListUsersAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="List all users",
        security=[{'Bearer': []}],  
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class UpdateUserProfilePictureView(generics.UpdateAPIView):
    serializer_class = UserImageSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise Http404

    def patch(self, request, *args, **kwargs):
        user_id = self.kwargs.get('user_id')
        print(f"User ID from URL: {user_id}")  # Debug print statement
        print(f"Request data: {request.data}")  # Debug print statement

        if not (self.request.user.is_superuser or self.request.user.id == int(user_id)):
            return Response({
                'status': status.HTTP_403_FORBIDDEN,
                'message': 'You do not have permission to update this user'
            }, status=status.HTTP_403_FORBIDDEN)

        self.object = self.get_object()
        serializer = self.get_serializer(self.object, data=request.data, partial=True)

        if serializer.is_valid():
            self.perform_update(serializer)
            return Response({
                'status': status.HTTP_200_OK,
                'data': serializer.data,
                'message': 'Profile picture updated successfully'
            })
        else:
            print(f"Serializer errors: {serializer.errors}")  # Debug print statement
            return Response({
                'status': status.HTTP_400_BAD_REQUEST,
                'errors': serializer.errors,
                'message': 'Invalid data'
            })

    def perform_update(self, serializer):
        serializer.save()



class UpdateUserDetailsView(generics.UpdateAPIView):
    serializer_class = UserDetailSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise Http404

    def patch(self, request, *args, **kwargs):
        user_id = self.kwargs.get('user_id')
        print(f"User ID from URL: {user_id}")  # Debug print statement
        print(f"Request data: {request.data}")  # Debug print statement

        # Check permissions
        if not (self.request.user.is_superuser or self.request.user.id == int(user_id)):
            return Response({
                'status': status.HTTP_403_FORBIDDEN,
                'message': 'You do not have permission to update this user'
            }, status=status.HTTP_403_FORBIDDEN)

        self.object = self.get_object()
        serializer = self.get_serializer(self.object, data=request.data, partial=True)

        if serializer.is_valid():
            self.perform_update(serializer)
            return Response({
                'status': status.HTTP_200_OK,
                'data': serializer.data,
                'message': 'User details updated successfully'
            })
        else:
            print(f"Serializer errors: {serializer.errors}")  # Debug print statement
            return Response({
                'status': status.HTTP_400_BAD_REQUEST,
                'errors': serializer.errors,
                'message': 'Invalid data'
            })

    def perform_update(self, serializer):
        serializer.save()



class UserListByRoleAPIView(generics.ListAPIView):
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        role_id = self.kwargs.get('role_id')
        if not role_id:
            return User.objects.none()  # Return an empty queryset if no role_id is provided
        return User.objects.filter(role_id=role_id)

    def get(self, request, *args, **kwargs):
        role_id = self.kwargs.get('role_id')
        if not role_id:
            return Response({
                'status': status.HTTP_400_BAD_REQUEST,
                'message': 'role_id is required'
            }, status=status.HTTP_400_BAD_REQUEST)

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'status': status.HTTP_200_OK,
            'data': serializer.data,
            'message': 'Users filtered by role_id retrieved successfully'
        })






class UserDetailAPIView(generics.RetrieveAPIView):
    serializer_class = UserDetailSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]  # Allow any authenticated user to access

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, *args, **kwargs):
        # No custom permission check; rely on IsAuthenticated
        return super().get(request, *args, **kwargs)

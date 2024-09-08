from django.shortcuts import render
from . models import Role
from .serializers import RoleSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

class PublicRoleListView(APIView):
    permission_classes = [AllowAny]  # Allow any user to access this view

    def get(self, request, *args, **kwargs):
        try:
            # Get all Role objects
            Role_objs = Role.objects.all()
            # Serialize the data
            serializer = RoleSerializer(Role_objs, many=True)
            # Return the response with the data
            return Response({
                'status': status.HTTP_200_OK,
                'data': serializer.data
            })
        except Exception as e:
            print(e)
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while fetching roles'
            })

 
# Create your views here.
class RoleViewset(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
 
    def get_serializer_class(self):
            if self.action == 'list':
                return RoleSerializer
            return self.serializer_class
    
#get all authors
    def list(self,request,pk=None):
        try:
            Role_objs = Role.objects.all()
            serializer = self.get_serializer(Role_objs,many=True)
            return Response({
                'status': status.HTTP_200_OK,
                'data':serializer.data
            })
 
        except Exception as e:
            print(e)
            raise APIException({
                'message':APIException.default_detail,
                'status':APIException.status_code
            })
    #add an author
    def create(self,request,pk=None):
        try:
            serializer = self.get_serializer(data=request.data)
            if not serializer.is_valid():
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'data':serializer.errors,
                    'message':'Inavlid Data'
                })
            serializer.save()
            return Response({
                'status': status.HTTP_201_CREATED,
                'data': serializer.data,
                'message': 'Role created successfully'
            })
        except Exception as e:
            print(e)
            raise APIException({
                'message':APIException.default_detail,
                'status':APIException.status_code
            })
    
    #update all fields of author
    def update(self,request,pk=None):
        try:
            Role_objs = self.get_object()
            serializer = self.get_serializer(Role_objs,data=request.data,partial=False)
            if not serializer.is_valid():
                print(serializer.errors)
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'data':serializer.errors,
                    'message':'Inavlid Data'
                })
            serializer.save()
            return Response({
                    'status': status.HTTP_200_OK,
                    'data':serializer.data,
                    'message': 'Role Updated Successfully'
                })
 
        except Exception as e:
            print(e)
            raise APIException({
                'message':APIException.default_detail,
                'status':APIException.status_code
            })
    #update specifie
    def partial_update(self,request,pk=None):
        try:
            Role_objs = self.get_object()
            serializer = self.get_serializer(Role_objs,data=request.data,partial=True)
            if not serializer.is_valid():
                print(serializer.errors)
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'data':serializer.errors,
                    'message':'Inavlid Data'
                })
            serializer.save()
            return Response({
                    'status': status.HTTP_200_OK,
                    'data':serializer.data,
                    'message': 'Role Partial Updated Successfully'
                })
 
        except Exception as e:
            print(e)
            raise APIException({
                'message':APIException.default_detail,
                'status':APIException.status_code
            })
 
    def destroy(self,request,pk=None):
        try:
            id=pk
            Role_objs = self.get_object()
            Role_objs.delete()
 
            return Response({
                'status': status.HTTP_200_OK,
                'message':'Role deleted successfully'
            })
 
        except Exception as e:
            print(e)
            raise APIException({
                'message':APIException.default_detail,
                'status':APIException.status_code
            })
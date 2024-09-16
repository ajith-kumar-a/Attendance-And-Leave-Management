from django.shortcuts import render
from . models import Permisssion
from .serializers import PermisssionSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework import status
 
# Create your views here.
class PermisssionViewset(ModelViewSet):
    queryset = Permisssion.objects.all()
    serializer_class = PermisssionSerializer
 
    def get_serializer_class(self):
            if self.action == 'list':
                return PermisssionSerializer
            return self.serializer_class
    
#get all authors
    def list(self,request,pk=None):
        try:
            Permisssion_objs = Permisssion.objects.all()
            serializer = self.get_serializer(Permisssion_objs,many=True)
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
                'message': 'Permisssion created successfully'
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
            Permisssion_objs = self.get_object()
            serializer = self.get_serializer(Permisssion_objs,data=request.data,partial=False)
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
                    'message': 'Permisssion Updated Successfully'
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
            Permisssion_objs = self.get_object()
            serializer = self.get_serializer(Permisssion_objs,data=request.data,partial=True)
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
                    'message': 'Permisssion Partial Updated Successfully'
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
            Permisssion_objs = self.get_object()
            Permisssion_objs.delete()
 
            return Response({
                'status': status.HTTP_200_OK,
                'message':'Permisssion deleted successfully'
            })
 
        except Exception as e:
            print(e)
            raise APIException({
                'message':APIException.default_detail,
                'status':APIException.status_code
            })
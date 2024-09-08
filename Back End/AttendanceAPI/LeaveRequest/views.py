from django.shortcuts import render
from . models import LeaveRequests,LeaveStatus
from .serializers import LeaveRequestsSerializer,LeaveStatusSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

class PublicLeaveRequestsListView(APIView):
    permission_classes = [AllowAny]  # Allow any user to access this view

    def get(self, request, *args, **kwargs):
        try:
            # Get all LeaveRequests objects
            LeaveRequests_objs = LeaveRequests.objects.all()
            # Serialize the data
            serializer = LeaveRequestsSerializer(LeaveRequests_objs, many=True)
            # Return the response with the data
            return Response({
                'status': status.HTTP_200_OK,
                'data': serializer.data
            })
        except Exception as e:
            print(e)
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while fetching LeaveRequestss'
            })

 
# Create your views here.
class LeaveRequestsViewset(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = LeaveRequests.objects.all()
    serializer_class = LeaveRequestsSerializer
 
    def get_serializer_class(self):
            if self.action == 'list':
                return LeaveRequestsSerializer
            return self.serializer_class
    
#get all authors
    def list(self,request,pk=None):
        try:
            LeaveRequests_objs = LeaveRequests.objects.all()
            serializer = self.get_serializer(LeaveRequests_objs,many=True)
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
                'message': 'LeaveRequests created successfully'
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
            LeaveRequests_objs = self.get_object()
            serializer = self.get_serializer(LeaveRequests_objs,data=request.data,partial=False)
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
                    'message': 'LeaveRequests Updated Successfully'
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
            LeaveRequests_objs = self.get_object()
            serializer = self.get_serializer(LeaveRequests_objs,data=request.data,partial=True)
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
                    'message': 'LeaveRequests Partial Updated Successfully'
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
            LeaveRequests_objs = self.get_object()
            LeaveRequests_objs.delete()
 
            return Response({
                'status': status.HTTP_200_OK,
                'message':'LeaveRequests deleted successfully'
            })
 
        except Exception as e:
            print(e)
            raise APIException({
                'message':APIException.default_detail,
                'status':APIException.status_code
            })
        
        # leave status api

class PublicLeavestatustsListView(APIView):
    permission_classes = [AllowAny]  # Allow any user to access this view

    def get(self, request, *args, **kwargs):
        try:
            # Get all LeaveStatus objects
            LeaveStatus_objs = LeaveStatus.objects.all()
            # Serialize the data
            serializer = LeaveStatusSerializer(LeaveStatus_objs, many=True)
            # Return the response with the data
            return Response({
                'status': status.HTTP_200_OK,
                'data': serializer.data
            })
        except Exception as e:
            print(e)
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while fetching LeaveStatus'
            })

 
# Create your views here.
class LeaveStatusViewset(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = LeaveStatus.objects.all()
    serializer_class = LeaveStatusSerializer
 
    def get_serializer_class(self):
            if self.action == 'list':
                return LeaveStatusSerializer
            return self.serializer_class
    
#get all authors
    def list(self,request,pk=None):
        try:
            LeaveStatus_objs = LeaveStatus.objects.all()
            serializer = self.get_serializer(LeaveStatus_objs,many=True)
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
                'message': 'LeaveStatus created successfully'
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
            LeaveStatus_objs = self.get_object()
            serializer = self.get_serializer(LeaveStatus_objs,data=request.data,partial=False)
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
                    'message': 'LeaveStatus Updated Successfully'
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
            LeaveStatus_objs = self.get_object()
            serializer = self.get_serializer(LeaveStatus_objs,data=request.data,partial=True)
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
                    'message': 'LeaveStatus Partial Updated Successfully'
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
            LeaveStatus_objs = self.get_object()
            LeaveStatus_objs.delete()
 
            return Response({
                'status': status.HTTP_200_OK,
                'message':'LeaveStatus deleted successfully'
            })
 
        except Exception as e:
            print(e)
            raise APIException({
                'message':APIException.default_detail,
                'status':APIException.status_code
            })
        

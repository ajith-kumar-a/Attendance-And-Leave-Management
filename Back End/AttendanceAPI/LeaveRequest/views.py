from django.shortcuts import render
from . models import LeaveRequests,LeaveStatus
from .serializers import LeaveRequestsSerializer,LeaveStatusSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework import status

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

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
    
  # GET request to fetch leave requests by user_id
    @action(detail=False, methods=['get', 'post'], url_path='by-user/(?P<user_id>\d+)')
    def by_user(self, request, user_id=None):
        if request.method == 'GET':
            # Handle GET request
            try:
                leave_requests = LeaveRequests.objects.filter(user_id=user_id)
                serializer = self.get_serializer(leave_requests, many=True)
                return Response({
                    'status': status.HTTP_200_OK,
                    'data': serializer.data
                })
            except Exception as e:
                print(e)
                return Response({
                    'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                    'message': 'An error occurred while fetching LeaveRequests by user_id'
                })

        elif request.method == 'POST':
            # Handle POST request
            try:
                data = request.data.copy()  # Make a copy of the request data
                data['user_id'] = user_id  # Assign user_id from URL to the data

                # Validate and create the leave request
                serializer = self.get_serializer(data=data)
                if not serializer.is_valid():
                    return Response({
                        'status': status.HTTP_400_BAD_REQUEST,
                        'data': serializer.errors,
                        'message': 'Invalid Data'
                    })

                # Save the new leave request
                serializer.save()
                return Response({
                    'status': status.HTTP_201_CREATED,
                    'data': serializer.data,
                    'message': 'LeaveRequest created successfully'
                })

            except Exception as e:
                print(f'Error: {e}')  # Log the exception for debugging
                return Response({
                    'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                    'message': 'An error occurred while creating LeaveRequest'
                })
        
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
    def create(self, request, pk=None):
        try:
            # Validate the incoming request data using the serializer
            serializer = self.get_serializer(data=request.data)
            if not serializer.is_valid():
                return Response({
                    'status': status.HTTP_400_BAD_REQUEST,
                    'data': serializer.errors,
                    'message': 'Invalid Data'  # Fixed typo and removed duplicate key
                })
            
            # Save the valid serializer data
            serializer.save()
            return Response({
                'status': status.HTTP_201_CREATED,
                'data': serializer.data,
                'message': 'LeaveRequest created successfully'  # Fixed duplicate message key
            })

        except Exception as e:
            # Log the exception for debugging
            print(f'Error: {e}')  # Print the full exception for debugging
            raise APIException({
                'message': APIException.default_detail,
                'status': APIException.status_code
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
        
from users.models import User



class LeaveRequestsByRoleView(APIView):
    """
    Retrieve leave requests filtered by role_id.
    """
    def get(self, request, role_id=None, *args, **kwargs):
        try:
            # Fetch users with the specified role_id
            users = User.objects.filter(role_id=role_id)
            
            if not users.exists():
                return Response({
                    'status': status.HTTP_404_NOT_FOUND,
                    'message': 'No users found for this role_id'
                })
            
            # Get leave requests for these users
            leave_requests = LeaveRequests.objects.filter(user_id__in=users)
            serializer = LeaveRequestsSerializer(leave_requests, many=True)
            
            return Response({
                'status': status.HTTP_200_OK,
                'data': serializer.data
            })
        except Exception as e:
            print(e)
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while fetching leave requests by role_id'
            })
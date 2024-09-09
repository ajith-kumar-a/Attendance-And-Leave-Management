from django.shortcuts import render
from . models import Attendance,AttendanceStatus
from .serializers import AttendanceSerializer,AttendanceStatusSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status as http_status

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework.decorators import action



class AttendanceStatusViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceStatusSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return all records or filter if necessary
        return AttendanceStatus.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'status': http_status.HTTP_200_OK,
            'data': serializer.data
        })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                'status': http_status.HTTP_400_BAD_REQUEST,
                'data': serializer.errors,
                'message': 'Invalid Data'
            })
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
            'status': http_status.HTTP_201_CREATED,
            'data': serializer.data,
            'message': 'Attendance Status created successfully'
        }, status=http_status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({
            'status': http_status.HTTP_200_OK,
            'data': serializer.data
        })

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if not serializer.is_valid():
            return Response({
                'status': http_status.HTTP_400_BAD_REQUEST,
                'data': serializer.errors,
                'message': 'Invalid Data'
            })
        self.perform_update(serializer)
        return Response({
            'status': http_status.HTTP_200_OK,
            'data': serializer.data,
            'message': 'Attendance Status updated successfully'
        })

    def partial_update(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({
            'status': http_status.HTTP_204_NO_CONTENT,
            'message': 'Attendance Status deleted successfully'
        })
    


class PublicAttendanceListView(APIView):
    permission_classes = [AllowAny]  # Allow any user to access this view

    def get(self, request, *args, **kwargs):
        try:
            # Get all Attendance objects
            Attendance_objs = Attendance.objects.all()
            # Serialize the data
            serializer = AttendanceSerializer(Attendance_objs, many=True)
            # Return the response with the data
            return Response({
                'status': status.HTTP_200_OK,
                'data': serializer.data
            })
        except Exception as e:
            print(e)
            return Response({
                'status': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'message': 'An error occurred while fetching Attendances'
            })

 
# Create your views here.
class AttendanceViewset(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
 
    def get_serializer_class(self):
            if self.action == 'list':
                return AttendanceSerializer
            return self.serializer_class
    
    @action(detail=False, methods=['get'], url_path='by-user/(?P<user_id>\d+)')
    def get_by_user(self, request, user_id=None):
        try:
            attendances = Attendance.objects.filter(user_id=user_id)
            serializer = self.get_serializer(attendances, many=True)
            return Response({
                'status': status.HTTP_200_OK,
                'data': serializer.data,
                'message': 'Attendance records retrieved successfully'
            })
        except Exception as e:
            print(e)
            raise APIException({
                'message': APIException.default_detail,
                'status': APIException.status_code
            })
    
#get all authors
    def list(self,request,pk=None):
        try:
            Attendance_objs = Attendance.objects.all()
            serializer = self.get_serializer(Attendance_objs,many=True)
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
                'message': 'Attendance created successfully'
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
            Attendance_objs = self.get_object()
            serializer = self.get_serializer(Attendance_objs,data=request.data,partial=False)
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
                    'message': 'Attendance Updated Successfully'
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
            Attendance_objs = self.get_object()
            serializer = self.get_serializer(Attendance_objs,data=request.data,partial=True)
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
                    'message': 'Attendance Partial Updated Successfully'
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
            Attendance_objs = self.get_object()
            Attendance_objs.delete()
 
            return Response({
                'status': status.HTTP_200_OK,
                'message':'Attendance deleted successfully'
            })
 
        except Exception as e:
            print(e)
            raise APIException({
                'message':APIException.default_detail,
                'status':APIException.status_code
            })
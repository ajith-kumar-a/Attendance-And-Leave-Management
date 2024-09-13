# userdetails/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import UserDetails
from .serializers import UserDetailsSerializer

class UserDetailsViewSet(viewsets.ViewSet):
    
    def get_object(self, user_id):
        try:
            return UserDetails.objects.get(user_id=user_id)
        except UserDetails.DoesNotExist:
            raise NotFound(detail="User details not found.")

    def list(self, request, user_id=None):
        if user_id:
            user_details = self.get_object(user_id)
            serializer = UserDetailsSerializer(user_details)
            return Response(serializer.data)
        else:
            queryset = UserDetails.objects.all()
            serializer = UserDetailsSerializer(queryset, many=True)
            return Response(serializer.data)

    def create(self, request, user_id=None):
        if user_id:
            data = request.data.copy()
            data['user'] = user_id
            serializer = UserDetailsSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'User ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, user_id=None):
        user_details = self.get_object(user_id)
        serializer = UserDetailsSerializer(user_details)
        return Response(serializer.data)

    def update(self, request, user_id=None):
        user_details = self.get_object(user_id)
        serializer = UserDetailsSerializer(user_details, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, user_id=None):
        user_details = self.get_object(user_id)
        user_details.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

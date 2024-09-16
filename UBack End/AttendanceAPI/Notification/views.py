# views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        if user_id:
            return Notification.objects.filter(user_id=user_id)
        return Notification.objects.none()  # No notifications if user_id is not provided

    def retrieve(self, request, *args, **kwargs):
        user_id = self.kwargs.get('user_id')
        pk = self.kwargs.get('pk')
        try:
            notification = Notification.objects.get(user_id=user_id, pk=pk)
        except Notification.DoesNotExist:
            raise NotFound(detail="Notification not found.")
        serializer = self.get_serializer(notification)
        return Response(serializer.data)

    def perform_create(self, serializer):
        user_id = self.kwargs.get('user_id')
        serializer.save(user_id=user_id)

    def update(self, request, *args, **kwargs):
        user_id = self.kwargs.get('user_id')
        pk = self.kwargs.get('pk')
        try:
            notification = Notification.objects.get(user_id=user_id, pk=pk)
        except Notification.DoesNotExist:
            raise NotFound(detail="Notification not found.")
        serializer = self.get_serializer(notification, data=request.data, partial=True)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        user_id = self.kwargs.get('user_id')
        pk = self.kwargs.get('pk')
        try:
            notification = Notification.objects.get(user_id=user_id, pk=pk)
        except Notification.DoesNotExist:
            raise NotFound(detail="Notification not found.")
        self.perform_destroy(notification)
        return Response(status=status.HTTP_204_NO_CONTENT)

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import UserDetails
from .serializers import UserDetailsSerializer

# List and Create view
class UserDetailsListCreateView(generics.ListCreateAPIView):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

# Retrieve, Update, and Delete view
class UserDetailsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'  # primary key will be used to get the specific UserDetails object

# List view by user_id
class UserDetailsByUserView(generics.ListAPIView):
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all the UserDetails
        for the user_id specified in the URL.
        """
        user_id = self.kwargs['user_id']
        return UserDetails.objects.filter(user_id=user_id)

# Update view by user_id
class UserDetailsUpdateByUserView(generics.UpdateAPIView):
    serializer_class = UserDetailsSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'user_id'

    def get_queryset(self):
        """
        This view should return the UserDetails object for the user_id specified in the URL.
        """
        user_id = self.kwargs['user_id']
        return UserDetails.objects.filter(user_id=user_id)

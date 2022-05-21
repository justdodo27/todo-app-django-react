from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import NotAuthenticated

# Create your views here.

class TasksList(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        if self.request.user.is_anonymous:
            raise NotAuthenticated("No Token Provided")
        return self.queryset.filter(author=self.request.user)

class TasksDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        if self.request.user.is_anonymous:
            raise NotAuthenticated("No Token Provided")
        return self.queryset.filter(author=self.request.user)
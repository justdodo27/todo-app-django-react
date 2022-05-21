from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import TasksList, TasksDetail

app_name = 'restapi'

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('tasks/', TasksList.as_view()),
    path('tasks/<int:pk>/', TasksDetail.as_view()),
]
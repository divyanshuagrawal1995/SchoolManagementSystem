from django.shortcuts import render
from rest_framework import viewsets

# Create your views here.
from .models import User
from .serializers import UserSerializers

class UserViewSet(viewsets.ModelViewSet):
    serializer_class=UserSerializers
    queryset=User.objects.all()
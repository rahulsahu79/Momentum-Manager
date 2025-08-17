from django.shortcuts import render
from rest_framework import viewsets,filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializer import *
from .models import *
# Create your views here.

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    filterset_fields = ["completed"]
    search_fields = ["title","description"]
    ordering_fields = ["created_at","title"]


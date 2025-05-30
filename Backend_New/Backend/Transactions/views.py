from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serailizers import TransactionSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from .models import Expenserecord
from rest_framework.response import Response
# Create your views here.
class TransactionCreateView(generics.CreateAPIView):
    serializer_class=TransactionSerializer
    permission_classes=[IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user )
class TransactionListView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Expenserecord.objects.filter(user=self.request.user).order_by('-DateandTimePayed')  # Replace dateTime if needed

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = []
        for idx, item in enumerate(serializer.data, start=1):
            item_copy = dict(item)
            item_copy['transaction_index'] = idx
            data.append(item_copy)
        return Response(data)
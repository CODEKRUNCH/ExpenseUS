from rest_framework import generics
from rest_framework.views import APIView
from .serailizers import TransactionSerializer,WalletSerializer,BudgetSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import status
from .models import Transactionrecord, Budget,Wallet
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
        return Transactionrecord.objects.filter(user=self.request.user).order_by('-DateandTimePayed')  # Replace dateTime if needed

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer=self.get_serializer(page,many=True)
            data = []
            for idx,item in enumerate(serializer.data,start=1):
                item_copy=dict(item)
                item_copy['transaction_index']=idx
                data.append(item_copy)
            return self.get_paginated_response(data)
        serializer=self.get_serializer(queryset,many=True)
        return Response(serializer.data)
class Balanceview(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        try:
            wallet,created=Wallet.objects.get_or_create(user=request.user)
            serializer= WalletSerializer(wallet)
            return Response(serializer.data)
        except Wallet.DoesNotExist:
            return Response({'detail':'Wallet not Found'},status=404)
class BudgetCreateView(APIView):
    serializer_class=BudgetSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            wallet=Wallet.objects.get(user=request.user)
        except Wallet.doesnotexist:
            return Response({"detail": "No wallet found for this user."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data, context={'request': request})  # << important
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class BudgetListView(APIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]
    def get(self,request):
        # get only budgets of the logged in useruseruser
        user=request.user
        budgets = Budget.objects.filter(user=user)
        # Optional: filter only active budgets
        # budgets = budgets.filter(end_date__gte=timezone.now().date())

        serializer = BudgetSerializer(budgets, many=True)
        return Response(serializer.data)




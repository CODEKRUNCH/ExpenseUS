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

class BalanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wallets = Wallet.objects.filter(user=request.user)
        data = {}

        for wallet in wallets:
            data[wallet.type] = {
                "balance": str(wallet.balance)
            }

        return Response(data)
class BudgetCreateView(APIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        wallet_type = request.data.get('wallet_type', 'Primary')  # default to Primary wallet

        try:
            wallet = Wallet.objects.get(user=request.user, type=wallet_type)
        except Wallet.DoesNotExist:
            return Response({"detail": f"No {wallet_type} wallet found for this user."},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(wallet=wallet)  # manually set wallet
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class BudgetListView(APIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]
    def get(self,request):
        # get only budgets of the logged in user
        user=request.user
        budgets = Budget.objects.filter(user=user)
        # Optional: filter only active budgets
        # budgets = budgets.filter(end_date__gte=timezone.now().date())

        serializer = BudgetSerializer(budgets, many=True)
        return Response(serializer.data)

class BudgetDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        """
        Delete a budget by ID if it belongs to the authenticated user.
        """
        try:
            # Ensure that the budget exists and belongs to the user
            budget = Budget.objects.get(pk=pk, user=request.user)
        except Budget.DoesNotExist:
            return Response(
                {"detail": "Budget not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        budget.delete()
        return Response(
            {"detail": "Budget deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )



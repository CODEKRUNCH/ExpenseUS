from django.contrib import admin
from django.urls import include,path
from .views import TransactionCreateView,TransactionListView,Balanceview,BudgetCreateView,BudgetListView

urlpatterns = [
    path('transactioncreate/',TransactionCreateView.as_view(),name='transactioncreate'),
    path('transactionlist/',TransactionListView.as_view(),name='transactionlist'),
    path('balanceview/',Balanceview.as_view(),name='Balanceview'),
    path('budgetcreate/',BudgetCreateView.as_view(),name='budgetcreate'),
    path('budgetlist/',BudgetListView.as_view(),name='budgetlist')
]
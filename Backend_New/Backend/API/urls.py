from django.contrib import admin
from django.urls import include,path
from .views import CreateUserView,LoginUserView,TransactionCreateView

urlpatterns = [
    path('register/',CreateUserView.as_view(),name='register'),
    path('login/',LoginUserView.as_view(),name='login'),
    path('transactioncreate/',TransactionCreateView.as_view(),name='transactioncreate')
    
]
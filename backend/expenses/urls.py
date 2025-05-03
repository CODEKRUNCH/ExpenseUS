from django.urls import path
from django.contrib.auth import views as auth_views

from .views import expense_list

urlpatterns=[
    path('dashboard/',expense_list),
    path('login',auth_views.LoginView.as_view(template_name='login.html'),name='login'),
    path('logout/',auth_views.LogoutView.as_view(next_page='login'),name= 'logout'),
]
from django.urls import path

from backend.testapp.views import dashboard

app_name="test"

urlpatterns=[
    path("",view=dashboard,name="dashboard"),
]
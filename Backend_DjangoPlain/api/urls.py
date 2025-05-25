from django.urls import path
from . import views

urlpatterns=[
    path("Notes/",views.NodeListCreate.as_view(),name="node-list"),
    path("nodes/delete/<int:pk>",views.NoteDelete.as_view(),name="delete-note"),
]
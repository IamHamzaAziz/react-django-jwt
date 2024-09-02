from django.urls import path
from .views import CreateUser, HandleNotes, HandleNote

urlpatterns = [
    path('register/', CreateUser.as_view(), name='register'),
    path('notes/', HandleNotes.as_view(), name='notes'),
    path('note/<int:pk>/', HandleNote.as_view(), name='note'),
]

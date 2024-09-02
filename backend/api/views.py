from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import NoteSerializer
from .models import Note

# Create your views here.
class CreateUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        user = User.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
        return Response({ 'message': 'User created successfully' })


class HandleNotes(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, *args, **kwargs):
        notes = Note.objects.filter(author=self.request.user)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        data = request.data
        note = Note.objects.create(
            title = data['title'],
            content = data['content'],
            author = self.request.user
        )
        note.save()

        return Response({ 'message': 'Note created successfully' })
    

class HandleNote(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]


    def get(self, request, pk, *args, **kwargs):
        note = Note.objects.get(pk=pk)
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)
    
    def put(self, request, pk, *args, **kwargs):
        data = request.data
        note = Note.objects.get(pk=pk)
        note.title = data['title']
        note.content = data['content']
        note.save()

        return Response({ 'message': 'Note updated successfully' })
    
    def delete(self, request, pk, *args, **kwargs):
        note = Note.objects.get(pk=pk)
        note.delete()

        return Response({ 'message': 'Note deleted successfully' })
    



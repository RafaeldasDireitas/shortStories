from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UsersSerializer, PostsSerializer
from .models import Posts
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from django.contrib.auth.hashers import make_password

# Create your views here.

@api_view(['GET', 'POST'])
def register(request):

    if request.method == "GET":
        user = User.objects.all()
        serializer = UsersSerializer(user, many=True)

        return Response(serializer.data) 

    if request.method == "POST":

        user_dict = {
            "username": request.data.get('username'),
            "password": request.data.get('password'),
            "email": request.data.get('email'),
        }

        if (len(user_dict['password']) <= 8):
            return Response({'message': 'Password length too short'}, status=401)
        else:
            password = make_password(user_dict['password'])
            
            user = User.objects.create(username=user_dict['username'], password=password, email=user_dict['email'])
            user.save()
            return Response({'message': 'good to go'}, status=200)

    return Response({'message': 'Not able to create user, check your credentials'}, status=400)

@api_view(['GET', 'POST'])
def login(request):

    if request.method == "GET":
        user = User.objects.all()
        serializer = UsersSerializer(user, many=True)

        return Response(serializer.data) 

    if request.method == "POST":

        user_dict = {
            "username": request.data.get('username'),
            "password": request.data.get('password'),
        }
        
        user_auth = authenticate(username=user_dict['username'], password=user_dict['password'])

        if user_auth is not None:
            return Response(user_dict.values(), status=200)
        else:
            return Response({'message': 'WRONG'}, status=401)
        
@api_view(['GET'])        
def posts(request, username):

    if request.method == "GET":
        posts = Posts.objects.filter(author__username=username)
        serializer = PostsSerializer(posts, many=True)

        return Response(serializer.data)

@api_view(['GET'])
def latestPosts(request):

    if request.method == "GET":
        posts = Posts.objects.order_by('-created_at')[:6]
        serializer = PostsSerializer(posts, many=True)

        return Response(serializer.data)

@api_view(['GET','POST'])
def createPost(request):

    if request.method == "GET":
        posts = Posts.objects.all()
        serializer = PostsSerializer(posts, many=True)

        return Response(serializer.data)
    
    if request.method == "POST":
        username = request.data.get('username')
        user = User.objects.get(username=username)

        posts = Posts()
        posts.author = user
        posts.title = request.data.get('title')
        posts.synopsis = request.data.get('synopsis')
        posts.text = request.data.get('text')
        posts.save()

        return Response({'message': "Successful"}, status=200)

@api_view(['GET'])
def allPosts(request):

    if request.method == "GET":
        posts = Posts.objects.all()
        serializer = PostsSerializer(posts, many=True)

        return Response(serializer.data)
    
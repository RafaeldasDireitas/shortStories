from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register, name="register"),
    path('login', views.login, name="login"),
    path('posts/<str:username>/', views.posts, name="posts"),
    path('latestposts', views.latestPosts, name="latestPosts"),
    path('createpost', views.createPost, name="createPost"),
    path('allposts', views.allPosts, name="allPosts"),
    ]

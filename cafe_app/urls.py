from django.urls import path
from . import views


urlpatterns = [
    path("home/", views.home, name="home"),
    path('menu/', views.menu, name='menu'),
    path('Our_Story/', views.Our_Story, name='Our_Story'),
    path('', views.Opening, name='Opening'),
]
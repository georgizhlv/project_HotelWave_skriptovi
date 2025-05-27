from django.urls import path
from .views import RoomListAPIView, RoomDetailAPIView

urlpatterns = [
    path('', RoomListAPIView.as_view(), name='room-list'),
    path('<int:pk>/', RoomDetailAPIView.as_view(), name='room-detail'),
]
from django.urls import path
from .views import ReservationListCreateAPIView, ReservationDetailAPIView

urlpatterns = [
    path('',         ReservationListCreateAPIView.as_view(),  name='reservation-list'),
    path('<int:pk>/', ReservationDetailAPIView.as_view(), name='reservation-detail'),
]
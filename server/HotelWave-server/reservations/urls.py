from django.urls import path
from .views import ReservationListAPIView, ReservationDetailAPIView

urlpatterns = [
    path('', ReservationListAPIView.as_view(), name='reservation-list'),
    path('<int:pk>/', ReservationDetailAPIView.as_view(), name='reservation-detail'),
]
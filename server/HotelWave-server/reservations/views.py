from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Reservation
from .serializers import ReservationSerializer

class ReservationListCreateAPIView(generics.ListCreateAPIView):
    """
    GET  /api/reservations/      → всички резервации на текущия потребител
    POST /api/reservations/      → създава нова резервация (user взет от request.user)
    """
    serializer_class = ReservationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Reservation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ReservationDetailAPIView(generics.RetrieveDestroyAPIView):
    queryset = Reservation.objects.all()#detaili za rezervaciqta
    serializer_class = ReservationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        #samo do sobstveni rezervacii da ima dostup
        return Reservation.objects.filter(user=self.request.user)


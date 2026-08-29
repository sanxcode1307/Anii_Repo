from django.shortcuts import render,redirect
from .models import ContactMessage

# Create your views here.
def home(request):
    
    if request.method == 'POST':

        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        ContactMessage.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )

        return redirect('home')

    return render(request, 'home.html')


def menu(request):
    return render(request, 'menu.html')


def Our_Story(request):
    return render(request, 'Our_Story.html')


def Opening(request):
    return render(request, 'Opening.html')
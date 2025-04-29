import os
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ExpenseTracker.settings')  # Add this line

application = get_wsgi_application()
application = WhiteNoise(application, root=os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static'))

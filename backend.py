import random
import requests
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app, origins=["http://localhost:5002", "https://smart-expense-tracker-dusky.vercel.app"])


# In-memory store for OTPs with expiration time
otp_store = {}

# Get API Key from environment variables
API_KEY = os.getenv('API_KEY')
expiry_time = datetime.now(timezone.utc) + timedelta(minutes=5)  # OTP expires in 5 minutes

# Elastic Email API endpoint
SEND_URL = 'https://api.elasticemail.com/v2/email/send'


# Set up logging to see any issues
logging.basicConfig(level=logging.DEBUG)

def generate_otp(email):
    otp = str(random.randint(100000, 999999))  # Generate a 6-digit OTP
    expiry_time = datetime.utcnow() + timedelta(minutes=5)  # OTP expires in 5 minutes
    otp_store[email] = {'otp': otp, 'expiry': expiry_time}
    return otp

@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    email = data.get('email')

    if not email:
        return jsonify({'message': 'Email is required'}), 400

    otp = generate_otp(email)  # Generate OTP
    # Prepare the payload for Elastic Email API request
    payload = {
        'from': 'dpwork124@gmail.com',  # Your verified sender email
        'to': email,  # Recipient's email
        'subject': 'Your OTP for Smart Expense Tracker',  # Email subject
        'bodyHtml': f'<p>Your OTP code is: <strong>{otp}</strong></p>',  # HTML content
        'apiKey': API_KEY  # Elastic Email API Key
    }

    try:
        # Send the OTP email via Elastic Email API
        response = requests.post(SEND_URL, data=payload)
        
        if response.status_code == 200:
            return jsonify({'message': 'OTP sent successfully'}), 200
        else:
            return jsonify({'message': 'Failed to send OTP', 'error': response.text}), 500
    except requests.exceptions.RequestException as e:
        logging.error(f"Error occurred: {e}")
        return jsonify({'message': 'Failed to send OTP', 'error': str(e)}), 500
@app.route('/')
def home():
    return "Flask server is running!"
    
@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    email = data.get('email')
    entered_otp = data.get('otp')

    if email not in otp_store:
        return jsonify({'message': 'No OTP generated for this email'}), 400

    stored_otp = otp_store[email]
    
    # Check if OTP has expired
    if datetime.utcnow() > stored_otp['expiry']:
        del otp_store[email]  # OTP expired
        return jsonify({'message': 'OTP expired'}), 400
    
    if stored_otp['otp'] == entered_otp:
        del otp_store[email]  # Remove OTP after successful verification
        return jsonify({'message': 'OTP verified successfully'}), 200
    else:
        return jsonify({'message': 'Invalid OTP'}), 400

from waitress import serve

if __name__ == '__main__':
    logging.debug("Starting Flask app...")
    serve(app, host='0.0.0.0', port=5001)

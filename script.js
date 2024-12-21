//script.js

const sendOtpButton = document.getElementById('send-otp');
const verifyOtpButton = document.getElementById('verify-otp');
const otpInput = document.getElementById('otp');
const emailInput = document.getElementById('email');
const loginForm = document.getElementById('login-form');
const expenseSection = document.querySelector('.add-expense');
const summarySection = document.querySelector('.expense-summary');
const listSection = document.querySelector('.expense-list');

sendOtpButton.addEventListener('click', async () => {
  const email = emailInput.value;

  if (!email) {
    alert('Please enter a valid email address.');
    return;
  }
  sendOtpButton.disabled = true;
  sendOtpButton.textContent = 'Sending...';


  try {
    const response = await fetch('http://127.0.0.1:5000/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      otpInput.style.display = 'inline';
      verifyOtpButton.style.display = 'inline';
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    alert('Failed to send OTP.');
  }

  finally {
    // Re-enable button and restore original text
    sendOtpButton.disabled = false;
    sendOtpButton.textContent = 'Send OTP';
  }
  
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const otp = otpInput.value;

  try {
    const response = await fetch('https://smart-expense-tracker-dusky.vercel.app/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      loginForm.style.display = 'none';
      expenseSection.style.display = 'block';
      summarySection.style.display = 'block';
      listSection.style.display = 'block';
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    alert('Failed to verify OTP.');
  }
});

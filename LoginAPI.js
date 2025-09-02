// File: script.js

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const formData = new FormData(form);
    const params = new URLSearchParams(formData);

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: params,
        credentials: 'include' // Include cookies in the request
    });

    const text = await response.text();

    if (text.includes('Login failed')) {
        // On success, redirect to the index page
        document.getElementById('error-message').textContent = 'Login failed. Please try again.'; // Clear any previous error message
    }
    else if (text.includes('Success') || response.status === 200) {
        window.location = '/';
    }
    });



    
    // Create account form handler
})
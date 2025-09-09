document.addEventListener('DOMContentLoaded', function() {
    signupSuccess = localStorage.getItem('signupSuccess');
    if (signupSuccess) {
        if (signupSuccess.includes('User created successfully')) {
        document.getElementById('error-message').style.color = "green";
        document.getElementById('error-message').textContent = "User created successfully! Please log in";
    }}
    
    // Signin form handler
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(signinForm);
            const params = new URLSearchParams(formData);

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: params
            });

            const text = await response.text();

            if (text.includes('Success!')) {
                localStorage.setItem('signupSuccess', '');
                window.location = '/';
            } else {
                document.getElementById('error-message').textContent = text;
            }
        });
    }
    // Show password toggle
    const showPassword = document.getElementById('show-password');
    const passwordInput = document.querySelector('input[name="password"]');
    if (showPassword && passwordInput) {
        showPassword.addEventListener('change', function() {
            passwordInput.type = this.checked ? 'text' : 'password';
        });
    }
});

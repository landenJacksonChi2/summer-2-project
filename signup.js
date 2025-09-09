document.addEventListener('DOMContentLoaded', function() {
    // Signup form handler
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(signupForm);
            const params = new URLSearchParams(formData);

            const response = await fetch('/api/create_account', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: params
            });

            const text = await response.text();

            if (text.includes('User created successfully')) {
                localStorage.setItem('signupSuccess', 'User created successfully');
                window.location = '/signin';
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

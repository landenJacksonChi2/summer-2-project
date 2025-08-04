document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Redirect to the homepage
            window.location.href = '/';
        } else {
            // Show error message
            alert(data.error || 'Signup failed. Please try again.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong. Please try again later.');
    }
});

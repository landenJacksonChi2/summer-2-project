// Sample users database (for demonstration; replace with your backend logic in production)
const usersDatabase = [
    { username: "user1", email: "user1@example.com", password: "password123" },
    { username: "user2", email: "user2@example.com", password: "mypassword" },
];

// Function to handle login
function loginUser(event) {
    event.preventDefault(); // Prevent form submission
    const usernameOrEmail = document.getElementById("login-username-email").value.trim();
    const password = document.getElementById("login-password").value;

    // Check if the entered credentials match an existing account
    const user = usersDatabase.find(
        user =>
            (user.username === usernameOrEmail || user.email === usernameOrEmail) &&
            user.password === password
    );

    const loginMessage = document.getElementById("login-message");

    if (user) {
        // Successful login
        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";
        sessionStorage.setItem("loggedIn", true); // Example: Mark user as logged in
        sessionStorage.setItem("currentUser", JSON.stringify(user)); // Store current user data
        // Redirect or show additional features (like making the cart visible)
        document.getElementById("cart").style.display = "block";
    } else {
        // Failed login
        loginMessage.textContent = "Wrong password, username, or email. Try again!";
        loginMessage.style.color = "red";
        sessionStorage.setItem("loggedIn", false); // Ensure no access if failed login
    }
}

// Function to check if the user is logged in and toggle cart visibility
function checkLoginStatus() {
    const loggedIn = sessionStorage.getItem("loggedIn") === "true";
    document.getElementById("cart").style.display = loggedIn ? "block" : "none";
}

// Initialize the login page
document.addEventListener("DOMContentLoaded", checkLoginStatus);

function togglePasswordVisibility(inputId) {
    const passwordField = document.getElementById(inputId);
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

document.getElementById('signin-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login successful!');
            window.location.href = '/'; // Redirect to the homepage
        } else {
            alert(data.error || 'An error occurred. Please try again.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong. Please try again later.');
    }
});

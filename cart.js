let cart = []; // Array to hold cart items

// Function to add items to the cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if the item already exists
    } else {
        cart.push({ name, price, quantity: 1 }); // Add new item to the cart
    }
    updateCart(); // Update the cart UI
}

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');

    // Clear the cart display
    cartItemsContainer.innerHTML = '';

    let total = 0;

    // Loop through cart items to display them
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} (${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    // Update total price
    cartTotalDisplay.textContent = total.toFixed(2);
}

// Simulate login status
let isLoggedIn = false; // Set this to true after the user logs in

// Function to handle adding items to the cart
function addToCart(itemId) {
    if (!isLoggedIn) {
        alert("You need to be logged in to add items to the cart!");
        return;
    }
    // Logic for adding the item to the cart
    console.log("Item added to cart:", itemId);
}

// Disable "Add to Cart" buttons if not logged in
function toggleAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        if (!isLoggedIn) {
            button.disabled = true;
            button.style.cursor = "not-allowed";
            button.style.opacity = "0.6";
        } else {
            button.disabled = false;
            button.style.cursor = "pointer";
            button.style.opacity = "1";
        }
    });
}

// Call this function on login/logout
function updateLoginStatus(status) {
    isLoggedIn = status;
    toggleAddToCartButtons();
}

// Example: Update login status when user logs in
// Replace this logic with your actual login function
document.querySelector('#login-button').addEventListener('click', () => {
    updateLoginStatus(true); // Simulate login
});
document.querySelector('#logout-button').addEventListener('click', () => {
    updateLoginStatus(false); // Simulate logout
});

// Initial setup
toggleAddToCartButtons();

// Encapsulate cart logic in an IIFE to avoid global scope conflicts
(function () {
    let cart = []; // Private variable for cart items

    // Function to update cart UI
    function updateCartUI() {
        const cartContainer = document.querySelector('#cart-container');
        const emptyMessage = document.querySelector('#empty-cart-message');

        // Check if the cart is empty
        if (cart.length === 0) {
            emptyMessage.style.display = 'block'; // Show the message
            cartContainer.innerHTML = ''; // Clear the cart display
        } else {
            emptyMessage.style.display = 'none'; // Hide the message
            cartContainer.innerHTML = ''; // Clear the cart display

            // Display cart items
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.textContent = item;
                cartContainer.appendChild(cartItem);
            });
        }
    }

    // Function to add items to the cart
    function addToCart(itemName) {
        if (!isLoggedIn) {
            alert('You need to be logged in to add items to the cart!');
            return;
        }
        cart.push(itemName);
        updateCartUI();
    }

    // Make functions available globally for UI interaction
    window.addToCart = addToCart;

    // Initialize cart UI
    document.addEventListener('DOMContentLoaded', updateCartUI);
})();

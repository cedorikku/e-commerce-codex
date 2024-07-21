document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkoutForm');
    const placeOrderButton = document.getElementById('placeOrderButton');

    placeOrderButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Remove previous validation states
        form.classList.remove('was-validated');
        
        // Check form validity
        if (form.checkValidity()) {
            // If form is valid, show the "Order Placed" modal
            const orderPlacedModal = new bootstrap.Modal(document.getElementById('orderPlacedModal'));
            orderPlacedModal.show();
        } else {
            // If form is invalid, trigger HTML5 form validation
            // form.classList.
            add('was-validated');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkoutForm');
    const placeOrderButton = document.getElementById('placeOrderButton');

    placeOrderButton.addEventListener('click', (e) => {
        e.preventDefault();

        form.classList.remove('was-validated');
        
        if (form.checkValidity()) {
            const orderPlacedModal = new bootstrap.Modal(document.getElementById('orderPlacedModal'));
            orderPlacedModal.show();
        } else {
            form.classList.add('was-validated');
        }
    });
});

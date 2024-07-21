document.querySelector('#home').addEventListener('click', () => {
    location.href = '/'
})

document.querySelector('#cartIcon').addEventListener('click', () => {
    location.href = '/cart'
})

const form = document.querySelector('#checkoutForm');
const placeOrderButton = document.querySelector('#placeOrderButton');

placeOrderButton.addEventListener('click', (e) => {
    e.preventDefault();

    form.classList.remove('was-validated');

    if (form.checkValidity()) {
        const orderPlacedModal = new bootstrap.Modal(document.querySelector('#orderPlacedModal'));
        orderPlacedModal.show();
    } else {
        form.classList.add('was-validated');
    }
});
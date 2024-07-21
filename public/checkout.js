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
        const fullname = document.querySelector('#fullName').value;
        const email = document.querySelector('#email').value;
        const address = document.querySelector('#address').value;
        const city = document.querySelector('#city').value;
        const zipcode = document.querySelector('#zip').value;
        const country = document.querySelector('#country').value;
        const mop = document.querySelector('#paymentMethod').value;
        checkoutData(fullname, email, address, city, zipcode, country, mop);
        const orderPlacedModal = new bootstrap.Modal(document.querySelector('#orderPlacedModal'));
        orderPlacedModal.show();
    } else {
        form.classList.add('was-validated');
    }
});

function checkoutData(fullname, email, address, city, zipcode, country, mop) {
    fetch('/api/checkoutData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        fullname: fullname,
        email: email,
        address: address,
        city: city,
        zipcode: zipcode,
        country: country,
        mop: mop
      }),
    })
      .then(response => response.json())
      .catch((error) => console.log('Error:', error));
  }
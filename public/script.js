// document.querySelector('#goBack').addEventListener('click', () => {
//   location.href = '/'
// })

// document.querySelector('#checkOut').addEventListener('click', () => {
//   location.href = '/checkout'
// });

document.querySelector('#homeCodex').addEventListener('click', () => {
  location.href = '/';
})

document.querySelector('#cartIcon').addEventListener('click', () => {
  location.href = '/cart';
});


const addToCartButton = document.querySelectorAll('.card-footer > button');

addToCartButton.forEach(button => button.addEventListener('click', addToCart));

function addToCart(e) {
  const productName = e.target.parentNode.childNodes[1].textContent;

  fetch('/api/cart', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: productName }),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));
}

function addToCartClicked() {
  if (!document.getElementById('toastContainer')) {
      var toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.className = 'position-fixed bottom-0 start-0 p-4';
      toastContainer.style.zIndex = '11';
      document.body.appendChild(toastContainer);
  }

  var toastId = 'cartToast' + new Date().getTime();

  var toastElement = document.createElement('div');
  toastElement.id = toastId;
  toastElement.className = 'toast hide';
  toastElement.role = 'alert';
  toastElement.ariaLive = 'assertive';
  toastElement.ariaAtomic = 'true';
  toastElement.innerHTML = `
      <div class="toast-header bg-primary text-light">
          <strong class="me-auto">Added to Cart</strong>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
          Your item has been added to the cart.
      </div>
  `;

  document.getElementById('toastContainer').appendChild(toastElement);

  var style = document.createElement('style');    
  document.getElementsByTagName('head')[0].appendChild(style);

  var toast = new bootstrap.Toast(toastElement);
  toastElement.addEventListener('show.bs.toast', function () {
      toastElement.style.opacity = 0;
      setTimeout(() => {
          toastElement.style.opacity = 1;
      }, 10);
  });
  toast.show();

}
document.querySelector('#addToCart').addEventListener(() => {
  fetch('/api/getCart', {
    method: 'GET', // Use GET method for fetching data
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log('Cart items:', data);
  })
  .catch(error => {
    console.error('Error fetching cart items:', error);
  });
});


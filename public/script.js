document.querySelector('#homeCodex').addEventListener('click', () => {
  location.href = '/';
})

document.querySelector('#cartIcon').addEventListener('click', () => {
  location.href = '/cart';
});

const addToCartButton = document.querySelectorAll('.card-footer > button');

addToCartButton.forEach(button => button.addEventListener('click', (e) => { addToCart(e); }));

function addToCart(e) {
  const productName = e.target.parentNode.childNodes[1].textContent;
  toastModal();

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

function toastModal() {
  const toastContainer = document.getElementById('toastContainer');
  const toastTemplate = document.getElementById('toastTemplate');
  const newToast = toastTemplate.cloneNode(true);
  newToast.style.display = 'block';
  toastContainer.appendChild(newToast);
  const toastBootstrap = new bootstrap.Toast(newToast);
  toastBootstrap.show();
}

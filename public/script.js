document.querySelector('#homeCodex').addEventListener('click', () => {
  location.href = '/';
});

document.querySelector('#cartIcon').addEventListener('click', () => {
  location.href = '/cart';
});

const addToCartButton = document.querySelectorAll('.card-footer > button');

addToCartButton.forEach(button => button.addEventListener('click', (e) => { addToCart(e); }));

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
    .then(() => toastModal("success"))
    .catch((error) => { 
      console.error('Error:', error);
      toastModal("error");
    });
}

function toastModal(status) {
  const toastContainer = document.getElementById('toastContainer');
  const toastTemplate = document.getElementById('toastTemplate');
  const toastBody = document.querySelector('.toast-body');
  if (status === "success") {
    toastBody.innerText = "Added to cart!";
  } else {
    toastBody.innerText = "Something went wrong adding your item";
  }
  const newToast = toastTemplate.cloneNode(true);
  newToast.style.display = 'block';
  toastContainer.appendChild(newToast);
  const toastBootstrap = new bootstrap.Toast(newToast);
  toastBootstrap.show();
}

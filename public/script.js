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
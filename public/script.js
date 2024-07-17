const addToCartButton = document.querySelectorAll('.card-footer > button');

addToCartButton.forEach(button => button.addEventListener('click', addToCart));

function addToCart(e) {
  console.log(e.target.parentNode.childNodes[1].textContent);
}
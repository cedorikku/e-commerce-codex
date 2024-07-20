document.querySelector('#goBack').addEventListener('click', () => {
  location.href = '/'
})

document.querySelector('#backBTN').addEventListener('click', () => {
  location.href = '/'
})

document.querySelector('#checkOut').addEventListener('click', () => {
  location.href = '/checkout'
});

const updateButtons = document.querySelectorAll('.input-group > button');
const quantity = document.querySelectorAll('.input-group > input');

updateButtons.forEach(button => {
  button.addEventListener('click', (e) => updateInput(e));
});

quantity.forEach(input => {
  input.addEventListener('change', (e) => changeAmount(e));
  // Prevent non-numeric inputs
  input.addEventListener('keypress', (e) => {
      if (!/^\d*$/.test(e.key)) {
          e.preventDefault(); 
      }
  });
});

function updateInput(e) {
  let inputNode, newValue;

  if (e.target.textContent === '-') {
    // Decrement
    inputNode = e.target.nextElementSibling;
    newValue = parseInt(inputNode.value, 10) - 1;
  } else if (e.target.textContent === '+') {
    // Increment
    inputNode = e.target.previousElementSibling;
    newValue = parseInt(inputNode.value, 10) + 1;
  }

  // Additional Filtering
  if (newValue == 0 || newValue < 1) {
    // temporary method of asking to delete 
    if (confirm('Are you sure you want to remove the item from your cart?')) {
      // Delete item from cart
      return;
    } else {
      newValue = 1;
    }
  }

  // Child node 3 of a row is the item's stock
  let stock = parseInt(inputNode.closest('tr').children[3].innerText, 10);
  if (newValue > stock) {
    newValue = stock;
  }

  // Set the new value for client side
  inputNode.value = newValue;

  // Get name of the updated product
  let name = inputNode.closest('td').previousElementSibling.innerText.trim();

  // Nudge the database
  requestUpdateDatabase(name, newValue);
  updateTable(inputNode);
}

function changeAmount(e) {
  let inputNode = e.target;
  let newValue = parseInt(inputNode.value, 10);

  if (inputNode.value.length > 1 && inputNode.value.charAt(0) == '0') {
    inputNode.value = newValue;
  }

  if (newValue == 0 || newValue < 1) {
    // temporary method of asking to delete 
    if (confirm('Are you sure you want to remove the item from your cart?')) {
      // Delete item from cart
      return;
    } else {
      newValue = 1;
    }
  }

  // Child node 3 of a row is the item's stock
  let stock = parseInt(inputNode.closest('tr').children[3].innerText, 10);
  if (newValue > stock) {
    newValue = stock;
    inputNode.value = stock;
  }

  // Get name of the updated product
  let name = inputNode.closest('td').previousElementSibling.innerText.trim();

  // Nudge the database
  requestUpdateDatabase(name, newValue)
  updateTable(inputNode);
}

const subtotalNode = document.querySelector('#totalPrice');

function updateTable(inputNode) {
  let quantity = parseInt(inputNode.value, 10);
  // Child node 4 of a row is the item's price
  let price = inputNode.closest('tr').children[4];
  // Child node 5 of a row is the item's total
  let totalNode = inputNode.closest('tr').children[5];

  totalNode.textContent = '₱' + (quantity * Number(price.textContent.slice(1))).toFixed(2);

  let totals = Array.from(document.querySelectorAll('.subtotal-data'));
  let sum = totals.reduce((total, current) => {
    return total + Number(current.innerText.slice(1));
  }, 0);

  subtotalNode.textContent = sum.toFixed(2);
}

function requestUpdateDatabase(name, newValue) {
  fetch('/api/updateCart', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      prodName: name.replace(/\s+/g, ' ').trim(), 
      quantity: newValue 
    }),
  })
    .then(response => response.json())
    .catch((error) => console.log('Error:', error));
}
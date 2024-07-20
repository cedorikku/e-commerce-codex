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

  // Set the new value for client side
  inputNode.value = newValue;

  // Get name of the updated product
  let name = inputNode.closest('td').previousElementSibling.innerText.trim();

  // Nudge the database
  requestUpdateDatabase(name, newValue);
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

  // Get name of the updated product
  let name = inputNode.closest('td').previousElementSibling.innerText.trim();

  // Nudge the database
  requestUpdateDatabase(name, newValue);
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
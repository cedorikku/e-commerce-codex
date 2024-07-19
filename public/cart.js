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
  if (button.textContent === '-') {
    button.addEventListener('click', (e) => decrement(e));
  } else if (button.textContent === '+') {
    button.addEventListener('click', (e) => increment(e));
  }
});

quantity.forEach(input => {
  input.addEventListener('change', (e) => (e));
});

function decrement(e) {
  let inputNode = e.target.nextElementSibling;
  updateInput(inputNode, Number(inputNode.value) - 1);
}

function increment(e) {
  let inputNode = e.target.previousElementSibling;
  updateInput(inputNode, Number(inputNode.value) + 1);
}

function updateInput(inputNode, newValue) {
  if (!inputNode || inputNode == undefined) {
    return;
  }
  if (newValue < 1) {
    return;
  }
  const name = inputNode.closest('td').previousElementSibling.textContent;

  inputNode.value = newValue;
  fetch('/api/updateCart', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prodName: name, quantity: newValue }),
  })
    .then(response => response.json())
    .catch((error) => console.log('Error:', error))
}

function changeAmount(e) {

  console.log("changed");
}

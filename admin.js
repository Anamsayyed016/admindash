// Select the menu and button elements
const menu = document.getElementById('menu');
const menuButton = document.getElementById('menuButton');

// Toggle menu visibility on button click
menuButton.addEventListener('click', () => {
  menu.classList.toggle('active');
});

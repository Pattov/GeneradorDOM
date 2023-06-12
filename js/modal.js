const openModalTest = document.querySelector('.test');
const openModalGuia = document.querySelector('.guia');
const modalGuia = document.querySelector('.modal.mGuia');
const modalTest = document.querySelector('.modal.mTest');
const closeModalGuia = document.querySelector('.cerrar.guia');
const closeModalTest = document.querySelector('.cerrar.test');

openModalTest.addEventListener('click', (e) => {
  e.preventDefault();
  modalTest.classList.add('modal--show');
});

openModalGuia.addEventListener('click', (e) => {
  e.preventDefault();
  modalGuia.classList.add('modal--show');
});

closeModalGuia.addEventListener('click', (e) => {
  e.preventDefault();
  modalGuia.classList.remove('modal--show');
});

closeModalTest.addEventListener('click', (e) => {
    e.preventDefault();
    modalTest.classList.remove('modal--show');
});
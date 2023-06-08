const openModalTest = document.querySelector('.test');
const openModalGuia = document.querySelector('.guia');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.cerrar');

openModalTest.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show');
});
openModalGuia.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show');
});

closeModal.addEventListener('click', (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
});
const openModalTest = document.querySelector('.test');
const openModalGuia = document.querySelector('.guia');
const modalGuia = document.querySelector('.modal.mGuia');
const modalTest = document.querySelector('.modal.mTest');
const closeModalGuia = document.querySelector('.cerrar.guia');
const closeModalTest = document.querySelector('.cerrar.test');

const pag1 = document.getElementById('pag1');
const pag2 = document.getElementById('pag2');
const pag3 = document.getElementById('pag3');
const pag4 = document.getElementById('pag4');
const bola1 = document.getElementById('bola1');
const bola2 = document.getElementById('bola2');
const bola4 = document.getElementById('bola4');

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

function selectDiv(divNumber) {
  pag1.classList.remove('out');
  pag2.classList.remove('out');
  pag3.classList.remove('out');
  pag4.classList.remove('out');
  pag1.classList.remove('in');
  pag2.classList.remove('in');
  pag3.classList.remove('in');
  pag4.classList.remove('in');

  if (divNumber == 1) {
    bola1.classList.add('active');
    bola2.classList.remove('active');
    bola3.classList.remove('active');
    bola4.classList.remove('active');

    pag2.classList.add('out');
    pag3.classList.add('out');
    pag4.classList.add('out');
    setTimeout(() => {
      pag2.classList.add('ocultar');
      pag3.classList.add('ocultar');
      pag4.classList.add('ocultar');

      pag1.classList.remove('ocultar');
      pag1.classList.add('in');
    }, 200);
  };
  if (divNumber == 2) {
    bola1.classList.remove('active');
    bola2.classList.add('active');
    bola3.classList.remove('active');
    bola4.classList.remove('active');

    pag1.classList.add('out');
    pag3.classList.add('out');
    pag4.classList.add('out');
    setTimeout(() => {
      pag1.classList.add('ocultar');
      pag3.classList.add('ocultar');
      pag4.classList.add('ocultar');

      pag2.classList.remove('ocultar');
      pag2.classList.add('in');
    }, 200);
  };
  if (divNumber == 3) {
    bola1.classList.remove('active');
    bola2.classList.remove('active');
    bola3.classList.add('active');
    bola4.classList.remove('active');

    pag1.classList.add('out');
    pag2.classList.add('out');
    pag4.classList.add('out');
    setTimeout(() => {
      pag1.classList.add('ocultar');
      pag2.classList.add('ocultar');
      pag4.classList.add('ocultar');

      pag3.classList.remove('ocultar');
      pag3.classList.add('in');
    }, 200);
  };
  if (divNumber == 4) {
    bola1.classList.remove('active');
    bola2.classList.remove('active');
    bola3.classList.remove('active');
    bola4.classList.add('active');

    pag2.classList.add('out');
    pag3.classList.add('out');
    pag1.classList.add('out');
    setTimeout(() => {
      pag1.classList.add('ocultar');
      pag2.classList.add('ocultar');
      pag3.classList.add('ocultar');

      pag4.classList.remove('ocultar');
      pag4.classList.add('in');
    }, 200);
  };
  
}


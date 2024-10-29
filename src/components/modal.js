// Работа модальных окон (openModal и closeModal)

// функция открытия модального окна
export const openModal = (popup) => {      
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
  popup.addEventListener('click', closePopup);
}
// функция закрытия модального окна
export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
  popup.removeEventListener('click', closePopup);
}

// функция-обработчик события нажатия Esc
function closeEsc(evt) {
  if (evt.key === 'Escape') {
      const popupIsOpen = document.querySelector('.popup_is-opened');
      closeModal(popupIsOpen);
  }
}

// функция-обработчик события клика по оверлею
const closePopup = evt => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) { 
       closeModal(evt.currentTarget); 
  } 
}

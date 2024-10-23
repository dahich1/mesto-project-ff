import './pages/index.css';
import {initialCards} from  './components/cards.js';
import {createCard, cardLike, removeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const buttonEditprofile = document.querySelector('.profile__edit-button');
const buttonAddprofile = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupModalImage = document.querySelector('.popup_type_image');
const formEdit = document.forms['edit-profile'];
// поля формы 
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');


const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formNewPlace = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption'); 

// Вывести карточки на страницу
initialCards.forEach(element => {
    const cardContent = createCard(cardTemplate, element, cardLike, openCard, removeCard);
    placesList.append(cardContent);
});

 // Обработчик отправки формы ( отмена стандарт поведения, получение полей из св-ва value, добавление новых значений с помощью textContent)
function handleEditSubmit(evt) {
    evt.preventDefault();  
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEdit);
}  

 // Функция добавления новой карточки
function handleNewPlaceSubmit(evt) {
    evt.preventDefault(); 
    const element = {
        name: cardNameInput.value,
        link: urlInput.value,
    }    
    const newCard = createCard(cardTemplate, element, cardLike, openCard, removeCard);
    placesList.prepend(newCard); 
    formNewPlace.reset();
    closeModal(popupNewCard);
}  

// Функция открытия картинки карточки
function openCard (elLink, elName) {
    openModal(popupModalImage);
    popupCaption.textContent = elName;
    popupImage.src = elLink;
    popupImage.alt = elName;
}

// открытие модального окна
buttonEditprofile.addEventListener('click', function(){
    openModal(popupEdit);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
})  

buttonAddprofile.addEventListener('click', function(){
    openModal(popupNewCard);
}) 

formEdit.addEventListener('submit', handleEditSubmit); 

formNewPlace.addEventListener('submit', handleNewPlaceSubmit); 
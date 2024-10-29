import './pages/index.css';
import {createCard, CardLike} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {addNewCard, editUserProfile, getInitialCard, getUserData, updateAvatar, deleteCard } from './components/api.js';

// @todo: Темплейт карточки
// const cardTemplate = document.querySelector('#card-template');
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const buttonEditprofile = document.querySelector('.profile__edit-button');
const buttonAddprofile = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupModalImage = document.querySelector('.popup_type_image');
const formProfilEdit = document.forms['edit-profile'];
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
// удаление карточки
const popupDelete = document.querySelector('.popup__type_delete');
// аватар профиля
const avatarImage = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = document.forms['avatar-profile'];
const avatarInput = document.querySelector('.popup__input_type_avatar');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 
let userId = '';

//Функция редактирование аватара
formAvatar.addEventListener('submit', function(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...'
    updateAvatar(avatarInput.value)
    .then((data) => {
        avatarImage.style.backgroundImage = `url(${data.avatar})`
        closeModal(popupAvatar);
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        evt.submitter.textContent = 'Сохранить'
    })
})

// Функция редактирование информации о себе
formProfilEdit.addEventListener('submit', function(evt) {
    evt.preventDefault();
    evt.submitter.textContent = 'Сохранение...'
    editUserProfile({name: nameInput.value, about: jobInput.value})
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        closeModal(popupEdit);
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        evt.submitter.textContent = 'Сохранить'
    })
})  

 // Функция добавления карточки
function handleNewPlaceSubmit(placesList, createCard) {
    formNewPlace.addEventListener('submit', function(evt) {
        evt.preventDefault(); 
        evt.submitter.textContent = 'Сохранение...'
        const card = {name: cardNameInput.value, link: urlInput.value}
        addNewCard(card) 
        .then((element) => {
            const newCard = createCard(element, CardLike, deleteMyCard, openCard, userId);
        placesList.prepend(newCard);
        formNewPlace.reset();
        closeModal(popupNewCard);
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            evt.submitter.textContent = 'Сохранить'
        })
    })
}  

// Функция открытия картинки
export function openCard (card) {
    openModal(popupModalImage);
    popupCaption.textContent = card.name;
    popupImage.src = card.link;
    popupImage.alt = card.name;
}

// Функция удаления карточки
export function deleteMyCard(cardId, cardElement, evt) {   
    deleteCard(cardId)
    .then(() => { 
        cardElement.remove()
        closeModal(popupDelete)
    })
        .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        evt.submitter.textContent = 'Да'
    })
}

// открытие модального окна
buttonEditprofile.addEventListener('click', function(){
    openModal(popupEdit);
    clearValidation(formProfilEdit, validationConfig);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
})  

buttonAddprofile.addEventListener('click', function(){
    openModal(popupNewCard);
    clearValidation(formNewPlace, validationConfig);
}) 

avatarImage.addEventListener('click', function(){
    openModal(popupAvatar);
    clearValidation(formAvatar, validationConfig);
})

handleNewPlaceSubmit(placesList, createCard, deleteMyCard);

enableValidation(validationConfig);
    
Promise.all([getInitialCard(), getUserData()])
    .then((data) => {
            userId = data[1]._id
            profileTitle.textContent = data[1].name
            profileDescription.textContent = data[1].about;
            avatarImage.style.backgroundImage = `url(${data[1].avatar})`;
            
            data[0].forEach((element) => {
                placesList.append(createCard(element, CardLike, deleteMyCard, openCard, userId ));
            })

    })
    .catch((err) => {
        console.log(err)
    })
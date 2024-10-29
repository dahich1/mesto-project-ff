// В этом файле описаны функции для работы с карточками: функция создания карточки, функции-обработчики событий удаления и лайка карточки 
import { openModal } from "./modal.js";
import { addLike, deleteLike } from "./api.js";

// Создание карточки
export function createCard (element, CardLike, deleteMyCard, openCard, userId) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);
    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikesCounter = cardElement.querySelector('.card__like-counter');
    const cardId = element._id;
    cardTitle.textContent = element.name;
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardLikesCounter.textContent = element.likes.length;

    if (element.likes.some((like) => like._id === userId)) {
        cardLikeButton.classList.add('card__like-button_is-active')
    }

    if(element.owner._id !== userId) {
        deleteButton.classList.add('card__delete-button-hidden');
    } else {
        deleteButton.addEventListener('click', () => CardDelete(cardId, cardElement, deleteMyCard))
    }

    cardLikeButton.addEventListener('click', function() {
        CardLike(cardLikeButton, cardId, cardLikesCounter);
    });

    cardImage.addEventListener('click', function() {
        openCard(element);
    });

    return cardElement;
}

// Обработчик лайка карточки
export function CardLike (cardLikeButton, cardId, cardLikesCounter) {
  const likes = cardLikeButton.classList.contains('card__like-button_is-active') ? deleteLike : addLike;
  likes(cardId)
  .then((res) => {
      cardLikeButton.classList.toggle('card__like-button_is-active'); 
      cardLikesCounter.textContent = res.likes.length;
  })
  .catch((err) => {
      console.log(err)
  })    
}

//Обработчик удаления карточки
function CardDelete (cardId, cardElement, deleteMyCard) {
  const popupDelete = document.querySelector('.popup__type_delete');
  const formDelete = document.forms['delete-card'];
  formDelete.addEventListener('submit', (evt) => {
      evt.preventDefault();
      evt.submitter.textContent = 'Удаление...'
       deleteMyCard(cardId, cardElement, evt)
      })
  openModal(popupDelete);   
}
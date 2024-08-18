// @todo: Темплейт карточки
let cardTemplate =  document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(card, { removeCard }) {
  const cardContent = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardContent.querySelector('.card__title');
  const cardImage = cardContent.querySelector('.card__image');
  const cardDeleteButton = cardContent.querySelector('.card__delete-button');
  cardImage.alt = card.name;
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  
  cardDeleteButton.addEventListener("click", function () {
    removeCard(cardContent)
  });
  
  return cardContent;

};


// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove(); 
}


// @todo: Вывести карточки на странице
initialCards.forEach(function(card) {
  const cardContent = addCard(card,{removeCard});
  placesList.append(cardContent);
});

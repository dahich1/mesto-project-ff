export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-24",
  headers: {
    authorization: "493bea1c-7be0-48f6-933b-b19a53aedd65",
    "Content-Type": "application/json",
  }
};

// Загрузка карточек с сервера
export function getInitialCard() {
  return fetch (`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
  })
  .then(res => {
    if(res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
}

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
  })
  .then(res => {
    if(res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
  })  
} 

// Редактирование профиля
export const editUserProfile = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(data)
  })
  .then(res => {
    if(res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
}

// Добавление новой карточки
export const addNewCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify ({
          name: card.name,
          link: card.link
      })
  })
  .then(res => {
    if(res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
}

// Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
  }) 
  .then(res => {
    if(res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
}

// Постановка лайка
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, 
      {
      method: 'PUT',
      headers: config.headers
  }
)
  .then(res => {
    if(res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
}

// Снятие лайка
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
  })
  .then((res) => {
      return res.json()
  })
}

// Обновление аватара пользователя
export const updateAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          avatar: data
      })
  })
  .then(res => {
    if(res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
}
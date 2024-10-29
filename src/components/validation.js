// Показ ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  // Находим элемент в группе полей с классом содержащим идентификатор поля и суфикс -error
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  // Текст сообщение в случае ошибки
  errorElement.textContent = errorMessage;
  // Добавили скрытый класс
  errorElement.classList.add(validationConfig.errorClass);
};

// Скрытие ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Удаляем класс и скрываем видимость
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// Проверка валидации
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  // Добавлен новый текст ошибки для валидации
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);    
  } else {
      hideInputError(formElement, inputElement, validationConfig);  
  }
};

// Перебор значений массива полей ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid)
};

// Состояние кнопки переключения
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
      buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      buttonElement.disabled = false;
  }
};

// Смена состояния кнопки с вызовом toggleButtonState
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig)

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
          checkInputValidity(formElement, inputElement, validationConfig);
          toggleButtonState(inputList, buttonElement, validationConfig);
      })
  })
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('sumbit', (evt) => {
          evt.preventDefault();
      })
      setEventListeners(formElement, validationConfig)
      })
};

// Очистка
export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig);
      inputElement.value = '';
  })

  toggleButtonState(inputList, buttonElement, validationConfig)
};
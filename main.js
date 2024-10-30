(()=>{"use strict";var e=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n),e.addEventListener("click",o)},t=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),e.removeEventListener("click",o)};function n(e){if("Escape"===e.key){var n=document.querySelector(".popup_is-opened");t(n)}}var o=function(e){(e.target===e.currentTarget||e.target.classList.contains("popup__close"))&&t(e.currentTarget)},r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-24",headers:{authorization:"493bea1c-7be0-48f6-933b-b19a53aedd65","Content-Type":"application/json"}},c=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},a=function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers}).then(c)},u=function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:r.headers}).then((function(e){return e.json()}))};function i(t,n,o,r,c){var a=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),u=a.querySelector(".card__title"),i=a.querySelector(".card__image"),s=a.querySelector(".card__like-button"),l=a.querySelector(".card__delete-button"),d=a.querySelector(".card__like-counter"),p=t._id;return u.textContent=t.name,i.src=t.link,i.alt=t.name,d.textContent=t.likes.length,t.likes.some((function(e){return e._id===c}))&&s.classList.add("card__like-button_is-active"),t.owner._id!==c?l.classList.add("card__delete-button-hidden"):l.addEventListener("click",(function(){return function(t,n,o){var r=document.querySelector(".popup__type_delete");document.forms["delete-card"].onsubmit=function(e){e.preventDefault(),e.submitter.textContent="Удаление...",o(t,n,e)},e(r)}(p,a,o)})),s.addEventListener("click",(function(){n(s,p,d)})),i.addEventListener("click",(function(){r(t)})),a}function s(e,t,n){(e.classList.contains("card__like-button_is-active")?u:a)(t).then((function(t){e.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){console.log(e)}))}var l=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},d=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)},p=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t),n.value=""})),d(n,o,t)},f=document.querySelector(".places__list"),m=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_image"),b=document.forms["edit-profile"],S=document.querySelector(".popup__input_type_name"),q=document.querySelector(".popup__input_type_description"),C=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),L=document.forms["new-place"],k=document.querySelector(".popup__input_type_card-name"),g=document.querySelector(".popup__input_type_url"),x=document.querySelector(".popup__image"),T=document.querySelector(".popup__caption"),U=document.querySelector(".popup__type_delete"),A=document.querySelector(".profile__image"),D=document.querySelector(".popup_type_avatar"),w=document.forms["avatar-profile"],B=document.querySelector(".popup__input_type_avatar"),P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},j="";function N(t){e(h),T.textContent=t.name,x.src=t.link,x.alt=t.name}function O(e,n,o){(function(e){return fetch("".concat(r.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:r.headers}).then(c)})(e).then((function(){n.remove(),t(U)})).catch((function(e){console.log(e)})).finally((function(){o.submitter.textContent="Да"}))}w.addEventListener("submit",(function(e){var n;e.preventDefault(),e.submitter.textContent="Сохранение...",(n=B.value,fetch("".concat(r.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:n})}).then(c)).then((function(e){A.style.backgroundImage="url(".concat(e.avatar,")"),t(D)})).catch((function(e){console.log(e)})).finally((function(){e.submitter.textContent="Сохранить"}))})),b.addEventListener("submit",(function(e){var n;e.preventDefault(),e.submitter.textContent="Сохранение...",(n={name:S.value,about:q.value},fetch("".concat(r.baseUrl,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify(n)}).then(c)).then((function(e){C.textContent=e.name,E.textContent=e.about,t(v)})).catch((function(e){console.log(e)})).finally((function(){e.submitter.textContent="Сохранить"}))})),m.addEventListener("click",(function(){e(v),p(b,P),S.value=C.textContent,q.value=E.textContent})),_.addEventListener("click",(function(){e(y),p(L,P)})),A.addEventListener("click",(function(){e(D),p(w,P)})),function(e,n){L.addEventListener("submit",(function(o){var a;o.preventDefault(),o.submitter.textContent="Сохранение...",(a={name:k.value,link:g.value},fetch("".concat(r.baseUrl,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:a.name,link:a.link})}).then(c)).then((function(o){var r=n(o,s,O,N,j);e.prepend(r),L.reset(),t(y)})).catch((function(e){console.log(e)})).finally((function(){o.submitter.textContent="Сохранить"}))}))}(f,i),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("sumbit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);d(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),d(n,o,t)}))}))}(t,e)}))}(P),Promise.all([fetch("".concat(r.baseUrl,"/cards"),{method:"GET",headers:r.headers}).then(c),fetch("".concat(r.baseUrl,"/users/me"),{method:"GET",headers:r.headers}).then(c)]).then((function(e){j=e[1]._id,C.textContent=e[1].name,E.textContent=e[1].about,A.style.backgroundImage="url(".concat(e[1].avatar,")"),e[0].forEach((function(e){f.append(i(e,s,O,N,j))}))})).catch((function(e){console.log(e)}))})();
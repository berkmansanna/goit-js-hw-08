import throttle from 'lodash.throttle';

const refs = {
  formEl: document.querySelector('form'),
  emailEl: document.querySelector('[name="email"]'),
  messageEl: document.querySelector('[name="message"]'),
};

refs.formEl.addEventListener('input', throttle(onTextForm, 500));
refs.formEl.addEventListener('submit', onSubmitForm);

const KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

function onTextForm(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(KEY, JSON.stringify(formData));
}

function onGetDataForm(evt) {
  const savedData = JSON.parse(localStorage.getItem(KEY));

  if (savedData) {
    refs.emailEl.value = savedData.email;
    refs.messageEl.value = savedData.message;

    formData.email = savedData.email;
    formData.message = savedData.message;
  }
}
onGetDataForm();

function onSubmitForm(evt) {
  evt.preventDefault();
  localStorage.removeItem(KEY);
  evt.currentTarget.reset();
  console.log(formData);

  formData.email = '';
  formData.message = '';
}

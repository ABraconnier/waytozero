var sf = {};

const buttons = document.querySelectorAll('.trigger');
sf.container = document.querySelector('.mail-form');
sf.form = document.querySelector('.mail-form > .singular-form');
sf.trigger = document.querySelector('.mail-form > .singular-form > button.trigger');
sf.input = document.querySelector('.mail-form>.singular-form>.input-container>input');
sf.emailWarner = document.querySelector('.mail-form-container > .email-warner');
sf.submitButton = document.querySelector('.mail-form > .singular-form > .input-container > button');
sf.successMessage = document.querySelector('.mail-form > .singular-form > .success');
var screen = window.matchMedia('(max-width: 575.98px)');

sf.submitDelay = 1500;

sf.clickHandler = (e) => {
    switch (e.target) {
        case sf.trigger:
          if (screen.matches) {
          sf.container.style.width = '100%';
            } else {
          sf.container.style.width = '50vw';
          }
            e.target.classList.remove('shown');
            sf.input.classList.add('shown');
            sf.submitButton.classList.add('shown');
            if (screen.matches) {
              sf.emailWarner.innerHTML = "Your email address is required to take into consideration the importance of the demand for this project. We will never use it for commercial purposes.";
                } else {
              sf.emailWarner.innerHTML = "Your email address is required to take into consideration the importance of the demand for this project.<br>We will never use it for commercial purposes.";
              }
            sf.input.focus();
            break;
        case sf.submitButton:
            sf.submitForm();
            break;
    }
}

sf.handleInputKeypress = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        sf.submitForm();
    }
}

sf.submitForm = () => {
    sf.input.style.transition = 'all .4s ease';
    sf.submitButton.style.transition = 'all .4s ease';
    sf.input.classList.remove('shown');
    sf.submitButton.classList.remove('shown');
    sf.container.style.transition = 'all .4s cubic-bezier(0.47, 0.47, 0.27, 1.20) .4s';
    sf.container.style.width = '';
    sf.successMessage.classList.add('shown');
    let submission = setTimeout(() => sf.form.submit(), sf.submitDelay);
}

sf.container.addEventListener('click', (e) => sf.clickHandler(e));
// const callback = (event) => { event.currentTarget, sf.clickHandler(event) };
// buttons.forEach(btn => btn.addEventListener('click', callback)

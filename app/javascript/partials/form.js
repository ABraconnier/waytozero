const addClass = (choice) => {
  choice.classList.add("active-form");
  console.log('test');
};

const eventForm = () => {
const choices = document.querySelectorAll(".question-choice");
choices.forEach(choice => choice.addEventListener('click', (event) => {
  event.currentTarget.classList.toggle("active-form")
  event.currentTarget.querySelector("input").checked = !event.currentTarget.querySelector("input").checked
 }));
};

export {eventForm};

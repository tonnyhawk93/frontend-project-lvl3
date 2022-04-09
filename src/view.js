import onChange from 'on-change';

const form = document.querySelector('form');
const container = document.querySelector('#root');

const watch = (state) => onChange(state, (path, value) => {
  if (path.startsWith('urls')) {
    form.reset();
    form.elements.url.focus();
  }
  if (path.startsWith('error')) {
    if (value) {
      const errorFeedback = document.createElement('p');
      errorFeedback.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger');
      errorFeedback.id = 'errorFeedback';
      errorFeedback.textContent = value.message;
      container.append(errorFeedback);
      form.elements.url.classList.add('is-invalid');
    } else {
      container.querySelector('#errorFeedback').remove();
      form.elements.url.classList.remove('is-invalid');
    }
  }
});

export default watch;

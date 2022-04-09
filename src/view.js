import onChange from 'on-change';

const form = document.querySelector('form');
const container = document.querySelector('#root');

const createErrorFeedback = (message) => {
  const errorFeedback = document.createElement('p');
  errorFeedback.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger');
  errorFeedback.id = 'errorFeedback';
  errorFeedback.textContent = message;
  return errorFeedback;
};

const watch = (state, i18) => onChange(state, (path, value, prevValue) => {
  if (path.startsWith('urls')) {
    form.reset();
    form.elements.url.focus();
  }
  if (path.startsWith('form.errors.url')) {
    let errorFeedback = container.querySelector('#errorFeedback');
    if (value) {
      if (value !== prevValue) {
        const errorMessage = i18(value);

        if (errorFeedback) {
          errorFeedback.textContent = errorMessage;
        } else {
          errorFeedback = createErrorFeedback(errorMessage);
          container.append(errorFeedback);
          form.elements.url.classList.add('is-invalid');
        }
      }
    } else {
      if (errorFeedback) errorFeedback.remove();
      form.elements.url.classList.remove('is-invalid');
    }
  }
});

export default watch;

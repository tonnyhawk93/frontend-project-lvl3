import onChange from 'on-change';
import { createErrorFeedback, createSuccessFeedback } from './components/createErrorFeedback.js';
import { createPostsList, createFeedsList } from './components/createPostsList.js';

const watch = (state, i18) => onChange(state, (path, value, prevValue) => {
  if (path.startsWith('form.isValid')) {
    if (document) {
      const form = document.querySelector('form');
      if (value) {
        form.elements.url.classList.remove('is-invalid');
      } else {
        form.elements.url.classList.add('is-invalid');
      }
    }
  }

  if (path.startsWith('error')) {
    if (document) {
      const formContainer = document.querySelector('#formContainer');
      let errorFeedback = formContainer.querySelector('#errorFeedback');
      if (value) {
        if (value !== prevValue) {
          const errorMessage = i18(value);

          if (errorFeedback) {
            errorFeedback.textContent = errorMessage;
          } else {
            errorFeedback = createErrorFeedback(errorMessage);
            formContainer.append(errorFeedback);
          }
        }
      }
    }
  }
  if (path.startsWith('feeds')) {
    if (document) {
      const feedsContainer = document.querySelector('#feedsContainer');
      feedsContainer.innerHTML = '';
      const feedsList = createFeedsList(value);
      feedsContainer.append(feedsList);
    }
  }
  if (path.startsWith('posts')) {
    if (document) {
      if (value && value.length) {
        const postsContainer = document.querySelector('#postsContainer');
        postsContainer.innerHTML = '';
        const postsList = createPostsList(value, i18);
        postsContainer.append(postsList);
      }
    }
  }

  if (path.startsWith('status')) {
    if (value === 'success') {
      if (document) {
        const form = document.querySelector('form');
        const formContainer = document.querySelector('#formContainer');
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.classList.remove('disabled');
        form.elements.url.value = '';
        form.elements.url.focus();
        const errorFeedback = formContainer.querySelector('#errorFeedback');
        if (errorFeedback) errorFeedback.remove();
        const successFeedback = createSuccessFeedback(i18('successMessage'));
        formContainer.append(successFeedback);
        form.elements.url.removeAttribute('readonly');
        submitButton.removeAttribute('disabled');
      }
    }
    if (value === 'loading') {
      if (document) {
        const submitButton = document.querySelector('button[type="submit"]');
        const form = document.querySelector('form');
        submitButton.classList.add('disabled');
        submitButton.setAttribute('disabled', true);
        form.elements.url.setAttribute('readonly', true);
      }
    }
    if (value === 'error') {
      if (document) {
        const formContainer = document.querySelector('#formContainer');
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.classList.remove('disabled');
        const form = document.querySelector('form');
        const successFeedback = formContainer.querySelector('#successFeedback');
        if (successFeedback) successFeedback.remove();
        form.elements.url.removeAttribute('readonly');
        submitButton.removeAttribute('disabled');
      }
    }
  }
});

export default watch;

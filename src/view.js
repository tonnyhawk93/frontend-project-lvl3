import onChange from 'on-change';
import { createErrorFeedback, createSuccessFeedback } from './components/createErrorFeedback.js';
import { createPostsList, createFeedsList } from './components/createPostsList.js';

const form = document.querySelector('form');
const formContainer = document.querySelector('#formContainer');
const postsContainer = document.querySelector('#postsContainer');
const feedsContainer = document.querySelector('#feedsContainer');
const submitButton = document.querySelector('button[type="submit"]');

const watch = (state, i18) => onChange(state, (path, value, prevValue) => {
  if (path.startsWith('form.isValid')) {
    if (value) {
      form.elements.url.classList.remove('is-invalid');
    } else {
      form.elements.url.classList.add('is-invalid');
    }
  }

  if (path.startsWith('errors')) {
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
  if (path.startsWith('feeds')) {
    const feedsList = createFeedsList(value);
    feedsContainer.append(feedsList);
  }
  if (path.startsWith('posts')) {
    const postsList = createPostsList(value);
    postsContainer.append(postsList);
  }
  if (path.startsWith('status')) {
    submitButton.classList.remove('disabled');

    if (value === 'success') {
      form.reset();
      form.elements.url.focus();
      const errorFeedback = formContainer.querySelector('#errorFeedback');
      if (errorFeedback) errorFeedback.remove();
      const successFeedback = createSuccessFeedback(i18('successMessage'));
      formContainer.append(successFeedback);
    }
    if (value === 'loading') {
      submitButton.classList.add('disabled');
    }
    if (value === 'error') {
      const successFeedback = formContainer.querySelector('#successFeedback');
      if (successFeedback) successFeedback.remove();
    }
  }
});

export default watch;

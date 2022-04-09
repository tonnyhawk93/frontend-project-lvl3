import { validateUrl } from './validator.js';
import watch from './view.js';

const form = document.querySelector('form');

const state = {
  urls: [],
  error: null,
};
const watchedState = watch(state);

const app = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    if (watchedState.urls.includes(url)) {
      watchedState.error = { message: 'Такой url уже вводился' };
      return;
    }
    validateUrl(url).then(() => {
      watchedState.urls = [...watchedState.urls, url];
      if (watchedState.error) watchedState.error = null;
    })
      .catch((error) => {
        watchedState.error = error;
      });
  });
};

export default app;

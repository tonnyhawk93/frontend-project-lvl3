import { validateUrl } from './validator.js';
import watch from './view.js';

const form = document.querySelector('form');

const initialState = {
  urls: [],
  form: {
    errors: {},
  },
};

const app = (i18nextInstance) => {
  const state = watch(initialState, i18nextInstance);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    validateUrl(url).then(() => {
      if (state.urls.includes(url)) throw new Error('errors.addedBefore');
      if (state.form.errors.url) state.form.errors.url = null;
      state.urls = [...state.urls, url];
    })
      .catch(({ message }) => {
        state.form.errors.url = message;
      });
  });
};

export default app;

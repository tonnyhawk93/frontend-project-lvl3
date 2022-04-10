import parser from './parser/index.js';
import textToXmlConverter from './parser/domParser.js';
import { validateUrl } from './validator.js';
import watch from './view.js';
import getRssStream from './getRssStream.js';

const form = document.querySelector('form');

const initialState = {
  urls: [],
  feeds: [],
  posts: [],
  error: null,
  status: 'default',
  form: {
    isValid: true,
  },
};
const app = (i18) => {
  const state = watch(initialState, i18);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    validateUrl(url)
      .then(() => {
        state.status = 'loading';
        if (state.urls.includes(url)) throw new Error('errors.addedBefore');
        state.form.isValid = true;
        return url;
      })
      .catch((error) => {
        state.form.isValid = false;
        throw error;
      })
      .then(getRssStream)
      .then(textToXmlConverter)
      .then(parser)
      .then(({ feed, posts }) => {
        state.urls = [...state.urls, url];
        state.feeds = [...state.feeds, feed];
        state.posts = [...state.posts, ...posts];
        state.status = 'success';
        state.errors = null;
      })
      .catch(({ message }) => {
        state.status = 'error';
        state.errors = message;
      });
  });
};

export default app;

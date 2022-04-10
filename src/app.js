import parser from './parser/index.js';
import textToXmlConverter from './parser/domParser.js';
import { validateUrl } from './validator.js';
import watch from './view.js';
import getRssStream from './getRssStream.js';
import updatePosts from './updatePosts.js';

const app = (i18) => {
  const initialState = {
    urls: [],
    feeds: [],
    posts: [],
    activePost: null,
    error: null,
    status: 'default',
    form: {
      isValid: true,
    },
  };

  const state = watch(initialState, i18);
  const form = document.querySelector('form');
  const postsContainer = document.querySelector('#postsContainer');
  
  const updatePostProcess = () => {
    setTimeout(() => {
      updatePosts(state).then((newPosts) => {
        if (newPosts.length) {
          state.posts = [...state.posts, ...newPosts];
        }
        updatePostProcess(state);
      });
    }, 5000);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    validateUrl(url)
      .then(() => {
        state.status = 'loading';
        if (state.urls.includes(url)) throw new Error('error.addedBefore');
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
        state.error = null;
      })
      .catch(({ message }) => {
        state.status = 'error';
        state.error = message;
      });
  });

  postsContainer.addEventListener('DOMSubtreeModified', () => {
    const buttons = postsContainer.querySelectorAll('button');
    const postLinks = postsContainer.querySelectorAll('a');

    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const postId = e.target.dataset.id;
        state.activePostId = postId;
        state.posts = state.posts.map((post) => {
          if (post.id === postId) {
            return { ...post, visited: true };
          }

          return post;
        });
      });
    });
    postLinks.forEach((postLink) => {
      postLink.addEventListener('click', (e) => {
        const postId = e.target.dataset.id;
        state.posts = state.posts.map((post) => {
          if (post.id === postId) {
            return { ...post, visited: true };
          }

          return post;
        });
      });
    });
  });

  updatePostProcess();
};

export default app;

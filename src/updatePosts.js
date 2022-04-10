import getRssStream from './getRssStream.js';
import parser from './parser/index.js';
import domParser from './parser/domParser.js';

const updatePosts = (state) => {
  const currentPosts = state.posts;
  const { urls } = state;
  if (urls.length) {
    const data = urls.map((url) => getRssStream(url).then(domParser).then(parser));
    return Promise.all(data)
      .then((responses) => responses.reduce((acc, { feed, posts }) => {
        const currentFeedPosts = currentPosts.filter((post) => post.feedId === feed.id);
        const predicat = (post) => !currentFeedPosts.some(({ id }) => id === post.id);
        const newCurrentFeedPosts = posts.filter(predicat);
        return [...acc, ...newCurrentFeedPosts];
      }, []))
      .then((newPosts) => {
        if (newPosts.length) {
          // eslint-disable-next-line no-param-reassign
          state.posts = [...state.posts, ...newPosts];
        }
      })
      .catch(() => { throw new Error('error.netError'); });
  }
  return Promise.resolve();
};

const updatePostProcess = (state) => {
  setTimeout(() => {
    updatePosts(state).then(() => updatePostProcess(state));
  }, 5000);
};

export default updatePostProcess;

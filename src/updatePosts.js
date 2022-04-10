import getRssStream from './getRssStream.js';
import parser from './parser/index.js';
import domParser from './parser/domParser.js';

const updatePosts = (state) => {
  const currentPosts = state.posts;
  const { urls } = state;
  if (urls && urls.length) {
    const data = urls.map((url) => getRssStream(url).then(domParser).then(parser));
    return Promise.all(data)
      .then((responses) => responses.reduce((acc, { feed, posts }) => {
        const currentFeedPosts = currentPosts.filter((post) => post.feedId === feed.id);
        const predicat = (post) => !currentFeedPosts.some(({ guid }) => guid === post.guid);
        const newCurrentFeedPosts = posts.filter(predicat);
        return [...acc, ...newCurrentFeedPosts];
      }, []))
      .catch(() => { throw new Error('error.netError'); });
  }
  return Promise.resolve();
};

export default updatePosts;

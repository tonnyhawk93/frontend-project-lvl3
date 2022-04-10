import axios from 'axios';

const getRssStream = (url) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
  .then((res) => res.data.contents)
  .catch(() => {
    throw new Error('errors.netError');
  });

export default getRssStream;

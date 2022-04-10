import i18next from 'i18next';
import ru from './locales/ru.js';
import app from './app.js';

const runApp = () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    resources: {
      ru,
    },
  }).then(app);
};

export default runApp;

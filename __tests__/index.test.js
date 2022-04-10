import { validateUrl } from '../src/validator';

const trueUrl = 'https://github.com/jquense/yup';
const fakeUrl = 'htps://github.com/jquense/yup';

test('validateUrl валидирует', async () => {
  const result = await validateUrl(trueUrl);
  expect(result).toBeTruthy();
});

test('validateUrl возращает правильное сообщение при ошибке', async () => {
  const result = await validateUrl(fakeUrl);
  expect(result).not.toBeTruthy();
});

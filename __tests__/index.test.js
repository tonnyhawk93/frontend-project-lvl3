import { fileURLToPath } from 'url';
import path from 'path';
import {validateUrl} from '../src/validator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const trueUrl = 'https://github.com/jquense/yup';
const fakeUrl = 'htps://github.com/jquense/yup';

test('validateUrl валидирует', async() => {
  const result = await validateUrl(trueUrl);
  expect(result).toBeTruthy();
});

test('validateUrl возращает правильное сообщение', async() => {
  try {
    const result = await validateUrl(fakeUrl);
    expect(result).not.toBeTruthy();
  }catch(e) {
    expect(e.message).toEqual('this must be a valid URL');
  }
});

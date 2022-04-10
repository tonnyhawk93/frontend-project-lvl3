import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';
import { validateUrl } from '../src/validator';
import parser from '../src/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const trueUrl = 'https://github.com/jquense/yup';
const fakeUrl = 'htps://github.com/jquense/yup';

test('validateUrl валидирует', async () => {
  const result = await validateUrl(trueUrl);
  expect(result).toBeTruthy();
});

test('validateUrl возращает правильное сообщение при ошибке', async () => {
  try {
    const result = await validateUrl(fakeUrl);
    expect(result).not.toBeTruthy();
  } catch (e) {
    expect(e.message).toEqual('errors.url');
  }
});

test('Парсер возращает правильную ошибку при невалидном xml', async () => {
  try {
    const response = await fs.readFile(getFixturePath('invalidXml.xml', 'utf-8'));
    expect(parser(response)).not.toBeTruthy();
  } catch (error) {
    expect(error.message).toEqual('errors.parseError');
  }
});
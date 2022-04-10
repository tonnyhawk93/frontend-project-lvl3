import { string, setLocale } from 'yup';

setLocale({
  string: {
    url: 'error.url',
    required: 'error.empty',
  },
});

const urlSchema = string().url().required();

export const validate = (schema, data) => schema.validate(data);

export const validateUrl = (url) => validate(urlSchema, url);

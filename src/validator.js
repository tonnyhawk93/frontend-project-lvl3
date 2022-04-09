import { object, string } from 'yup';

const urlSchema = string().url().required();

const validate = (schema, data) => schema.validate(data);

export const validateUrl = url => validate(urlSchema, url);
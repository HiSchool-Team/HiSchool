import { QA } from './types';
import axios from 'axios';

export const fetchQAs = (): Promise<QA[]> => {
  return axios.get('/app/api/qa/')
    .then(res => res.data)
    .catch((err) => console.warn('error when fetching qas', err));
};

export const postQA = (qa: QA) => {
  return axios.post('/app/api/qa/', qa)
    .catch(err => console.warn('error when posting qas'));
};

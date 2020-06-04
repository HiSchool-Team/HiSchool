import { QA } from './types';
import axios from 'axios';

export const fetchQAs = (): Promise<QA[]> => {
  return axios.get('/app/api/qa/')
    .then(res => res.data)
    .catch((err) => console.warn('error when fetching qas', err));
};

export const postQA = (qa: QA) => {
  // FIXME enforce at the type level
  const authoredQA = qa;
  // @ts-ignore
  authoredQA.question.author = 'John Smith';

  console.log('postingQA:');
  console.log(JSON.stringify(qa));

  return axios.post(
    '/app/api/qa/', qa,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .catch(err => console.warn('error when posting QA', err));
};

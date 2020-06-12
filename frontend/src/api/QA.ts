import { QA } from '../types';
import axios from 'axios';

class QAAPI {
  getAll (): Promise<QA[]> {
    return axios.get('/app/api/qa/')
      .then(res => res.data)
      .catch((err) => {
        alert('error when fetching QAs');
        console.warn('error when fetching QAs', err);
      });
  }

  getAllUnanswered (): Promise<QA[]> {
    // eslint-disable-next-line eqeqeq
    return this.getAll().then(qas => qas.filter(qa => qa.answer == undefined));
  }

  getAddressedTo (school_id: number): Promise<QA[]> {
    return axios.get(`/app/api/qa/?recipient_school=${school_id}`)
      .then(res => res.data)
      .catch((err) => {
        alert('error when fetching QAs');
        console.warn(`error when fetching QAs for school with id ${school_id}`, err);
      });
  }

  post (qa: QA) {
    // FIXME enforce at the type level
    const authoredQA = qa;
    // @ts-ignore
    authoredQA.question.author = 'John Smith';

    return axios.post(
      '/app/api/qa/',
      qa,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch(err => {
        alert('error when posting QA');
        console.warn('error when posting QA', err);
      });
  }

  put (qa: QA) {
    // FIXME enforce at the type level
    const authoredQA = qa;
    // @ts-ignore
    authoredQA.question.author = 'John Smith';

    return axios.put(
      `/app/api/qa/${qa.id}/`,
      qa,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).catch(err => {
      alert('error when updating QA');
      console.warn('error when updating QA: ', err);
      console.warn(qa);
    });
  }
}

const qaAPI = new QAAPI();
export default qaAPI;

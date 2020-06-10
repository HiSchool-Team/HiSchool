import axios from 'axios';
import { QA, School } from '../types';

export interface IUserAPI {
  getSavedQAs (): Promise<QA[]>,

  hasSavedQA (qa: QA): Promise<boolean>,

  getSavedSchools (): Promise<School[]>,

  hasSavedSchool (school: School): Promise<boolean>,

  saveQA (qa: QA): Promise<void>,

  unsaveQA (qa: QA): Promise<void>,
}

class UserAPI implements IUserAPI {
  getSavedQAs (): Promise<QA[]> {
    return axios.get('/app/api/user/saved_qa/')
      .then(res => res.data)
      .catch((err) => {
        alert('error when fetching saved QAs');
        console.warn('error when fetching saved QAs', err);
      });
  }

  hasSavedQA (qa: QA): Promise<boolean> {
    console.log(`Called "hasSavedQA(qa)" where qa=${JSON.stringify(qa)}`);
    return this.getSavedQAs().then(qas => qas.map(savedQA => savedQA.id).includes(qa.id));
  }

  getSavedSchools (): Promise<School[]> {
    return axios.get('/app/api/user/saved_school/')
      .then(res => res.data)
      .catch((err) => {
        alert('error when fetching saved Schools');
        console.warn('error when fetching saved Schools', err);
      });
  }

  hasSavedSchool (school: School): Promise<boolean> {
    return this.getSavedSchools().then(schools => schools.map(s => s.id).includes(school.id));
  }

  saveQA (qa: QA): Promise<void> {
    return axios.post(`/app/api/user/saved_qa/${qa.id}/`, {})
      .catch((err) => {
        const msg = `error when saving qa:\n ${JSON.stringify(qa)}`;
        alert(msg);
        console.warn(msg, err);
      })
      .then();
  }

  unsaveQA (qa: QA): Promise<void> {
    return axios.delete(`/app/api/user/saved_qa/${qa.id}/`, {})
      .catch((err) => {
        const msg = `error when deleting qa:\n ${JSON.stringify(qa)}`;
        alert(msg);
        console.warn(msg, err);
      })
      .then();
  }
}

const user: IUserAPI = new UserAPI();
export default user;

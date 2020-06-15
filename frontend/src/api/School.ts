import { School } from '../types';
import axios from 'axios';

interface ISchoolAPI {
  getAll (): Promise<School[]>,

  get (id: number): Promise<School>,
}

class SchoolAPI implements ISchoolAPI {
  getAll (): Promise<School[]> {
    return axios.get('/app/api/school/')
      .then(res => res.data)
      .catch((err) => {
        const msg = 'error when getting Schools';
        alert(msg);
        console.warn(msg, err);
      });
  }

  get (id: number): Promise<School> {
    return axios.get(`/app/api/school/${id}/`)
      .then(res => res.data)
      .catch((err) => {
        alert('error when fetching QAs');
        console.warn(`error when fetching QAs for school with id ${id}`, err);
      });
  }

  post (school: School): Promise<void> {
    return axios.post(
      '/app/api/school/',
      school,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch((err) => {
        const msg = `error when posting school: ${JSON.stringify(school)}`;
        alert(msg);
        console.warn(msg, err);
      })
      .then();
  }
}

const schoolAPI = new SchoolAPI();
export default schoolAPI;

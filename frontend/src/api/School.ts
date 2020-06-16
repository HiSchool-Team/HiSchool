import { PrioritizedTag, School } from '../types';
import axios from 'axios';
import authAPI from './Auth';

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

  post (school: School): Promise<School> {
    const headers = {
      ...authAPI.getHeaders(),
      'Content-Type': 'application/json'
    };

    console.log('posting school with headers');
    console.log(headers);

    return axios.post(
      '/app/api/school/',
      school,
      {
        headers: headers
      })
      .then(res => res.data)
      .catch((err) => {
        const msg = `error when posting school: ${JSON.stringify(school)}`;
        alert(msg);
        console.warn(msg, err);
      });
  }

  findMatchesBy (prioritizedTags: PrioritizedTag[]): Promise<School[]> {
    return axios.post(
      '/app/api/school/match/',
      prioritizedTags,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.data)
      .catch(err => {
        const msg = 'Failed to find matches';
        alert(msg);
        console.warn(msg, err);
      });
  }
}

const schoolAPI = new SchoolAPI();
export default schoolAPI;

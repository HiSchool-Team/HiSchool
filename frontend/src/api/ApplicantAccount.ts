import axios from 'axios';
import { QA, School } from '../types';
import userContext from '../context/User';
import authAPI from './Auth';

interface IApplicantAccountAPI {
  getSavedSchools (): Promise<School[]>,

  hasSavedSchool (school: School): Promise<boolean>,

  saveSchool (school: School): Promise<void>,

  unsaveSchool (school: School): Promise<void>,

  getSavedQAs (): Promise<QA[]>,

  hasSavedQA (qa: QA): Promise<boolean>,

  saveQA (qa: QA): Promise<void>,

  unsaveQA (qa: QA): Promise<void>,
}

class ApplicantAccountAPI implements IApplicantAccountAPI {
  getSavedSchools (): Promise<School[]> {
    return axios.get('/app/api/account/applicant/saved_school/',
      {
        headers: authAPI.getHeader()
      })
      .then(res => res.data)
      .catch((err) => {
        alert('error when fetching saved Schools');
        console.warn('error when fetching saved Schools', err);
      });
  }

  hasSavedSchool (school: School): Promise<boolean> {
    return this.getSavedSchools().then(schools => schools.map(s => s.id).includes(school.id));
  }

  saveSchool (school: School): Promise<void> {
    return axios.post(
      `/app/api/account/applicant/saved_school/${school.id}/`,
      {},
      {
        headers: authAPI.getHeader()
      })
      .catch((err) => {
        const msg = `error when saving user school:\n ${JSON.stringify(school)}`;
        alert(msg);
        console.warn(msg, err);
      })
      .then();
  }

  unsaveSchool (school: School): Promise<void> {
    return axios.delete(
      `/app/api/account/applicant/saved_school/${school.id}/`,
      {
        headers: authAPI.getHeader()
      })
      .catch((err) => {
        const msg = `error when unsaving user school:\n ${JSON.stringify(school)}`;
        alert(msg);
        console.warn(msg, err);
      })
      .then();
  }

  getSavedQAs (): Promise<QA[]> {
    return axios.get('/app/api/account/applicant/saved_qa/',
      {
        headers: authAPI.getHeader()
      })
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

  saveQA (qa: QA): Promise<void> {
    return axios.post(
      `/app/api/account/applicant/saved_qa/${qa.id}/`,
      {},
      {
        headers: authAPI.getHeader()
      })
      .catch((err) => {
        const msg = `error when saving user qa:\n ${JSON.stringify(qa)}`;
        alert(msg);
        console.warn(msg, err);
      })
      .then();
  }

  unsaveQA (qa: QA): Promise<void> {
    return axios.delete(
      `/app/api/account/applicant/saved_qa/${qa.id}/`,
      {
        headers: authAPI.getHeader()
      })
      .catch((err) => {
        const msg = `error when unsaving user qa:\n ${JSON.stringify(qa)}`;
        alert(msg);
        console.warn(msg, err);
      })
      .then();
  }
}

const applicantAccountAPI: IApplicantAccountAPI = new ApplicantAccountAPI();
export default applicantAccountAPI;

import axios from 'axios';
import userContext from '../context/User';
import { User } from '../types';

type AuthHeader = {
  Authorization: string,
};

const token = '__token';

class AuthAPI {
  getHeaders (): AuthHeader {
    return {
      Authorization: `Token ${localStorage.getItem(token)}`
    };
  }

  register (
    username: string,
    email: string,
    password: string,
    reconfirmedPassword: string,
    isApplicantAccount: boolean
  ): Promise<void> {
    const data = {
      username: username,
      password1: password,
      password2: reconfirmedPassword,
      is_school: !isApplicantAccount,
      is_user: isApplicantAccount
    };

    console.log('Attempting to register user with data');
    console.log(data);

    return axios.post(
      '/app/api/rest_auth/registration/',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(_ => {})
      .catch(err => {
        const msg = 'Failed to register account';
        alert(msg);
        console.warn(msg);
      });
  }

  login (username: string, password: string): Promise<void> {
    return axios.post(
      '/app/api/rest_auth/login/',
      {
        username: username,
        password: password
      })
      .then(res => {
        localStorage.setItem(token, res.data.key);
      })
      .then(() => {
        axios.get(
          '/app/api/current_user/',
          {
            headers: authAPI.getHeaders()
          }
        ).then(userRes => {
          const currentUser: User = userRes.data;
          userContext.set(currentUser);
          window.location.reload(true);
        });
      });
  }

  logout (): void {
    userContext.clear();
    localStorage.removeItem(token);
    window.location.reload(true);
  }
}

const authAPI = new AuthAPI();
export default authAPI;

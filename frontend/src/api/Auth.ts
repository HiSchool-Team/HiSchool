import axios from 'axios';

type AuthHeader = {
  Authorization: string,
};

const user = '__user';
const token = '__token';

class AuthAPI {
  getCurrentUser (): string {
    return localStorage.getItem(user) || '';
  }

  getHeader (): AuthHeader {
    return {
      Authorization: `Token ${localStorage.getItem(token)}`
    };
  }

  register (username: string, email: string, password: string): Promise<void> {
    // TODO
    return axios.get('');
  }

  login (username: string, password: string): Promise<void> {
    return axios.post(
      '/app/api/token_auth/',
      {
        username: username,
        password: password
      })
      .then(res => {
        localStorage.setItem(user, username);
        localStorage.setItem(token, res.data);
      });
  }

  logout (): void {
    localStorage.removeItem(user);
    localStorage.removeItem(token);
    window.location.reload(true);
  }
}

const authAPI = new AuthAPI();
export default authAPI;

import { Tag } from '../types';
import axios from 'axios';

class TagAPI {
  getAll (): Promise<Tag[]> {
    return axios.get('/app/api/tag/')
      .then(res => res.data)
      .catch((err) => {
        const msg = 'error when getting Tags';
        alert(msg);
        console.warn(msg, err);
      });
  }
}

const tagAPI = new TagAPI();
export default tagAPI;

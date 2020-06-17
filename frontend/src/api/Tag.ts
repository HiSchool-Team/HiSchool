import { School, Tag } from '../types';
import axios from 'axios';

class TagAPI {
  getAll (): Promise<Tag[]> {
    return axios.get('/app/api/tag/')
      .then(res => res.data)
      .catch((err) => {
        const msg = 'error when getting Tags';
        // alert(msg);
        console.warn(msg, err);
      });
  }

  getFor (school: School): Promise<Tag[]> {
    return axios.all(
      school.tags.map(tag_id => {
        return axios
          .get(`/app/api/tag/${tag_id}/`)
          .then(r => r.data);
      })
    );
  }
}

const tagAPI = new TagAPI();
export default tagAPI;

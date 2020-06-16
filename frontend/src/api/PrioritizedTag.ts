import { PrioritizedTag, School } from '../types';
import axios from 'axios';

class PrioritizedTagAPI {
  postTags (prioritizedTags: PrioritizedTag[]): Promise<void> {
    return axios
      .post(
          '/app/api/prioritized_tags/',
          prioritizedTags,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(_ => {})
      .catch(err => {
        const msg = 'failed to add prioritized tags';
        console.warn(msg, err);
      });
  }
}

const prioritizedTagAPI = new PrioritizedTagAPI();
export default prioritizedTagAPI;

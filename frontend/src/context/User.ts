import { User } from '../types';

const userKey = '__user';

class UserContext {
  set (user: User): void {
    localStorage.setItem(userKey, JSON.stringify(user));
  }

  clear (): void {
    localStorage.removeItem(userKey);
  }

  get (): User | undefined {
    const item = localStorage.getItem(userKey);
    if (!item) {
      return undefined;
    }

    console.log('user item: ');
    console.log(item);

    return JSON.parse(item);
  }

  isApplicantAccount (): boolean {
    return this.get()?.is_user || false;
  }

  isSchoolAccount (): boolean {
    return this.get()?.is_school || false;
  }

  getSchoolId (): number | undefined {
    return this.get()?.school?.id;
  }

  isLoggedIn (): boolean {
    return this.get() !== undefined;
  }
}

const userContext = new UserContext();
export default userContext;

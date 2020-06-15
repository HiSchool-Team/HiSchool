import history from './history';
import { Location } from 'history';

export const getSearchResult = (location: Location): Record<string, string> => {
  const qs = require('qs');
  return qs.parse(location.search, { ignoreQueryPrefix: true });
};

export const goToNewUrl = (basePath: string,
  searchParams?: string[][] | Record<string, string> | string | URLSearchParams): void => {
  // https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
  history.push({
    pathname: basePath,
    search: `?${new URLSearchParams(searchParams)}`
  });
};

/*
enum accountType {
  Applicant = 0,
  School = 1,
}

export const getUserDetails = () => {
  // TODO global function that returns account type
  return {
    name: 'name',
    type: accountType.School,
    schoolId: 1,
  };
};

export const userIsLoggedIn = () => {
  return getUserDetails() !== undefined;
}

export const userIsApplicant = () => {
  const userDetails = getUserDetails();
  if (userDetails === undefined) {
    return false;
  }
  return userDetails.type === accountType.Applicant;
};

export const userIsSchool = () => {
  const userDetails = getUserDetails();
  if (userDetails === undefined) {
    return false;
  }
  return userDetails.type === accountType.School;
};

export const getSchoolId = () => {
  const userDetails = getUserDetails();
  if (userDetails === undefined || userDetails.type !== accountType.School) {
    return -1;
  }
  return userDetails.schoolId;
} */

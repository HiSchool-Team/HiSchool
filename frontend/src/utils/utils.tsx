import history from "./history";
import {Location} from "history";

export const getSearchResult = (location: Location): string => {
  const qs = require('qs');
  const queryParams = qs.parse(location.search, {ignoreQueryPrefix: true});
  return queryParams.search;
};

export const goToNewUrl = (basePath: string,
                           searchParams: string[][] | Record<string, string> | string | URLSearchParams): void => {
  // https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
  history.push({
    pathname: basePath,
    search: `?${new URLSearchParams(searchParams)}`
  });
}

export const doNothing = () => {}

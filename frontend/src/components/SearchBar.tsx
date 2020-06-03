import React, { SyntheticEvent } from 'react';

import Search from 'antd/lib/input/Search';

const SearchContext = React.createContext('search');

type SearchState = {
    redirect: boolean,
    params: string,
};

// <Redirect to={{
//     pathname: "/",
//     search: `?${this.state.params}`
// }}/>
// this.setState({
//     params: new URLSearchParams({"search": value}).toString(),
//     redirect: true
// })
const SearchBar = (props: { handleSearch: (value: string,
                                           event?: SyntheticEvent) => void, }) => {
  return (
    <Search placeholder={'search by school name'}
      onSearch={props.handleSearch}
      enterButton/>
  );
};

export default SearchBar;

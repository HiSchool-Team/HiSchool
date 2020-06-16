import React, { SyntheticEvent } from 'react';

import Search from 'antd/lib/input/Search';

const SearchBar = (props: {
  handleSearch: (value: string, event?: SyntheticEvent) => void,
}) => {
  return (
    <Search placeholder={'search by school name'}
      onSearch={props.handleSearch}
      enterButton/>
  );
};

export default SearchBar;

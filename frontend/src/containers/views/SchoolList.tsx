import React, { useEffect, useState } from 'react';

import Schools from '../../components/Schools';
import { School } from '../../types';
import NewLayout from '../NewLayout';
import { useLocation } from 'react-router-dom';
import { getSearchResult } from '../../utils/utils';

const SchoolList = () => {
  const [schools, setSchools] = useState<School[]>();

  const location = useLocation();

  useEffect(() => {
    reloadResults(getSearchResult(location));
  }, []);

  const reloadResults = (value: string) => {
    console.log('data requested');

    const axios = require('axios');

    axios.get('/app/api/search/', {
      params: {
        search: value
      }
    }).then((resp: { data: School[], }) => {
      const newData = resp.data.map(school => (
        {
          ...school,
          img_src: `/static/media/${school.img_src}`
        })
      );
      console.log(newData);
      setSchools(newData);
    });
  };

  return (
    <NewLayout searchClick={reloadResults}>
      <Schools data={schools}/>
    </NewLayout>
  );
};

export default SchoolList;

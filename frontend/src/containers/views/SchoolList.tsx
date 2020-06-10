import React, {useEffect, useState} from 'react';

import Schools from '../../components/Schools';
import {School, Tag} from '../../types';
import NewLayout from '../NewLayout';
import {useLocation} from 'react-router-dom';
import {getSearchResult} from '../../utils/utils';

const SchoolList = () => {
  const [schools, setSchools] = useState<School[]>();
  const [displayedSchools, setDisplayedSchools] = useState<School[]>();
  const [tags, setTags] = useState<Tag[]>([]); // Set would be better but no custom equality for now
  const location = useLocation();

  useEffect(() => {
    reloadResults(getSearchResult(location));
  }, []);

  const reloadResults = (value: string): void => {
    console.log('data requested');

    const axios = require('axios');

    axios.get('/app/api/search/', {
      params: {
        search: value
      }
    }).then((resp: { data: { schools: School[], tags: Tag[] } }) => {
      const newSchoolData = resp.data.schools.map(school => (
        {
          ...school,
          tags: new Set<number>(school.tags),
          img_src: `/static/media/${school.img_src}`,
        })
      );
      console.log(newSchoolData);
      console.log(resp.data.tags);
      setSchools(newSchoolData);
      const uniqueTags: Tag[] = [];
      resp.data.tags.forEach(tag => {
        if (!containsTagWithId(tag.id, uniqueTags)) {
          uniqueTags.push(tag);
        }
      })
      setTags(uniqueTags);
      console.log(uniqueTags);
      setDisplayedSchools(newSchoolData);
    });
  };

  const containsTagWithId = (id: number, tags: Tag[]): boolean => {
    for (const tag of tags) {
      if (tag.id === id) {
        return true;
      }
    }
    return false;
  }

  const changeDisplay = (selectedTags: number[]): void => {
    const newlySelectedSchools = schools?.filter(school =>
      selectedTags.map(tag => school.tags.has(tag)).reduce((a, b) => a && b, true)
    );
    setDisplayedSchools(newlySelectedSchools);
  }

  return (
    <NewLayout updateDisplayedSchool={changeDisplay} tags={tags} searchClick={reloadResults}>
      <Schools data={displayedSchools}/>
    </NewLayout>
  );
};

export default SchoolList;

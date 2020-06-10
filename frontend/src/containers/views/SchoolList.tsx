import React, {useEffect, useState} from 'react';

import Schools from '../../components/Schools';
import {School, Tag} from '../../types';
import NewLayout from '../NewLayout';
import {useLocation} from 'react-router-dom';
import {getSearchResult} from '../../utils/utils';

const SchoolList = () => {
  const [schools, setSchools] = useState<School[]>();
  const [displayedSchools, setDisplayedSchools] = useState<School[]>();
  const [tags, setTags] = useState<Set<Tag>>(new Set());

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
          img_src: `/static/media/${school.img_src}`
        })
      );
      console.log(newSchoolData);
      console.log(resp.data.tags);
      setSchools(newSchoolData);
      setTags(new Set(resp.data.tags));
      setDisplayedSchools(newSchoolData);
    });
  };

  const findTagById = (id: number): Tag => {
    tags.forEach(tag => {
      if (tag.id === id) {
        return tag;
      }
    })
    alert("Tag has not been found");
    return tags.values().next().value;
  }

  const changeDisplay = (selectedTags: number[]): void => {
    const newlySelectedSchools = schools?.filter(school => {
      return selectedTags.map(tagId => school.tags.has(findTagById(tagId)))
        .reduce((a, b) => a && b, true);
    })
    setDisplayedSchools(newlySelectedSchools);
  }

  return (
    <NewLayout updateDisplayedSchool={changeDisplay} tags={Array.from(tags)} searchClick={reloadResults}>
      <Schools data={displayedSchools}/>
    </NewLayout>
  );
};

export default SchoolList;

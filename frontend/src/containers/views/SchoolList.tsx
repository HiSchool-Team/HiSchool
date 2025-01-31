import React, {useEffect, useState} from 'react';

import Schools from '../../components/Schools';
import {School, Tag} from '../../types';
import NewLayout from '../NewLayout';
import {useLocation} from 'react-router-dom';
import {getSearchResult} from '../../utils/utils';

import axios, {AxiosResponse} from 'axios';
import {calculatePreferences} from "../../logic/Search";

interface ServerData {
  schools: School[],
  tags: Tag[],
}

export const schoolListBasePath = '/schools/';
export const serverSearchEndpoint = '/app/api/search/';

const SchoolList = () => {
  const [schools, setSchools] = useState<School[]>();
  const [displayedSchools, setDisplayedSchools] = useState<School[]>();
  const [tags, setTags] = useState<Tag[]>([]); // Set would be better but no custom equality for now
  const location = useLocation();

  useEffect(() => {
    getSchoolData(getSearchResult(location));
  }, []);

  const getSchoolData = (query: Record<string, string>): void => {
    console.log('data requested');
    console.log(query);

    function alterReceivedData (schools: School[]) {
      return schools.map(school => (
        {
          ...school,
          tags: Array.from(new Set<number>(school.tags))
        })
      );
    }

    function getUniqueTags (tags: Tag[]) {
      const uniqueTags: Tag[] = [];
      tags.forEach(tag => {
        if (!containsTagWithId(tag.id, uniqueTags)) {
          uniqueTags.push(tag);
        }
      });
      return uniqueTags;
    }

    axios.get<ServerData>(serverSearchEndpoint, {
      params: { ...query }
    }).then((resp: AxiosResponse<ServerData>) => {
      const newSchoolData = alterReceivedData(resp.data.schools);
      console.log(newSchoolData);
      console.log(resp.data.tags);
      const searchQuery = query.search ? query.search : '';
      const sortedSchools: School[] = calculatePreferences(searchQuery, newSchoolData)
                                        .map(([a,b]) => a)

      setSchools(sortedSchools);
      setDisplayedSchools(sortedSchools);
      const uniqueTags = getUniqueTags(resp.data.tags);
      setTags(uniqueTags);
      console.log(uniqueTags);
    });
  };

  const containsTagWithId = (id: number, tags: Tag[]): boolean => {
    for (const tag of tags) {
      if (tag.id === id) {
        return true;
      }
    }
    return false;
  };

  const changeDisplay = (selectedTags: number[]): void => {
    const newlySelectedSchools = schools?.filter(school =>
      selectedTags.map(tag => school.tags.includes(tag)).reduce((a, b) => a && b, true)
    );
    setDisplayedSchools(newlySelectedSchools);
  };

  return (
    <NewLayout updateDisplayedSchool={changeDisplay} tags={tags}
      searchClick={(value) => getSchoolData({ search: value })}>
      <Schools data={displayedSchools}/>
    </NewLayout>
  );
};

export default SchoolList;

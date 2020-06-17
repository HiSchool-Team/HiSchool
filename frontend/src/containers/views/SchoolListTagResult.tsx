import React, {useEffect, useState} from "react";
import NewLayout from "../NewLayout";
import Schools from "../../components/Schools";
import { useLocation } from 'react-router-dom';
import {PrioritizedTag, School, Tag} from "../../types";
import schoolAPI from "../../api/School";

// TODO
const SchoolListTagResult = () => {
  const [schools, setSchools] = useState<School[]>();
  const [displayedSchools, setDisplayedSchools] = useState<School[]>();
  const [tags, setTags] = useState<Tag[]>([]); // Set would be better but no custom equality for now
  const location = useLocation();

  useEffect(() => {
    console.log("in shool tag result");
    console.log(location.state);
    const prioritizedTags: PrioritizedTag[] = location.state as PrioritizedTag[];
    console.log(prioritizedTags);

    schoolAPI.findMatchesBy(prioritizedTags)
      .then((schoolsRecieved) => {
        console.log(schoolsRecieved);
        setSchools(schoolsRecieved);
        setDisplayedSchools(schoolsRecieved);
      });
  }, []);

  const changeDisplay = (selectedTags: number[]): void => {
    const newlySelectedSchools = schools?.filter(school =>
      selectedTags.map(tag => school.tags.includes(tag)).reduce((a, b) => a && b, true)
    );
    setDisplayedSchools(newlySelectedSchools);
  };

  return (
    <NewLayout updateDisplayedSchool={changeDisplay} tags={tags}>
      <Schools data={displayedSchools}/>
    </NewLayout>
  );
}

export default SchoolListTagResult;

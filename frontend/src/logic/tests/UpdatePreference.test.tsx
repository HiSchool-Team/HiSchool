import React from "react";
import {computeElementRelevance, Searchable, calculatePreferences} from "../Search";


test('calculatePreferences updates returns element preference with each element', () => {
  const comparedWith: string = "mike";

  const arr: Searchable[] = [
    {
      name: "hello",
    },
    {
      name: "time",
    }
  ];

  const updatedPreferences: [Searchable, number][] = calculatePreferences(comparedWith, arr);

  for (let i = 0; i < updatedPreferences.length; i++) {
    expect([arr[i], computeElementRelevance(comparedWith, arr[i])]).toStrictEqual(updatedPreferences[i]);
  }
});

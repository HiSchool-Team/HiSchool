import React from "react";
import {computeElementRelevance, Searchable, calculatePreferences} from "../Search";

const comparedWith: string = "mike";

const arr: Searchable[] = [
  {
    name: "hello",
  },
  {
    name: "time",
  },
  {
    name: "mike",
  }
];

test('calculatePreferences contains every inputted element with its preference', () => {
  const updatedPreferences: [Searchable, number][] = calculatePreferences(comparedWith, arr);

  for (let i = 0; i < updatedPreferences.length; i++) {
    const [exObj, exNumber]: [Searchable, number] = [arr[i], computeElementRelevance(comparedWith, arr[i])];

    expect(updatedPreferences.some(([obj, val]) => {
      return exObj.name === obj.name && val === exNumber;
    })).toBe(true);
  }
});

test('calculatePreferences returns elements sorted by preferences ascending', () => {
  const updatedPreferences: [Searchable, number][] = calculatePreferences(comparedWith, arr);

  for (let i = 1; i < updatedPreferences.length; i++) {
    const [elem1, value1]: [Searchable, number] = updatedPreferences[i - 1];
    const [elem2, value2]: [Searchable, number] = updatedPreferences[i];
    expect(value1 <= value2).toBe(true);
  }
})

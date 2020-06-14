import React from "react";

export interface Searchable {
  name: string,
}


// returns searchable calculated and sorted descending by second argument
export const calculatePreferences = <T extends Searchable>(comparedWith: string, arr: T[]): [T, number][] => {
  const tagsPrefs: [T, number][] = arr.map(elem => {
    return [elem, computeElementRelevance(comparedWith, elem)]
  });
  tagsPrefs.sort(([t1, v1], [t2, v2]) => {
    return v1 - v2;
  })
  return tagsPrefs;
}

// computes element relevance using levenshtein distance algorithm
export const computeElementRelevance = <T extends Searchable>(currInput: string, element: T): number => {
  let dp: number[][] = initArray(currInput.length + 1, element.name.length + 1, -1);

  return levenshteinDistance(currInput, element, dp, currInput.length, element.name.length);
}

const levenshteinDistance = <T extends Searchable>(currInput: string, element: T, dp: number[][], i: number, j: number): number => {
  if (dp[i][j] !== -1) {
    return dp[i][j];
  }
  if (i === 0) {
    return j;
  }
  if (j === 0) {
    return i;
  }
  const diff = currInput[i - 1] !== element.name[j - 1] ? 1 : 0;

  dp[i][j] = Math.min(...([
    levenshteinDistance(currInput, element, dp, i - 1, j - 1) + diff,
    levenshteinDistance(currInput, element, dp, i - 1, j) + 1,
    levenshteinDistance(currInput, element, dp, i, j - 1) + 1]));
  return dp[i][j];
}

const initArray = (rows: number, cols: number, value: number): number[][] => {
  let arr: number[][] = [];
  for (let i = 0; i < rows; i++) {
    let rowArr = [];
    for (let j = 0; j < cols; j++) {
      rowArr.push(value);
    }
    arr.push(rowArr);
  }

  return arr;
}

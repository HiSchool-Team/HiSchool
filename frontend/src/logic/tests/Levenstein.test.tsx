import React from "react";
import {computeElementRelevance, Searchable} from "../Search";

test('same strings have distance 0', () => {
  const expectedString = "string";
  const givenObject: Searchable = {name: "string"};
  expect(computeElementRelevance(expectedString, givenObject)).toBe(0);
});

test('element relevance is symmetric', () => {
  let expectedString = "kitten";
  let givenObject: Searchable = {name: "sitting"};
  const val1 = computeElementRelevance(expectedString, givenObject);

  expectedString = "sitting";
  givenObject = {name: "kitten"};
  const val2 = computeElementRelevance(expectedString, givenObject);
  expect(val1).toBe(val2);
});

test('rossettacode and raisehtysword have distance 8', () => {
  let expectedString = "rossettacode";
  let givenObject: Searchable = {name: "raisehtysword"};
  expect(computeElementRelevance(expectedString, givenObject)).toBe(8);
});

test('rosseta and Rosseta have distance 0', () => {
  let expectedString = "rosseta";
  let givenObject: Searchable = {name: "Rosseta"};
  expect(computeElementRelevance(expectedString, givenObject)).toBe(0);
})

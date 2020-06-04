export type Rating = {
  value: number,
  numRaters: number,
};

export type QA = {
  id: number,
  question: Question,
  answer?: Answer,
};

export type Question = {
  title: string,
  body: string,
};

export type Answer = {
  body: string,
  rating: number, // FIXME substitute for Rating
  author: string,
};

export type School = {
  id: number,
  name: string,
  description: string,
  imgSrc: string,
};

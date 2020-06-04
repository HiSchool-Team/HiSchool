export type Rating = {
  value: number,
  numRaters: number,
};

export type QA = {
  question: Question,
  answer?: Answer,
};

export type Answer = {
  body: string,
  rating: number, // FIXME substitute for Rating
  author?: string,
};

export type Question = {
  id: number,
  title: string,
  body: string,
  answer?: Answer,
};

export type School = {
  id: number,
  name: string,
  description: string,
  imgSrc: string,
};

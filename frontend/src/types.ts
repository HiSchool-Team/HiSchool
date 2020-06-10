export type Rating = {
  value: number,
  numRaters: number,
};

export type QA = {
  id: number,
  recipient_school_id: number,
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
  student_satisfaction: number,
  parent_satisfaction: number,
  img_src: string,
  tags: Set<number>,
};

export type Tag = {
  id: number,
  name: string,
  type: string,
};

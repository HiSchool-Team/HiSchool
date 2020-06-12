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
  created_at?: string,
};

export type Answer = {
  body: string,
  rating: number, // FIXME substitute for Rating
  author: string,
  created_at?: string,
};

export type School = {
  id: number,
  name: string,
  description: string,
  motto?: string,
  student_satisfaction: number,
  img_src?: string,
  img_link?: string,
  tags: number[],
  website?: string,
  facebook?: string,
  twitter?: string,
  video?: string,
  calendar?: string,
  map?: string,
  parent_satisfaction: number,
};

export type Tag = {
  id: number,
  name: string,
  type: string,
  sub_type: string,
};

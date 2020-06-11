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
  motto?: string,
  student_satisfaction: number,
  img_src?: string,
  img_link?: string,
  tags: Set<number>,
  website_link?: string,
  facebook_link?: string,
  twitter_link?: string,
  video_link?: string,
  calendar_link?: string,
  map_link?: URL,
  parent_satisfaction: number,
};

export type Tag = {
  id: number,
  name: string,
  type: string,
};

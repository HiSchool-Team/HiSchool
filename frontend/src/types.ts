import {Searchable} from "./logic/Search";

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

export interface Tag extends Searchable {
  id: number,
  name: string,
  type: string,
  sub_type: string,
}

export type PrioritizedTag = {
  school_id?: number,
  tag_id: number,
  priority: number,
};

export type User = {
  id: number,
  username: string,
  is_school: boolean,
  school?: School,
  is_user: boolean, // This means is_applicant but since the database model is hard to change we have left it as is_user
};

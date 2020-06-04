export type Rating = {
  value: number,
  num_raters: number,
};

export type Answer = {
  id: number,
  body: string,
  rating: Rating,
  teacher_name?: string,
  being_edited: boolean,
}

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
  student_satisfaction: number,
  parent_satisfaction: number,
  img_src: string
};

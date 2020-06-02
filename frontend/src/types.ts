export interface Answer {
    id: number;
    body: string;
    avg_rating: number;
    teacher_name?: string;
}

export interface Question {
    id: number;
    title: string;
    body: string;
    answer?: Answer;
}

export interface School {
    id: number;
    name: string,
    description: string
    img_src: string
}
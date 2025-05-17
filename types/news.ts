export type News = {
  id: string;
  type: 'news';
  attributes: {
    title: string;
    content: string;
    date: string;
  };
};

export type NewsResponse = {
  data: News[];
};

export type SingleNewsResponse = {
  data: News;
};

export type CreateNewsPayload = {
  title: string;
  content: string;
  date: string;
};

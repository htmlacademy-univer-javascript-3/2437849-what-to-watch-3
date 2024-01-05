export type Review = {
  id: string;
  filmId: string;
  rating: number;
  author: string;
  date: Date;
  text: string;
};

export const Reviews: Review[] = [
  {
    id: '1',
    filmId: '0',
    rating: 8.1,
    author: 'Someone',
    date: new Date('01.08.2014'),
    text: 'Something'
  },
  {
    id: '2',
    filmId: '0',
    rating: 8.2,
    author: 'Someone',
    date: new Date('02.08.2014'),
    text: 'Something'
  },
  {
    id: '3',
    filmId: '0',
    rating: 8.3,
    author: 'Someone',
    date: new Date('03.08.2014'),
    text: 'Something'
  },
  {
    id: '4',
    filmId: '0',
    rating: 8.4,
    author: 'Someone',
    date: new Date('04.08.2014'),
    text: 'Something'
  },
  {
    id: '5',
    filmId: '0',
    rating: 8.5,
    author: 'Someone',
    date: new Date('05.08.2014'),
    text: 'Something'
  }
];

export type Detail = {
  filmId: string;
  director: string;
  actors: string;
  duration: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  genre: string;
  year: Date;
}

export const Details: Detail[] = [
  {
    filmId: '0',
    director: 'Wes Anderson',
    actors: 'Bill Murray, \n Edward Norton, \n Jude Law, \n Willem Dafoe, \n Saoirse Ronan, \n Tony Revoloru, \n Tilda Swinton, \n Tom Wilkinson, \n Owen Wilkinson, \n Adrien Brody, \n Ralph Fiennes, \n Jeff Goldblum',
    duration: {
      hours: 1,
      minutes: 39,
      seconds: 55
    },
    genre: 'Drama',
    year:  new Date('02.06.2014'),
  },
  {
    filmId: '1',
    director: 'Someone',
    actors: 'Some people',
    duration: {
      hours: 1,
      minutes: 1,
      seconds: 1,
    },
    genre: 'Something',
    year: new Date('2001'),
  },
  {
    filmId: '2',
    director: 'Someone',
    actors: 'Some people',
    duration: {
      hours: 2,
      minutes: 2,
      seconds: 2,
    },
    genre: 'Something',
    year: new Date('2002'),
  },
  {
    filmId: '3',
    director: 'Someone',
    actors: 'Some people',
    duration: {
      hours: 3,
      minutes: 3,
      seconds: 3,
    },
    genre: 'Something',
    year: new Date('2003'),
  },
  {
    filmId: '4',
    director: 'Someone',
    actors: 'Some people',
    duration: {
      hours: 4,
      minutes: 4,
      seconds: 4,
    },
    genre: 'Something',
    year: new Date('2004'),
  },
  {
    filmId: '5',
    director: 'Someone',
    actors: 'Some people',
    duration: {
      hours: 5,
      minutes: 5,
      seconds: 5,
    },
    genre: 'Something',
    year: new Date('2005'),
  },
  {
    filmId: '6',
    director: 'Someone',
    actors: 'Some people',
    duration: {
      hours: 6,
      minutes: 6,
      seconds: 6,
    },
    genre: 'Something',
    year: new Date('2006'),
  },
  {
    filmId: '7',
    director: 'Someone',
    actors: 'Some people',
    duration: {
      hours: 7,
      minutes: 7,
      seconds: 7,
    },
    genre: 'Something',
    year: new Date('2007'),
  },
  {
    filmId: '8',
    director: 'Someone',
    actors: 'Some people',
    duration: {
      hours: 8,
      minutes: 8,
      seconds: 8,
    },
    genre: 'Something',
    year: new Date('2008'),
  }
];

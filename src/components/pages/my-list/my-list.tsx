import {useAppSelector} from '../../../store/hooks/use-app-selector';
import {getFavorites} from '../../../store/reducers-selectors';

import {Header} from '../../header/header';
import {Footer} from '../../footer/footer';
import {FilmList} from '../../film-list/film-list';

export function MyList() {
  const favoriteFilms = useAppSelector(getFavorites);

  return (
    <div className="user-page">
      <Header headerClass={'user-page__head'}>
        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">{favoriteFilms.length}</span>
        </h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={favoriteFilms}/>
      </section>

      <Footer/>
    </div>
  );
}

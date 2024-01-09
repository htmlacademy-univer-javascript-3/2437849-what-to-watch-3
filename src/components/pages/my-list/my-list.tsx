import {useAppSelector} from '../../../store/hooks/use-app-selector';
import {getFavorites} from '../../../store/reducers-selectors';

import {Header} from '../../header/header';
import {Footer} from '../../footer/footer';
import {FilmList} from '../../film-list/film-list';

export function MyList(){
  const favoriteFilms = useAppSelector(getFavorites);

  return (
    <div className="user-page">
      <Header/>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={favoriteFilms}/>
      </section>

      <Footer/>
    </div>
  );
}

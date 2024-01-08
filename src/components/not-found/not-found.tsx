import {Link} from 'react-router-dom';

import {AppRoute} from '../../types/app-routes';

export function NotFound() {
  return (
    <div>
      <h1>404 Page Not Found</h1>

      <Link to={AppRoute.Main}>
        <h2>To main page</h2>
      </Link>
    </div>
  );
}

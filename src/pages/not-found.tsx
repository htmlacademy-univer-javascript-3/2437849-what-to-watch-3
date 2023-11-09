import {Link} from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <h1>404 Page not Not Found</h1>
      <Link to={'/'}>
        <h2>На главную</h2>
      </Link>
    </div>
  );
}

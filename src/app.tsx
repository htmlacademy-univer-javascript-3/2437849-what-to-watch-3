import {Main, MainProps} from './pages/main';

type AppProps = {
  mainParams: MainProps;
}

export function App({mainParams}: AppProps) {
  return (
    <Main {...mainParams} />
  );
}

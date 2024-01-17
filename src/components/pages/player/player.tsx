import {ChangeEvent, MouseEventHandler, MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {useAppSelector} from '../../../store/hooks/use-app-selector';
import {useAppDispatch} from '../../../store/hooks/use-app-dispatch';
import {fetchFilm} from '../../../store/api-actions';
import {getFilm, getLoadingStatus} from '../../../store/reducers-selectors';

import {Loader} from '../../loader/loader';
import {PlayIcon} from '../../play-icon/play-icon';
import {PauseIcon} from '../../pause-icon/pause-icon';
import {NotFound} from '../../not-found/not-found';

export function Player() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [viewedTime, setViewedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const onStart = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const onPause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const timeUpdate = useCallback((event: ChangeEvent<HTMLVideoElement>) => {
    setViewedTime(event.target.currentTime);
  }, []);

  const isLoading = useAppSelector(getLoadingStatus);
  const currentFilm = useAppSelector(getFilm);

  const dispatch = useAppDispatch();

  const screenRef = useRef() as MutableRefObject<HTMLDivElement>;
  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (<Loader/>);
  }

  if (!currentFilm || !id) {
    return (<NotFound/>);
  }

  function getLeftTime() {
    if (!currentFilm) {
      return '00:00:00';
    }

    const timeLeft = currentFilm.runTime * 60 - viewedTime;
    const seconds = Math.floor((timeLeft % 60)).toString().padStart(2, '0');
    const minutes = Math.floor((timeLeft / 60) % 60).toString().padStart(2, '0');
    const hours = Math.floor(timeLeft / 3600).toString().padStart(2, '0');

    return (hours !== '00')
      ? `-${hours}:${minutes}:${seconds}`
      : `-${minutes}:${seconds}`;
  }

  const handlePlayingControlClick = () => {
    if (!videoRef || !videoRef.current) {
      return;
    }

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const handleTogglingFullscreenClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (!document.fullscreenElement) {
      if (!screenRef || !screenRef.current) {
        return;
      }

      screenRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const filmPlayedPercent = 100 * (viewedTime / (currentFilm.runTime * 60));

  return (
    <div className="player" ref={screenRef}>
      <video src={currentFilm.videoLink} className="player__video" poster={currentFilm.previewImage} onPlay={onStart}
        onPause={onPause} onTimeUpdate={timeUpdate} ref={videoRef}
      />

      <button type="button" className="player__exit" onClick={() => navigate(-1)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={filmPlayedPercent} max={100}/>

            <div className="player__toggler" style={{left: `${filmPlayedPercent}%`}}>Toggler</div>
          </div>

          <div className="player__time-value">{getLeftTime()}</div>
        </div>

        <div className="player__controls-row" onClick={handlePlayingControlClick}>
          <button type="button" className="player__play">
            {!isPlaying
              ? <PlayIcon/>
              : <PauseIcon/>}
          </button>

          <div className="player__name">{currentFilm.name}</div>

          <button type="button" className="player__full-screen" onClick={handleTogglingFullscreenClick}>
            <svg viewBox="0 0 27 27" width={27} height={27}><use xlinkHref="#full-screen"/></svg>

            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

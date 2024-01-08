import {useState} from 'react';

import {DetailsTab} from './details-tab';
import {OverviewTab} from './overview-tab';

import {ReviewsTab} from './review-tab';
import {NotFound} from '../not-found/not-found';

import {Film} from '../../types/film';
import {Review} from '../../types/review';

enum TabType {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

type TabsProps ={
  film: Film;
  reviews: Array<Review>;
}

export function Tabs({film, reviews}: TabsProps) {
  const [currentTab, setCurrentTab] = useState(TabType.Overview);

  const showTab = (type: TabType) => {
    switch (type) {
      case TabType.Details:
        return <DetailsTab film={film}/>;

      case TabType.Overview:
        return <OverviewTab film={film}/>;

      case TabType.Reviews:
        return <ReviewsTab reviews={reviews}/>;

      default:
        return <NotFound/>;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item'${currentTab === TabType.Overview ? ' film-nav__item--active' : ''}`}>
            <button onClick={() => setCurrentTab(TabType.Overview)} className="film-nav__link">Overview</button>
          </li>

          <li className={`film-nav__item'${currentTab === TabType.Details ? ' film-nav__item--active' : ''}`}>
            <button onClick={() => setCurrentTab(TabType.Details)} className="film-nav__link">Details</button>
          </li>

          <li className={`film-nav__item'${currentTab === TabType.Reviews ? ' film-nav__item--active' : ''}`}>
            <button onClick={() => setCurrentTab(TabType.Reviews)} className="film-nav__link">Reviews</button>
          </li>
        </ul>
      </nav>

      {showTab(currentTab)}
    </div>
  );
}

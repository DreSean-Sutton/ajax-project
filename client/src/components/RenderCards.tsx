/* eslint-disable no-restricted-globals */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hook';
import { selectFighterArray } from '../features/fighters/fightersArraySlice';
import { selectFavorites, addFavorites, deleteFavorites } from '../features/favorites/favoritingSlice';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import './RenderCards.css';

interface EventProps {
  target?: any,
  matches?: any
}

export default function RenderCards() {

  const fighterArray: any = useAppSelector(selectFighterArray);
  const favorites: any = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleShowDetails(event: EventProps) {
    if (event.target.matches('.fa-heart')) return;
    const characterCard = event.target.closest('#character-card').dataset;
    navigate(`/character-details/${characterCard.cardName}`);
  }

  function handleFavoriting(event: EventProps): void {
    const heart = event.target;
    const currentFighter = heart.closest('#character-card').dataset.cardName;
    console.log({currentFighter}, {fighterArray})
    fighterArray.fighterData.hasOwnProperty(currentFighter)
      ? dispatch(deleteFavorites(fighterArray.fighterData[currentFighter]))
      : dispatch(addFavorites(currentFighter));
  }

  function handleHearts(fighter: string): string {
    return favorites.fighterData.hasOwnProperty(fighter)
      ? 'card-heart-favorited'
      : '';
  }

  function noOneDigitNums(num: number) {
    return num < 10
      ? `0${num}`
      : num;
  }

  function homeOrFavorites() {
    const favRegex = new RegExp('favorites', 'g');
    if(favRegex.test(location.href)) {
      return favorites.fighterData;
    } else {
      return fighterArray.fighterData;
    }
  }
  const objValues = Object.values(homeOrFavorites())
  console.log({objValues});
  const allCards = objValues.map((card: any) => {
    return (
      <React.Fragment key={card.fighterId}>
        <Row className='card-column w-auto'>
          <div data-testid={card.fighter} onClick={handleShowDetails} className='row character-card p-0' data-card-fighter-id={card.fighterId} data-card-name={card.fighter} data-card-roster-id={card.rosterId} data-card-display-name={card.displayName} id='character-card'>
            <div>
              <img className='character-card-img' src={`./images/smash-ultimate-sprites/${card.fighter}.png`} alt={card.displayName} />
              <span className='character-card-number'>{noOneDigitNums(card.fighterId)}</span>
              <i data-testid={`${card.fighter}-heart`} onClick={handleFavoriting} className={`fa-solid fa-heart card-heart ${handleHearts(card.fighter)}`}></i>
              <h3 className='character-card-name'>{card.displayName}</h3>
            </div>
          </div>
        </Row>
      </React.Fragment>
    );
  });
  return (
    <Container fluid={'lg'} className="row content-layout" data-view='character-list'>
      { allCards }
    </Container>
  );
}

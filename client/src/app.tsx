/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Home from './pages/home';
import FighterDetails from './pages/fighter-details';
import FavoritesList from './pages/favorites';
import Navbar from './components/navbar';
import BackgroundCarousel from './components/background-carousel';
import Loading from './components/loading';
import axios from 'axios';

export default function App() {
  // refactor usage of focusFighter
  // refactor requirement for fighterArray to rerender when location changes
  const [focusedFighter, setFocusedFighter]: any[] = useState({});
  const [fighterArray, setfighterArray]: any[] = useState([]);
  const [favorites, setFavorites]: any[] = useState([]);
  const [loading, setIsLoading]: any[] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const favoriteItem: string | null = localStorage.getItem('favorites');
    if (favoriteItem) {
      setFavorites(JSON.parse(favoriteItem));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if(fighterArray.length === 0) {
      if(location.pathname === '/' ||
      location.pathname === '/favorites') {
        fetchFighters();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])


  async function fetchFighters() {
    setIsLoading(true);
    try {
      const res = await axios.get('https://the-ultimate-api.herokuapp.com/api/fighters')
      if (res.status === 200) {
        setfighterArray(res.data);
      } else {
        throw Error(res.statusText);
      }
    } catch (e) {
      console.error('Fetch failed!', e);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCurrentFighter(obj: any) {
    if (obj === null) {
      setFocusedFighter({});
      return;
    }
    setFocusedFighter(obj);
  }

  function handleAddFavorites(fav: object | undefined) {
    const newFavorites: any[] = [...favorites, fav]
    setFavorites(newFavorites.sort((a: any, b: any) => (a.fighterId > b.fighterId) ? 1 : -1));
  }
  function handleDeleteFavorites(id: number): void {
    interface Fav {
      fighterId: number
    }
    if (favorites.length === 1) {
      setFavorites([]);
    }
    function filterFav(fav: Fav): number | undefined {
      if (fav.fighterId !== id) {
        return fav.fighterId
      }
    }
    setFavorites(favorites.filter(filterFav));
  }
  // console.log({currentFighter});
  // console.log({location});
  if(loading) {
    return (
      <Loading />
    );
  }
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <BackgroundCarousel />
        <Routes>
          <Route path="/" element={
            <Home
              addFocusedFighter={handleCurrentFighter}
              focusedFighter = {focusedFighter}
              fighterArray = {fighterArray}
              favorites = {favorites}
              addFavorites = {handleAddFavorites}
              deleteFavorites = {handleDeleteFavorites}
            />} />
          <Route path="/favorites" element={
            <FavoritesList
              addFocusedFighter = {handleCurrentFighter}
              focusedFighter = {focusedFighter}
              fighterArray = {fighterArray}
              favorites = {favorites}
              addFavorites = {handleAddFavorites}
              deleteFavorites = {handleDeleteFavorites}
            />} />
          <Route path='/character-details'>
            <Route path={':fighter'} element={
              <FighterDetails />
            } />
          </Route>
        </Routes>
      </main>
    </>
  );
}

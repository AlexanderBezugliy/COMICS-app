import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CharactersList from "./components/charactersList/CharactersList"
import Header from "./components/header/Header"
import ProductsList from "./components/comicsList/ComicsList"
import Favorite from './components/favorite/Favorite';
import Home from './components/home/home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './components/home/style.css';


function App() {
  const { favoriteItems } = useSelector((state) => state.favorite);

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }, [favoriteItems]);


  return (
    <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharactersList />} />
          <Route path="/comics" element={<ProductsList />} />
          <Route path='/favorite' element={<Favorite />} />

          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>  
    </BrowserRouter >
  )
}

export default App;

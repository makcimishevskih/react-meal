import './app.scss';

import { Suspense } from "react";

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Preloader from "../Components/Preloader";
import SearchPanel from "../Components/SearchPanel";

import {
  About,CategoryId,
  Category,
  CategoryName,Contacts,PageNotFound,
  Search,Favorite
} from '../pages';

// Rename components
// Картинки из нью имэдж
// кеширование

function App () {

  return (
    <Router>
      <Header />
      <SearchPanel />
      <div className="content container">
        <Suspense fallback={<Preloader />}>
          <Routes>

            <Route path="/" element={<Category />} />

            <Route path="category/:name" element={<CategoryName />} />
            <Route path="category/:name/:itemId" element={<CategoryId />} />

            <Route path="search" element={<Search />} />

            <Route path="favorite" element={<Favorite />} />

            <Route path="about" element={<About />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="*" element={<PageNotFound />} />

          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

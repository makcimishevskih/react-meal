import './app.scss';

import { Suspense } from "react";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import Header from '@components/header';
import Footer from "@components/footer";
import Preloader from "@components/preloader";
import SearchPanel from "@components/search-panel";

import {
  About,
  CategoryId,
  Category,
  CategoryName,
  Randomizer,
  PageNotFound,
  Search,
  Favorite
} from '../../pages';

// Rename components

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
            <Route path="randomizer" element={<Randomizer />} />
            <Route path="*" element={<PageNotFound />} />

          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

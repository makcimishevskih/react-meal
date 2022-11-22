import './FavoriteMeals.scss';
import { motion,AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useEffect,useRef,useState } from "react";
import { useAppSelector } from "@store/store";
import useFavoriteWithNav from "@hooks/useFavoriteWithNav";
import { addFavoriteMeal,deleteFavoriteMeal } from "@actionCreators/bindActionCreators";

import Preloader from "../preloader";
import MyLazyImage from "../my-lazy-Image";

const FavoriteMeals = () => {
  const { favoriteMeals,loader,error } = useAppSelector(state => state.mealReducer);

  const isPreloader = loader && !error ? <Preloader /> : null;
  const isError = !loader && error ? <div>Error</div> : null;

  console.log(favoriteMeals,favoriteMeals.length);

  return (
    <div className="row">
      {isPreloader}
      {isError}

      {
        !!favoriteMeals.length && !loader && !error ?
          <>
            <h4>Favorite meals</h4>
            <div>Click to image to get the instruction</div>
            {
              favoriteMeals.map((el,i) => (
                <View
                  favoriteMeals={favoriteMeals}
                  key={el.id}
                  {...el} />
              ))
            }
          </>
          :
          <motion.div className="col s12 m12 l12 not-found"
            initial={{ opacity: 0,y: 500 }}
            animate={{ opacity: 1,y: 0 }}
          >
            DON'T HAVE ANY FAVORITE MEALS
          </motion.div>
      }
    </div >
  );
}

const View = ({ id,name,category,image,instruction }) => {
  const { isVisible,handleClickRemove } = useFavoriteWithNav();

  return (
    <AnimatePresence>
      {isVisible &&
        <motion.div className="col s12 m12 l12"
          initial={{ opacity: 0,x: 300 }}
          animate={{ opacity: 1,x: 0 }}
          exit={{ opacity: 0,x: -800 }}
        >
          <div
            className="card">
            <Link to={`/category/${category}/${id}`}>
              <motion.div
                whileHover={{ opacity: 0.8 }}
                className="card-image">
                <MyLazyImage
                  image={image}
                  alt={category}
                />
                <span className="card-title card-title_black">{category}</span>
              </motion.div>
            </Link>
            <div onClick={handleClickRemove(id,true)} className="star-wrapper">
              <i className={"fa-solid fa-star star added"}></i>
              <span>Delete</span>
            </div>
            <div className="card-content">
              {name}
            </div>
            <Link className="router-link" to={`/category/${category}`}>Watch category</Link>
          </div>
        </motion.div >
      }
    </AnimatePresence >
  );
}


export default FavoriteMeals;

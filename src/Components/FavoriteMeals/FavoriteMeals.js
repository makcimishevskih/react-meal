import './favoriteMeals.scss';
import { motion,AnimatePresence } from 'framer-motion';

import { useState } from "react";
import { Link } from 'react-router-dom';
import { addFavoriteMeal,deleteFavoriteMeal } from "../../actionCreators/bindActionCreators";
import { useAppSelector } from "../../store/store";

import Preloader from "../Preloader";
import MyLazyImage from "../LazyImage/MyLazyImage";
import useFavoriteWithNav from "../../hooks/useFavoriteWithNav";

const FavoriteMeals = () => {
  const { favoriteMeals,loader,error } = useAppSelector(state => state.mealReducer);

  const isPreloader = loader && !error ? <Preloader /> : null;
  const isError = !loader && error ? <div>Error</div> : null;

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

  const [isVisible,setIsVisible] = useState(true);

  const handleClickRemove = (id) => {
    setIsVisible(!isVisible);
    setTimeout(() => {
      deleteFavoriteMeal(id);
    },1000)
  };

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
            <div onClick={() => handleClickRemove(id)} className="star-wrapper">
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

import './favoriteMeals.scss';
import { motion,AnimatePresence } from 'framer-motion';

import { useState } from "react";
import { Link } from 'react-router-dom';
import { addFavoriteMeal,deleteFavoriteMeal } from "../../actionCreators/bindActionCreators";
import { useAppSelector } from "../../store/store";

import Preloader from "../Preloader";
import MyLazyImage from "../LazyImage/MyLazyImage";
import useFavoriteWithNav from "../../hooks/useFavoriteWithNav";
import { CSSTransition } from "react-transition-group";

const FavoriteMeals = () => {
  const { favoriteMeals,loader,error } = useAppSelector(state => state.mealReducer);

  return (
    <div className="row">
      {loader && !error ? <Preloader /> : null}
      {!loader && error ? <div>Error</div> : null}

      {
        favoriteMeals.length && !loader && !error ?
          favoriteMeals.map((el,i) => (
            <View
              favoriteMeals={favoriteMeals}
              key={el.id}
              {...el} />
          ))
          : <div>DONT HAVE ANY MEALS CATEGORY</div>
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
              <div className="card-image">
                <MyLazyImage
                  height={800}
                  image={image}
                  alt={category}
                />
                <span className="card-title card-title_black">{category}</span>
              </div>
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

import './randomItem.scss';

import { useEffect,useState } from "react";

import useFetch from "../../hooks/useFetch";
import useFavoriteWithNav from "../../hooks/useFavoriteWithNav";
import { useAppSelector } from "../../store/store";

import { getRandomMealAC } from "../../actionCreators/bindActionCreators";

import Preloader from "../../Components/Preloader";
import MyLazyImage from "../LazyImage/MyLazyImage";
import { motion,AnimatePresence } from "framer-motion";

const RandomItem = () => {
  const { randomMeal,favoriteMeals,loader,error } = useAppSelector(
    (state) => state.mealReducer
  );

  const [isTimerOn,setIsTimerOn] = useState(true);

  let timerId;

  const [isVisible,setIsVisible] = useState(true);
  const { getRandomMeal } = useFetch();
  const { handleClickAdd,handleClickRemove,goBack,classes } = useFavoriteWithNav(randomMeal);

  useEffect(() => {
    getRandomMeal().then((data) => getRandomMealAC(data));
  },[]);

  useEffect(() => {
    if (isTimerOn) {
      timerId = setTimeout(() => {
        setIsVisible(false);
        getRandomMeal().then((data) => getRandomMealAC(data));
      },3000);
    }
    return () => {
      setIsVisible(true);
      clearTimeout(timerId);
    }
  },[randomMeal.id,isTimerOn]);

  const toggleAnimate = () => {
    setIsTimerOn(!isTimerOn);
  }

  const item =
    !loader && !error && randomMeal.id && isVisible ? (
      <AnimatePresence>
        <motion.div className="col s12 m12 center"
          initial={{ opacity: 0,y: 300 }}
          animate={{ opacity: 1,y: 0 }}
        >

          <button
            onClick={() => goBack(-1)}
            className="router-link">
            To category
          </button>

          {isTimerOn ?
            <button
              onClick={toggleAnimate}
              className="router-link">
              Stop animation
            </button>
            :
            <button
              onClick={toggleAnimate}
              className="router-link">
              Start animation
            </button>
          }

          <div className="card">
            <div className="card-image">
              <MyLazyImage
                height={770}
                image={randomMeal.image}
                alr={randomMeal.category}
              />
              <span className="card-title card-title_white">{randomMeal.name}</span>
            </div>
            <div className="card-content">
              <div className="star-wrapper">
                {classes ? (
                  <div onClick={() => handleClickRemove(randomMeal.id)}>
                    <i
                      className={
                        !classes
                          ? "fa-regular fa-star star "
                          : "fa-solid fa-star star added"
                      }></i>
                    <span>Delete</span>
                  </div>
                ) : (
                  <div onClick={() => handleClickAdd(randomMeal.id)}>
                    <i
                      className={
                        !classes
                          ? "fa-regular fa-star star"
                          : "fa-solid fa-star star added"
                      }></i>
                    <span>Add</span>
                  </div>
                )}
              </div>
              <p>ID:{randomMeal.instruction}</p>
              <a
                className="router-link"
                target="_blank"
                href={randomMeal.link}>
                Click to get the recipe
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    ) : <Preloader />;

  return (
    <div className="row">
      {!loader && error && <Preloader />}
      {!loader && error ? <div>Error</div> : null}
      {item}
    </div>
  );
};

export default RandomItem;

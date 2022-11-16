// import css from './allCategories.scss';
import useFetch from "../../hooks/useFetch";
import { useEffect,useMemo,useState } from "react";
import { useAppSelector } from "../../store/store";
import { getAllCategories } from "../../actionCreators/bindActionCreators";

import MealCategoryCard from "./MealCategoryCard";
import Preloader from "../Preloader";


const AllCategories = () => {
  const { allCategories,loader,error } = useAppSelector((state) => state.mealReducer);
  const { getMealCategoriesData } = useFetch();


  useEffect(() => {
    getMealCategoriesData()
      .then(categories => getAllCategories(categories));
  },[]);

  return (
    <div className="row">
      {loader && !error ? <Preloader /> : null}
      {!loader && error ? <div>Error</div> : null}
      {!loader && !error && !allCategories ? <div>DONT HAVE ANY MEALS CATEGORY</div> : null}

      {
        allCategories && !loader && !error ? allCategories.map(el => <MealCategoryCard key={el.id} {...el} />) : null
      }
    </div>
  );
}

export default AllCategories;

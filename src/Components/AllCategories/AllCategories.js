import css from './allCategories.scss';

import useFetch from "../../hooks/useFetch";
import { useEffect,useMemo,useState,useRef } from "react";
import { useAppSelector } from "../../store/store";
import { getAllCategories } from "../../actionCreators/bindActionCreators";

import { Link } from "react-router-dom";

import Preloader from "../Preloader";
import MyLazyImage from "../LazyImage/MyLazyImage";


const AllCategories = () => {
  const { allCategories,loader,error } = useAppSelector((state) => state.mealReducer);
  const { getMealCategoriesData } = useFetch();

  useEffect(() => {
    if (!window.localStorage.getItem('allCategories')) {
      getMealCategoriesData()
        .then(categories => {
          getAllCategories(categories)
          return categories
        })
        .then((categories) => window.localStorage.setItem('allCategories',JSON.stringify(categories)))
    } else {
      getAllCategories(JSON.parse(window.localStorage.getItem('allCategories')));
    }
  },[]);


  return (
    <div className="row">
      {loader && !error ? <Preloader /> : null}
      {!loader && error ? <div>Error</div> : null}
      {!loader && !error && !allCategories ? <div>DONT HAVE ANY MEALS CATEGORY</div> : null}

      {allCategories && !loader && !error ?
        allCategories.map((el,i) => (
          <View key={el.id}
            {...el} />
        ))
        :
        null}
    </div >
  );
}

export default AllCategories;


const View = ({ id,category,descr,image }) => {
  return (
    <div className="col s12 m6 l6">
      <div className="card">
        <div className="card-image">
          <MyLazyImage
            height={200}
            image={image}
            alr={category}
          />
          <span className="card-title card-title_black">
            {category}
          </span>
        </div>
        <div className="card-content">
          <p>
            {descr.length > 100
              ? `${descr.slice(0,80)}...`
              : descr}
          </p>
        </div>
        <Link
          className="router-link"
          to={`/category/${category}`}>
          Watch category
        </Link>
      </div>
    </div>
  );
}
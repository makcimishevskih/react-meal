// import css from './AllCategories.scss';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

import useFetch from "@hooks/useFetch";
import { useEffect } from "react";
import { useAppSelector } from "@store/store";

import { getAllCategories } from "@actionCreators/bindActionCreators";

import MyLazyImage from "../my-lazy-Image";
import Preloader from "../preloader";

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

  const isPreloader = loader && !error ? <Preloader /> : null;
  const isError = !loader && error ? <div>Error</div> : null;

  return (
    <div className="row">
      {isPreloader}
      {isError}

      {allCategories && !loader && !error ?
        <>
          <h4>All categories</h4>
          {allCategories.map((el,i) => (
            <View key={+el.id} index={i}
              {...el} id={+el.id} />
          ))
          }
        </>
        :
        <div className="not-found">
          DONT HAVE ANY MEALS CATEGORY
        </div>}
    </div >
  );
}

export default AllCategories;


const View = ({id,category,descr,image,index }) => (
    <motion.div
      initial={index % 2 ? { x: 100 } : { x: -100 }}
      animate={{ x: 0 }}
      className="col s12 m6 l6" >
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
    </motion.div >
  );
}


View.propTypes = {
  id: PropTypes.number,
  category: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
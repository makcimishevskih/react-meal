import css from './SearchCategory.module.scss';

import PropTypes,{ shape } from "prop-types";
import { useEffect,useState } from "react";
import { useNavigate,Link,useLocation } from "react-router-dom";
import { useAppSelector } from "@store/store";
import useFavoriteWithNav from "@hooks/useFavoriteWithNav";

import { addFavoriteMeal,deleteFavoriteMeal } from "@actionCreators/bindActionCreators";

import Preloader from "../preloader";
import MyLazyImage from "../my-lazy-Image";

import { cutMyStrMin } from '@helpers/helpers';

const SearchCategory = () => {
  const { favoriteMeals,searchItems,loader,error } = useAppSelector((state) => state.mealReducer);

  const { search } = useLocation();

  const isPreloader = loader && !error ? <Preloader /> : null;
  const isError = !loader && error ? <div>Error</div> : null;

  return (
    <div className="row">
      {isPreloader}
      {isError}
      {
        <>
          {
            !loader && !error && searchItems ?
              <>
                <h4>Searched meals categories</h4>
                {
                  searchItems.map(el =>
                    <View key={el.id}
                      searchElem={el}
                      searchItems={searchItems}
                      favoriteMeals={favoriteMeals}
                      {...el} />
                  )
                }
              </>
              : <>
                <div className="not-found">
                  Not found value:<br /> <span>{cutMyStrMin(search,'=')}</span>
                </div>
                <br />
                <Link className="router-link" to='/'>Back to home</Link>
              </>
          }
        </>
      }
    </div >
  );
}

export default SearchCategory;


const View = ({ searchElem,id,image,name,area,link,category,instruction }) => {
  const { goBack,classes,handleClickAdd,handleClickRemove } = useFavoriteWithNav(searchElem);
  return (
    <div className="col s12 m12 l12" >
      <div className="card">

        <div className="card-image">
          <MyLazyImage
            height={700}
            image={image}
            alt={category} />
          <span className="card-title card-title_black">{area}</span>
        </div>

        <div className="card-content">
          <div className='star-wrapper'>

            {
              classes ?
                <div onClick={handleClickRemove(id)}>
                  <i className={!classes ? 'fa-regular fa-star star ' : "fa-solid fa-star star added"}></i>
                  <span>Delete</span>
                </div >
                :
                <div onClick={handleClickAdd(id)}>
                  <i className={!classes ? 'fa-regular fa-star star' : "fa-solid fa-star star added"}></i>
                  <span>Add</span>
                </div>
            }

          </div>
          <p>Name: {name}. Category: {category}</p>
          <p>{instruction}</p>
        </div>
        <a className="router-link" target='_blank' href={link}>
          Click to get the recipe
        </a>
        <Link className="router-link" onClick={() => goBack(-1)}>Back to home</Link>
      </div>
    </div>
  );
}

View.propTypes = {
  searchElem: shape({
    id: PropTypes.number,
    area: PropTypes.string,
    category: PropTypes.string,
    instruction: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
  })
};
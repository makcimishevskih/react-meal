
import css from './searchCategory.module.scss';
import Preloader from "../Preloader";

import { useAppSelector } from "../../store/store";
import { useNavigate,Link,useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import { addFavoriteMeal,deleteFavoriteMeal } from "../../actionCreators/bindActionCreators";

const SearchCategory = () => {
  const { favoriteMeals,searchItems,loader,error } = useAppSelector((state) => state.mealReducer);

  return (
    <div className="row">
      {loader && !error ? <Preloader /> : null}
      {!loader && error ? <div>Error</div> : null}
      {!loader && !error && !searchItems ? <>
        <div>
          Not found value
        </div>
        <br />
        <Link className="router-link" to='/'>Back to home</Link>
      </> : null
      }

      {
        !loader && !error && searchItems ? searchItems.map(el =>
          <View key={el.id} searchItems={searchItems} favoriteMeals={favoriteMeals} {...el} />
        ) : null
      }
    </div>
  );
}

export default SearchCategory;


const View = ({ searchItems,favoriteMeals,id,image,name,area,link,category,instruction }) => {

  const navigate = useNavigate();
  const [idd,setIdd] = useState(false);

  const handleClickAdd = (id) => {
    if (favoriteMeals.findIndex(el => el.id === id) === -1) {
      const searchItemIndex = searchItems.findIndex(el => el.id === id);
      setIdd(idd);
      addFavoriteMeal(searchItems[searchItemIndex]);
    }
  }

  const handleClickRemove = (id) => {
    deleteFavoriteMeal(id);
  }

  let classes = favoriteMeals.findIndex((item) => item.id === id) !== -1;


  return (
    <div key={id} className="col s12 m12 l12" >
      <div className="card">

        <div className="card-image">
          <img src={image} data-src={image} alt={name} />
          <span className="card-title card-title_black">{area}</span>
        </div>

        <div className="card-content">
          <div className='star-wrapper'>

            {
              classes ?
                <div onClick={() => handleClickRemove(id)}>
                  <i className={!classes ? 'fa-regular fa-star star ' : "fa-solid fa-star star added"}></i>
                  <span>Delete</span>
                </div >
                :
                <div onClick={() => handleClickAdd(id)}>
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
        <Link className="router-link" onClick={() => navigate(-1)}>Back to home</Link>
      </div>
    </div>
  );
}
  // {/* <iframe src={el.video} title={el.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
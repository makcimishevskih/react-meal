import { Link,useParams } from 'react-router-dom';
import { addFavoriteMeal,deleteFavoriteMeal } from "../../actionCreators/bindActionCreators";
import { useAppSelector } from "../../store/store";
import Preloader from "../Preloader";
import css from './favoriteMeals.module.scss';

const FavoriteMeals = () => {
  const { favoriteMeals,loader,error } = useAppSelector(state => state.mealReducer)

  return (
    <div className="row">

      {loader && !error ? <Preloader /> : null}
      {!loader && error ? <div>Error</div> : null}
      {!loader && !error && !favoriteMeals ? <div>DONT HAVE ANY MEALS CATEGORY</div> : null}

      {
        favoriteMeals && !loader && !error ?
          favoriteMeals.map(el => (
            <View key={el.id} {...el} />
          ))
          : null
      }

    </div >
  );
}

const View = ({ id,name,category,image,instruction }) => {
  const handleClickRemove = (id) => {
    deleteFavoriteMeal(id);
  }

  return (
    <div className="col s12 m6 l4">
      <div className="card">
        <Link to={`/category/${category}/${id}`}>
          <div className="card-image">
            <img data-src={image} src={image} alt={category} />
            <span className="card-title card-title_black">{category}</span>
          </div>
        </Link>
        <div onClick={() => handleClickRemove(id)} className="star-wrapper">
          <i className={"fa-solid fa-star star added"}></i>
          <span>Delete</span>
        </div>
        <div className="card-content">
          {name}
          {/* {el.instruction} */}
        </div>
        <Link className="router-link" to={`/category/${category}`}>Watch category</Link>
      </div>
    </div>
  );
}


export default FavoriteMeals;

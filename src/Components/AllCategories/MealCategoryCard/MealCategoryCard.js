import css from './mealCategoryCard.scss';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const MealCategoryCard = ({ id,category,descr,image }) => {

  return (
    <div className="col s12 m6 l4" >
      <div className="card">
        <div className="card-image">
          <LazyLoadImage
            height={150}
            effect="blur"
            src={image}
            alt={category} />
          <span className="card-title card-title_black">{category}</span>
        </div>
        <div className="card-content">
          <p>{descr.length > 100 ? `${descr.slice(0,80)}...` : descr}</p>
        </div>
        <Link className="router-link" to={`/category/${category}`}>Watch category</Link>
      </div>
    </div>
  );
}

export default MealCategoryCard;

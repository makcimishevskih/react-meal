import css from './singleCategoryId.module.scss';

import { Link,useParams,useNavigate } from 'react-router-dom';

import { useEffect } from "react";
import { useAppSelector } from "../../store/store";
import useFetch from "../../hooks/useFetch";
import useFavoriteWithNav from "../../hooks/useFavoriteWithNav";

import { addFavoriteMeal,chooseCategoryId,deleteFavoriteMeal } from "../../actionCreators/bindActionCreators";

import Preloader from "../Preloader";
import MyLazyImage from "../LazyImage/MyLazyImage";

const SingleCategoryID = () => {
    const { categoryId,loader,error,favoriteMeals } = useAppSelector((state) => state.mealReducer);
    const { getMealById } = useFetch();
    const { itemId } = useParams();


    useEffect(() => {
        getMealById(itemId)
            .then((data) => chooseCategoryId(data));
    },[]);

    const isPreloader = loader && !error ? <Preloader /> : null;
    const isError = !loader && error ? <div>Error</div> : null;

    return (
        <div className='row'>
            {isPreloader}
            {isError}

            {categoryId &&
                <>
                    <h4>{categoryId.name}</h4>
                    <h4>Instruction</h4>
                    <View
                        categoryId={categoryId}
                    />
                </>
            }
        </div >
    );
}

const View = ({ categoryId }) => {
    const { name,instruction,id,image,link,category,} = categoryId;
    const { handleClickAdd,handleClickRemove,goBack,classes } = useFavoriteWithNav(categoryId);

    return (
        <div className="col s12 m12 center" >
            <button onClick={() => goBack(-1)} className="router-link" >Back to category</button>
            <div className="card" >
                <div className="card-image">
                    <MyLazyImage
                        height={680}
                        image={image}
                        alt={category} />
                    <span className="card-title card-title_white">{name}</span>
                </div>
                <div className="card-content">
                    <div className='star-wrapper'>
                        {classes ?
                            <div onClick={() => handleClickRemove(id)} >
                                <i className={!classes ? 'fa-regular fa-star star ' : "fa-solid fa-star star added"}></i>
                                <span>Delete</span>
                            </div>
                            :
                            <div onClick={() => handleClickAdd(id)} >
                                <i className={!classes ? 'fa-regular fa-star star' : "fa-solid fa-star star added"}></i>
                                <span>Add</span>
                            </div>
                        }
                    </div>
                    <h5>Instruction:</h5>
                    <p>{instruction}</p>
                    <a className="router-link" target='_blank' href={link}>Click to get the recipe</a>
                </div>
            </div>
        </div>
    );
}

export default SingleCategoryID;



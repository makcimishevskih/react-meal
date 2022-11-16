import css from './singleCategoryId.module.scss';

import { useEffect } from "react";
import { Link,useParams,useNavigate } from 'react-router-dom';
import { useAppSelector } from "../../store/store";
import useFetch from "../../hooks/useFetch";

import Preloader from "../Preloader";
import { addFavoriteMeal,chooseCategoryId,deleteFavoriteMeal } from "../../actionCreators/bindActionCreators";


const SingleCategoryID = () => {
    const { categoryId,loader,error,favoriteMeals } = useAppSelector((state) => state.mealReducer);
    const { getMealById } = useFetch();
    const { itemId,name } = useParams();
    const goBack = useNavigate();

    let classes = favoriteMeals.findIndex((el) => el.id === categoryId.id) !== -1;

    useEffect(() => {
        getMealById(itemId)
            .then((data) => chooseCategoryId(data));

    },[]);


    const handleClickAdd = (id) => {
        console.log(classes,'add');
        if (favoriteMeals.findIndex(el => el.id === id) === -1) {
            addFavoriteMeal(categoryId);
        }
    }
    const handleClickRemove = (id) => {
        console.log(classes,'remove');
        if (favoriteMeals.findIndex(el => el.id === id) !== -1) {
            deleteFavoriteMeal(id);
        }
    }

    // console.log(classes)
    return (
        <div className='row'>
            {loader && !error ? <Preloader /> : null}
            {!loader && error ? <div>Error</div> : null}
            {categoryId &&
                <div className="col s12 m12 center" >
                    <button onClick={() => goBack(-1)} className="router-link" >To category</button>
                    <div className="card" >
                        <div className="card-image">
                            <img data-src={categoryId.image} src={categoryId.image} alt='categoryItem' />
                            <span className="card-title card-title_white">{categoryId.name}</span>
                        </div>
                        <div className="card-content">
                            <div className='star-wrapper'>
                                {classes ?
                                    <div onClick={() => handleClickRemove(categoryId.id)} >
                                        <i className={!classes ? 'fa-regular fa-star star ' : "fa-solid fa-star star added"}></i>
                                        <span>Delete</span>
                                    </div>
                                    :
                                    <div onClick={() => handleClickAdd(categoryId.id)} >
                                        <i className={!classes ? 'fa-regular fa-star star' : "fa-solid fa-star star added"}></i>
                                        <span>Add</span>
                                    </div>
                                }

                            </div>
                            <p>ID:{categoryId.instruction}</p>
                            <a className="router-link" target='_blank' href={categoryId.link}>Click to get the recipe</a>
                        </div>
                        {/* <div className="card-content"> */}
                        {/* <p>Video:</p> */}
                        {/* <iframe src={categoryId.video} title="James Martin Home Comforts 17/02/14" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                        {/* </div> */}
                    </div >
                </div >
            }
        </div >
    );
}

export default SingleCategoryID;



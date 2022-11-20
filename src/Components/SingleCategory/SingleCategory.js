import css from './activeCategory.module.scss';

import { useEffect,useState } from "react";
import { Link,useParams } from 'react-router-dom';

import useFetch from "../../hooks/useFetch";
import { useAppSelector } from "../../store/store";
import { chooseCategoryId,chooseCategory } from "../../actionCreators/bindActionCreators";

import Preloader from "../Preloader";
import MyLazyImage from "../LazyImage/MyLazyImage";


const SingleCategory = () => {
    const { getFilterByCategory } = useFetch();
    const { activeCategory,loader,error } = useAppSelector((state) => state.mealReducer);

    const { name } = useParams();

    useEffect(() => {
        if (!window.localStorage.getItem(`${name}Category`)) {
            getFilterByCategory(name)
                .then(category => {
                    chooseCategory(category)
                    return category;
                })
                .then((category) => window.localStorage.setItem(`${name}Category`,JSON.stringify(category)))
        }
        else {
            chooseCategory(JSON.parse(window.localStorage.getItem(`${name}Category`)));
        }
    },[]);


    const isPreloader = loader && !error && !activeCategory ? <Preloader /> : null;
    const isError = !loader && error ? <div>Error</div> : null;

    return (
        <div className='row'>

            {isPreloader}
            {isError}

            {activeCategory && !loader && !error ?
                <>
                    <h4>Category: {name}</h4>

                    {activeCategory.map((el) => (
                        <View key={el.id} paramsName={name} {...el} />
                    ))
                    }
                </>
                : null
            }
        </div >
    );
}

export default SingleCategory;

const View = ({ id,name,category,image,paramsName }) => {

    return (
        <div key={id} className="col s6 m6 l6" >
            <div className="card" >
                <div className="card-image">
                    <MyLazyImage
                        image={image}
                        alt={category} />
                    <span className="card-title card-title_white">{name}</span>
                </div>
                <div className="card-content">
                    <p>{name}</p>
                </div>
                <Link to={`/category/${paramsName}/${id}`} className="router-link">Instruction</Link>
                <Link className="router-link" to='/'>Back to categories</Link>
            </div>
        </div >
    );
}

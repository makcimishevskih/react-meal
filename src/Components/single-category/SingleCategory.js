// import css from './SingleCategory.module.scss';

import PropTypes from 'prop-types';
import { useEffect } from "react";
import { Link,useParams } from 'react-router-dom';

import useFetch from "@hooks/useFetch";
import { useAppSelector } from "@store/store";
import { chooseCategory } from "@actionCreators/bindActionCreators";

import Preloader from "../preloader";
import MyLazyImage from "../my-lazy-Image";


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

const View = ({ id,name,category,image,paramsName }) => (
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




View.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    paramsName: PropTypes.string.isRequired
};
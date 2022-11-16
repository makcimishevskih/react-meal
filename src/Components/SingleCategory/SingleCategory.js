import css from './activeCategory.module.scss';
import useFetch from "../../hooks/useFetch";
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';

import { useAppSelector } from "../../store/store";
import { chooseCategoryId,chooseCategory } from "../../actionCreators/bindActionCreators";

import Preloader from "../Preloader";

import { useParams } from 'react-router-dom';

const SingleCategory = () => {
    const { getFilterByCategory } = useFetch();
    const { activeCategory,loader,error } = useAppSelector((state) => state.mealReducer);

    const { name } = useParams();

    useEffect(() => {
        getFilterByCategory(name)
            .then(category => chooseCategory(category));
    },[]);


    return (
        <>
            <div className='row'>
                {loader && !error && !activeCategory ? <Preloader /> : null}
                {!loader && error ? <div>Error</div> : null}

                {activeCategory && !loader && !error && activeCategory.map((el) => (
                    <div key={el.id} className="col s12 m6" >
                        <div className="card" >
                            <div className="card-image">
                                <img data-src={el.image} src={el.image} alt='categoryItem' />
                                <span className="card-title card-title_white">{el.name}</span>
                            </div>
                            <div className="card-content">
                                <p>ID: {el.id}</p>
                            </div>
                            <Link to={`/category/${name}/${el.id}`} className="router-link">Instruction</Link>
                            <Link className="router-link" to='/'>Back to categories</Link>
                        </div>
                    </div >
                ))
                }

            </div >
        </>
    );
}

export default SingleCategory;

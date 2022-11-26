import './FavoriteMeals.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAppSelector } from '@store/store';
import useFavoriteWithNav from '@hooks/useFavoriteWithNav';

import Preloader from '../preloader';
import MyLazyImage from '../my-lazy-Image';

const FavoriteMeals = () => {
    const { favoriteMeals, loader, error } = useAppSelector(
        (state) => state.mealReducer
    );

    const isPreloader = loader && !error ? <Preloader /> : null;
    const isError = !loader && error ? <div>Error</div> : null;

    return (
        <div className='row'>
            {isPreloader}
            {isError}

            {!!favoriteMeals.length && !loader && !error ? (
                <>
                    <h4>Favorite meals</h4>
                    <div>Click to the image to get the instruction</div>
                    {favoriteMeals.map((el) => (
                        <View
                            favoriteMeals={favoriteMeals}
                            key={el.id}
                            {...el}
                        />
                    ))}
                </>
            ) : (
                <motion.div
                    className='col s12 m12 l12 not-found'
                    initial={{ opacity: 0, y: 500 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    DONT HAVE ANY FAVORITE MEALS
                </motion.div>
            )}
        </div>
    );
};

const View = ({ id, name, category, image }) => {
    const { isVisible, handleClickRemove } = useFavoriteWithNav();

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className='col s12 m12 l12'
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -800 }}
                >
                    <div className='card'>
                        <Link to={`/category/${category}/${id}`}>
                            <motion.div
                                whileHover={{ opacity: 0.8 }}
                                className='card-image'
                            >
                                <MyLazyImage image={image} alt={category} />
                                <span className='card-title card-title_black'>
                                    {category}
                                </span>
                            </motion.div>
                        </Link>
                        <div
                            role='presentation'
                            onClick={handleClickRemove(id, true)}
                            // onKeyDown={() => console.log(123123)}
                            className='star-wrapper'
                        >
                            <i className='fa-solid fa-star star added' />
                            <span>Delete</span>
                        </div>
                        <div className='card-content'>{name}</div>
                        <Link
                            className='router-link'
                            to={`/category/${category}`}
                        >
                            Watch category
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

View.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default FavoriteMeals;

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { addFavoriteMeal,deleteFavoriteMeal } from "@actionCreators/bindActionCreators";
import { useAppSelector } from "@store/store";


const useFavoriteWithNav = (propItem) => {
    const { favoriteMeals } = useAppSelector((state) => state.mealReducer);

    const goBack = useNavigate();

    let classes = propItem?.id && favoriteMeals.findIndex((el) => el.id === propItem.id) !== -1;

    const handleClickAdd = (id) => {
        if (favoriteMeals.findIndex((el) => el.id === id) === -1) {
            addFavoriteMeal(propItem);
        }
    }


    const handleClickRemove = (id) => {
        // timer
        if (favoriteMeals.findIndex((el) => el.id === id) !== -1) {
            deleteFavoriteMeal(id);
        }
    }

    return {
        handleClickAdd,
        handleClickRemove,
        goBack,
        classes,
    };
};

export default useFavoriteWithNav;
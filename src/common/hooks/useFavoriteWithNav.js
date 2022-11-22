import { useCallback,useEffect,useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFavoriteMeal,deleteFavoriteMeal } from "@actionCreators/bindActionCreators";
import { useAppSelector } from "@store/store";


const useFavoriteWithNav = (propItem) => {
    const { favoriteMeals } = useAppSelector((state) => state.mealReducer);

    const [isVisible,setIsVisible] = useState(true);
    const goBack = useNavigate();
    let timerId = useRef();

    let classes = propItem?.id && favoriteMeals.findIndex(
        (el) => el.id === propItem.id) !== -1;

    const handleClickAdd = useCallback((id) => () => {
        if (favoriteMeals.findIndex((el) => el.id === id) === -1) {
            addFavoriteMeal(propItem);
        }
    },[propItem?.id,favoriteMeals]);

    const handleClickRemove = useCallback((id,isTimerActive = false) => () => {
        if (isTimerActive) {
            setIsVisible(!isVisible);
            timerId = setTimeout(() => {
                deleteFavoriteMeal(id);
            },200)
        } else if (favoriteMeals.findIndex((el) => el.id === id) !== -1) {
            deleteFavoriteMeal(id);
        }
    },[favoriteMeals]);


    useEffect(() => {
        return () => {
            clearTimeout(timerId);
        }
    },[isVisible])

    return {
        classes,
        isVisible,
        goBack,
        handleClickAdd,
        handleClickRemove,
    };
};

export default useFavoriteWithNav;
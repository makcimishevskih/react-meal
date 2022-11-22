import { useCallback,useEffect,useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import { addFavoriteMeal,deleteFavoriteMeal } from "@actionCreators/bindActionCreators";
import { useAppSelector } from "@store/store";


const useFavoriteWithNav = (firstPropItem,secondProp) => {
    const { favoriteMeals } = useAppSelector((state) => state.mealReducer);

    const [isVisible,setIsVisible] = useState(true);
    const goBack = useNavigate();
    let timerId = useRef();

    let classes = firstPropItem?.id && favoriteMeals.findIndex(
        (el) => el.id === firstPropItem.id) !== -1;

    const handleClickAdd = useCallback((id) => () => {
        if (favoriteMeals.findIndex((el) => el.id === id) === -1) {
            addFavoriteMeal(firstPropItem);
        }
    },[firstPropItem?.id,favoriteMeals]);


    const handleClickRemove = (id,isTimerActive = false) => () => {
        if (isTimerActive) {
            setIsVisible(!isVisible);
            timerId = setTimeout(() => {
                deleteFavoriteMeal(id);
            },300)
        } else if (favoriteMeals.findIndex((el) => el.id === id) !== -1) {
            deleteFavoriteMeal(id);
        }
    }


    useEffect(() => {
        return () => {
            clearTimeout(timerId);
        }
    },[])

    return {
        classes,
        isVisible,
        goBack,
        handleClickAdd,
        handleClickRemove,
    };
};

export default useFavoriteWithNav;
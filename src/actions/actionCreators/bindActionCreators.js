import store from "../store";
import * as actions from './actionCreators';
import { bindActionCreators } from "redux";

const { dispatch } = store;
export const { getRandomMealAC,addFavoriteMeal,deleteFavoriteMeal,updateSearchCategory,getMealItemFromSearch,chooseCategoryId,chooseCategory,getAllCategories,error,loader } = bindActionCreators(actions,dispatch);
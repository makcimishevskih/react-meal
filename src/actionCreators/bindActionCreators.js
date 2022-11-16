import { bindActionCreators } from "redux";
import store from "../store";
import * as actions from './actionCreators';

const { dispatch } = store;
export const { addFavoriteMeal,deleteFavoriteMeal,getMealFromSearch,getMealItemFromSearch,chooseCategoryId,chooseCategory,getAllCategories,error,loader } = bindActionCreators(actions,dispatch);
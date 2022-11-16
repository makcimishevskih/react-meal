import { ADD_FAVORITE_MEALS,DELETE_FAVORITE_MEALS,SEARCH_ITEMS,SEARCH_MEAL,ERROR,LOADER,SUCCESS,GET_ALL_CATEGORIES,CHOOSE_CATEGORY,CHOOSE_CATEGORY_ID } from "../actions/actions"

export const loader = (status) => ({ type: LOADER,payload: status });
export const error = (errorMessage) => ({ type: ERROR,payload: errorMessage });
// export const success = (data) => ({ type: SUCCESS,payload: data });

export const getAllCategories = (mealsData) => ({ type: GET_ALL_CATEGORIES,payload: mealsData });
export const chooseCategory = (categoryData) => ({ type: CHOOSE_CATEGORY,payload: categoryData });
export const chooseCategoryId = (categoryId) => ({ type: CHOOSE_CATEGORY_ID,payload: categoryId });
export const getMealFromSearch = (searchValue) => ({ type: SEARCH_MEAL,payload: searchValue });

export const getMealItemFromSearch = (searchItems) => ({ type: SEARCH_ITEMS,payload: searchItems });

export const addFavoriteMeal = (item) => ({ type: ADD_FAVORITE_MEALS,payload: item });
export const deleteFavoriteMeal = (item) => ({ type: DELETE_FAVORITE_MEALS,payload: item });
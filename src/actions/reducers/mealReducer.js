import {
    ADD_FAVORITE_MEALS,DELETE_FAVORITE_MEALS,
    SEARCH_ITEMS,SEARCH_CATEGORIES,
    GET_ALL_CATEGORIES,
    CHOOSE_CATEGORY,CHOOSE_CATEGORY_ID,
    LOADER,ERROR,
    GET_RANDOM_MEAL
} from "../../actions/actions";

const initialState = {
    allCategories: null,
    activeCategory: null,
    categoryId: null,
    loader: false,
    error: '',
    searchMeal: '',
    searchItems: null,
    favoriteMeals: [],
    randomMeal: {},
};

const mealReducer = (state = initialState,{ type,payload }) => {
    switch (type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                allCategories: payload
            }
        case CHOOSE_CATEGORY:
            return {
                ...state,
                activeCategory: payload
            }
        case CHOOSE_CATEGORY_ID:
            return {
                ...state,
                categoryId: payload
            }

        case SEARCH_CATEGORIES:
            return {
                ...state,
                searchMeal: payload
            }
        case SEARCH_ITEMS:
            return {
                ...state,
                searchItems: payload
            }

        case ADD_FAVORITE_MEALS:
            return {
                ...state,
                favoriteMeals: [...state.favoriteMeals,payload]
            }
        case DELETE_FAVORITE_MEALS:
            return {
                ...state,
                favoriteMeals: state.favoriteMeals.filter(el => el.id !== payload),
            }

        case GET_RANDOM_MEAL:
            return {
                ...state,
                randomMeal: payload
            }

        case LOADER:
            return {
                ...state,
                loader: payload,
            }
        case ERROR:
            return {
                ...state,
                error: payload
            }
        default:
            return state;
    }
}

export default mealReducer
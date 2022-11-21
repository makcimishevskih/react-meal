import { useCallback,useState } from "react";
import { error,loader } from "@actionCreators/bindActionCreators";
import { SEARCH_BY_ID,SEARCH_BY_NAME,SEARCH_CATEGORIES,SEARCH_RANDOM_MEAL,FILTER_BY_CATEGORY } from "../../api";

// url and api key from .env.local
const useFetch = () => {

    const getMealCategoriesData = async () => {
        loader(true);
        error('');


        try {
            const response = await fetch(SEARCH_CATEGORIES);
            if (response.ok) {
                const data = await response.json();
                loader(false)
                return formatDataToCategories(data.categories);
            }
        } catch (err) {
            error('Fetch error: ',err,error);
            loader(false)
            throw new Error('Error',err,error);
        }

        function formatDataToCategories (data) {
            return data.map(el => {
                return {
                    id: el.idCategory,
                    category: el.strCategory,
                    descr: el.strCategoryDescription,
                    image: el.strCategoryThumb,
                }
            });
        }
    }

    const getFilterByCategory = async (name) => {
        loader(true);
        error('');

        try {
            const response = await fetch(FILTER_BY_CATEGORY + name);
            if (response.ok) {
                const data = await response.json();
                loader(false);
                return formatDataForCategory(data.meals);
            }
        } catch (err) {
            loader(false);
            error('Fetch error: ',err,error);
            throw new Error('Error',err,error);
        }

        function formatDataForCategory (data) {
            return data.map(el => {
                return {
                    id: el.idMeal,
                    name: el.strMeal,
                    image: el.strMealThumb,
                };
            })
        }
    }

    const getMealById = async (id) => {
        loader(true);
        error('');
        try {
            const response = await fetch(SEARCH_BY_ID + id);
            if (response.ok) {
                const data = await response.json();
                loader(false)
                return formatData(data.meals)[0];
            }
        } catch (err) {
            loader(false);
            error('Fetch error: ',err,error);
            throw new Error('Error',err,error);
        }

    }

    const getMealByName = async (name) => {
        loader(true);
        error();

        try {
            const response = await fetch(SEARCH_BY_NAME + name);
            if (response.ok) {
                const data = await response.json();
                loader(false)

                return data?.meals ? formatData(data.meals) : null;
            }
        } catch (err) {

            loader(false);
            error('Fetch error: ',err,error);
            throw new Error('Error',err,error);
        }
    }

    const getRandomMeal = async () => {
        loader(true);
        error();

        try {
            const response = await fetch(SEARCH_RANDOM_MEAL);
            if (response.ok) {
                const data = await response.json();
                loader(false);
                return formatData(data.meals)[0];
            }
        } catch (err) {
            loader(false);
            error('Fetch error: ',err,error);
            throw new Error('Error',err,error);
        }
    }

    function formatData (data) {
        return data.map(el => {
            return {
                id: el.idMeal,
                area: el.strArea,
                category: el.strCategory,
                instruction: el.strInstructions,
                name: el.strMeal,
                image: el.strMealThumb,
                link: el.strSource
            };
        });
    }
    return {
        getMealCategoriesData,
        getFilterByCategory,
        getMealById,
        getMealByName,
        getRandomMeal,
    }
}

export default useFetch;
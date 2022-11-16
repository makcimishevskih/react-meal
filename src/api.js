import { API_KEY,API_URL } from "./config";

export const SEARCH_CATEGORIES = `${API_URL}${API_KEY}/categories.php`;
export const SEARCH_RANDOM_MEAL = `${API_URL}${API_KEY}/random.php`;

export const SEARCH_BY_NAME = `${API_URL}${API_KEY}/search.php?s=`;
export const SEARCH_BY_ID = `${API_URL}${API_KEY}/lookup.php?i=`;
export const FILTER_BY_CATEGORY = `${API_URL}${API_KEY}/filter.php?c=`;
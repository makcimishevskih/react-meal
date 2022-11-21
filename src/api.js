import { API_KEY,API_URL } from "./config";

const API = `${API_URL}${API_KEY}`;

export const SEARCH_CATEGORIES = `${API}/categories.php`;
export const SEARCH_RANDOM_MEAL = `${API}/random.php`;

export const SEARCH_BY_NAME = `${API}/search.php?s=`;
export const SEARCH_BY_ID = `${API}/lookup.php?i=`;
export const FILTER_BY_CATEGORY = `${API}/filter.php?c=`;
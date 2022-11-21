import { lazy } from "react";

const Category = lazy(() => import('./Category'));
const CategoryName = lazy(() => import('./CategoryName'));
const CategoryId = lazy(() => import('./CategoryId'));
const Randomizer = lazy(() => import('./Randomizer'));
const Favorite = lazy(() => import('./Favorite'));
const Search = lazy(() => import('./Search'));
const About = lazy(() => import("./About"));
const PageNotFound = lazy(() => import('./PageNotFound'));

export { Favorite,About,Category,CategoryId,CategoryName,Randomizer,PageNotFound,Search };
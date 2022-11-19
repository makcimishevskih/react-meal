import { lazy } from "react";

const Category = lazy(() => import('./Category'));
const About = lazy(() => import("./About"));
const CategoryId = lazy(() => import('./CategoryId'));
const CategoryName = lazy(() => import('./CategoryName'));
const Randomizer = lazy(() => import('./Randomizer'));
const Search = lazy(() => import('./Search'));
const PageNotFound = lazy(() => import('./PageNotFound'));
const Favorite = lazy(() => import('./Favorite'));

export { Favorite,About,Category,CategoryId,CategoryName,Randomizer,PageNotFound,Search };
import { useNavigate,useLocation,useParams } from "react-router-dom";
import { updateSearchCategory,getMealItemFromSearch } from "@actionCreators/bindActionCreators";
import useFetch from "@hooks/useFetch";
import { useAppSelector } from "@store/store";
import css from "./searchPanel.module.scss";

const SearchPanel = () => {
  const searchMeal = useAppSelector((state) => state.mealReducer.searchMeal);
  const { getMealByName } = useFetch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const searchValue = e.target.value.replace(/\d/ig,"");
    updateSearchCategory(searchValue);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchMeal) return;

    getMealByName(searchMeal)
      .then(data => getMealItemFromSearch(data))
      .then(() => navigate(`/search?search=${searchMeal}`));
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className={css.form}>
        <input onChange={handleChange}
          className={css.input}
          value={searchMeal}
          name="name"
          type="text"
          placeholder="Type some meal category..." />
      </form>
    </div>
  );
}

export default SearchPanel;

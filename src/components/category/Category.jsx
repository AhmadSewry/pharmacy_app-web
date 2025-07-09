import { CategoriesData } from "./CategoriesData";
import "./Category.css"
const Category = () => {
  return (
    <div className="categories">
      {CategoriesData.map((category) => (
        <div key={category.id} className="category-item" >
          <img
            src={category.image}
            alt={category.title}
            className="category-item-img"
          />
          <b className="category-item-title">{category.title}</b>
        </div>
      ))}
    </div>
  );
};
export default Category;

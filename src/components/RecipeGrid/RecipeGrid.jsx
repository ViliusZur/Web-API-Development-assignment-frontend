import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipeGrid.module.css";

export default function RecipeGrid(props) {
  const { recipes } = props;
  
  return (
    <div className={styles.grid}>
      {recipes.map((recipe, i) => (
        <RecipeCard
          key={recipe.id}
          title={recipe.title}
          subtitle={recipe.subtitle}
          author={recipe.authorid}
          imgURL={recipe.mainImageUrl}
          style={{animationDelay: `${i * 0.08}s`}}
        />
      ))}
    </div>
  );
}

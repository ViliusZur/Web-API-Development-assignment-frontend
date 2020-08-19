import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./HomeGrid.module.css";

export default function HomeGrid(props) {
  return (
    <div className={styles.grid}>
      {props.recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          title={recipe.title}
          description={recipe.description}
          imgURL={recipe.imgURL}
        />
      ))}
    </div>
  );
}
import React from "react";
import { Card } from "antd";

import styles from './RecipeCard.module.css'

export default function RecipeCard (props) {
    const { Meta } = Card
    const { style } = props // Pass down styles from parent. Used to add animation delay
    //
    //
    //'https://ak3.picdn.net/shutterstock/videos/1014792383/thumb/1.jpg'
    return (
      <Card
        className={styles.recipeCard}
        hoverable
        cover={<img src={`http://localhost:3300/public/recipeImages/mainImages/${props.imgURL}`} alt={"imgURL"} style={{flex: 253, height: 200}} />}
        style={style}
      >
        <Meta title={props.title} description={props.subtitle} author={props.author} />
      </Card>
    );
}

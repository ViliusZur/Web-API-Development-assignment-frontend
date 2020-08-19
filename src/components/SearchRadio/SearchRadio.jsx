import React from "react";
import { Radio } from "antd";

import styles from "./SearchRadio.module.css";

export default function SearchRadio(props) {
  const { radioItems, setRadioItem, selectedRadioItem } = props;

  return (
    <Radio.Group className={styles.searchRadioWrapper} onChange={(e) => setRadioItem(e.target.value)} value={selectedRadioItem}>
      {radioItems.map((item, i) => {
        return (
          <Radio value={item} key={`radio-${i}`}>
            {item}
          </Radio>
        );
      })}
    </Radio.Group>
  );
}

import React from "react";
import { Button } from "antd";

import styles from "./Pagination.module.css";

export default function Pagination(props) {
  const { pageCount, handleClick, currentPage } = props;
  return (
    <div className={styles.paginationWrapper}>
      {[...Array(pageCount)].map((e, i) => (
        <Button className={styles.button} type={currentPage === i ? 'primary' : null} onClick={handleClick} key={`page-${i + 1}`}>
          {i + 1}
        </Button>
      ))}
    </div>
  );
}

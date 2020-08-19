import React, {useState} from 'react';
import { Input } from 'antd';
import SearchRadio from '../SearchRadio/SearchRadio';
import Categories from '../Categories/Categories';
import styles from './Search.module.css';

export default function Search (props) {
    const radioItems = ['recipes', 'users'];
    const { Search } = Input;
    const { handleSearch, categories } = props;

    const [selectedRadioItem, setRadioItem] = useState(radioItems[0]);
    const [selectedCategory, setSelectedCategory] = useState(undefined);

    return (
        <div className={styles.searchWrapper}>
            <Search placeholder="input search text" onSearch={(value) => handleSearch(value, selectedRadioItem, selectedCategory)} enterButton />
            <SearchRadio radioItems={radioItems} selectedRadioItem={selectedRadioItem}  setRadioItem={setRadioItem}/>
            {categories && <Categories categories={categories} handleChangeCategory={setSelectedCategory}/>}
            {selectedCategory === undefined ? 'All' : selectedCategory}
        </div>
    );
}

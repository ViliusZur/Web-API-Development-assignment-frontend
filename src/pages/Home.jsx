import React, { Component } from "react";
import RecipeGrid from "../components/RecipeGrid/RecipeGrid";
import Pagination from "../components/Pagination/Pagination";
import Layout from '../components/Layout/Layout'
import Search from "../components/Search/Search";
import { tsMethodSignature } from "@babel/types";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      totalPages: 0,
      categories: [],
      searchQuery: "",
      recipes: [],
      promiseIsResolved: false
    };
  }

  handleSearch = (query, selectedRadioItem, selectedCategory) => {
    // Once this function is called, component will rerender (Because state is changed)
    // And componentDidMount will be called with and call fetchRecipes and use search query

    if(selectedCategory === 'All') selectedCategory = '&';

    const searchQuery = `&category=${selectedCategory ? selectedCategory : ''}&selected=${selectedRadioItem}&title=${query}`; //selectedRatioItem returns string users or recipes

    this.setState({
      searchQuery: searchQuery
    });

    this.fetchRecipes(1, searchQuery);
  };

  async fetchRecipes(pageNumber, searchQuery) {

    // query is selectedRadio + 
    // If query is not undefined fetch latest, else fetch with query
    // Don't forget to use pageNumber

    let query = ``;

    if(searchQuery === undefined){
      query = `http://localhost:3300/recipes/latest?page=${pageNumber}`;
    } else {
      query = `http://localhost:3300/recipes?page=${pageNumber}${searchQuery}`;
    }

    this.setState({
      totalPages: 0,
      recipes: [],
      currentPage: pageNumber
    });
    
    //console.log("query: ", query);

    fetch(query, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }})
      .then(res => {
          if(res.ok) {
            res.json().then(json => {
              
              this.setState({
                totalPages: json.pageCount,
                recipes: json.recipes
              });
              
            });
          } else {
            console.log("error in fetching search query");
          }
      });
  };

  fetchCategories = () => {
    // Fetch from db categories here

    fetch(`http://localhost:3300/recipes/categories`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }})
      .then(res => {
          if(res.ok) {
            res.json().then(json => {

              json.unshift('All'); //adding a category "All"
              this.setState({
                categories: json
              });
    
            });
          } else {
            console.log("error in fetching categories");
          }
      });
  }

  // Fetch component data when mounts
  componentDidMount() {
    this.fetchCategories();
    this.fetchRecipes(this.state.currentPage);
  }

  handlePageChange = e => {
    e.preventDefault();
    const selectedPage = e.currentTarget.innerHTML;
    this.setState({
      currentPage: selectedPage
    });
    this.fetchRecipes(selectedPage);
  };

  render() {
    const recipes = this.state.recipes
    const { categories } = this.state;
    return (
      <>
        <Search handleSearch={this.handleSearch} categories={categories} />
        {recipes && (
          <>
            <RecipeGrid recipes={recipes} />
            <Pagination
              pageCount={this.state.totalPages}
              currentPage={this.state.currentPage}
              handleClick={this.handlePageChange}
            />
          </>
        )}
      </>
    );
  }
}

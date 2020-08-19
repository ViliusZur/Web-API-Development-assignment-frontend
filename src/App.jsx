import React from "react";
import Home from "./pages/Home";
import Layout from "./components/Layout/Layout";

function App(props) {
  return (
    <Layout isLoggedIn={props.isLoggedIn}>
      <Home recipes={props.recipes} />
    </Layout>
  );
}

export default App;

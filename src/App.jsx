import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Home } from "./components/home/Home";
import { ArticleDetails } from "./components/article-details/ArticleDetails";
import { AddArticle } from "./components/add-article/AddArticle";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/articles/:article_id"
            element={<ArticleDetails />}
          ></Route>
          <Route path="/add-article" element={<AddArticle />}></Route>
        </Routes>

        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

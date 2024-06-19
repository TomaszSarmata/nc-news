import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Home } from "./components/home/Home";
import { ArticleDetails } from "./components/article-details/ArticleDetails";
import { AddArticle } from "./components/add-article/AddArticle";
import { Search } from "./components/search/Search";
import { ArticleList } from "./components/article-list/ArticleList";

function App() {
  const [user, setUser] = useState("grumpy19");

  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/articles/:articleId"
            element={<ArticleDetails user={user} />}
          ></Route>
          <Route path="/articles-by-topic" element={<Search />}></Route>
          <Route
            path="/articles-by-topic/:topic"
            element={<Search user={user} />}
          ></Route>

          <Route path="/add-article" element={<AddArticle />}></Route>
        </Routes>

        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

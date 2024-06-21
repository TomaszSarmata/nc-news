import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Home } from "./components/home/Home";
import { ArticleDetails } from "./components/article-details/ArticleDetails";
import { Search } from "./components/search/Search";
import { Login } from "./components/login/Login";
import { NotFound } from "./components/not-found/NotFound";
import { UserProvider } from "./contexts/User";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Header></Header>

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/articles/:articleId"
              element={<ArticleDetails />}
            ></Route>
            <Route path="/articles-by-topic" element={<Search />}></Route>
            <Route
              path="/articles-by-topic/:topic"
              element={<Search />}
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer></Footer>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

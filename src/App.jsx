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

function App() {
  const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <div className="App">
        <Header user={user} setUser={setUser}></Header>

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
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

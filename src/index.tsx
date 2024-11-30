import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Pages/Homepage";
import Login from "./components/Pages/Login";
import ShowItem from "./components/Pages/ShowItem";
import reportWebVitals from "./reportWebVitals";
import Timeline from "./components/Pages/Timeline";
import MediaForm from "./components/Pages/MediaForm";
import Search from "./components/Pages/Search";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:mediaType/homepage" element={<Homepage />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/:mediaType/view/:id" element={<ShowItem />} />
        <Route path="/:mediaType/:formType/:id?" element={<MediaForm />} />
        <Route path="/search/:query?" element={<Search />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

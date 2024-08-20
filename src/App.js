import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./bbs/component/pages/HomePage";
import BbsWriter from "./bbs/component/pages/BbsWritePage";
import BbsView from "./bbs/component/pages/BbsViewPage";

function App() {
  return (
    <BrowserRouter>
      <h2>React BBS Project</h2>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/bbs-write" element={<BbsWriter />}></Route>
        <Route path="/bbs-view/:id" element={<BbsView />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

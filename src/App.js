import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./bbs/component/pages/HomePage";
import BbsWriter from "./bbs/component/pages/BbsWritePage";
import BbsView from "./bbs/component/pages/BbsViewPage";
import BbsUpdate from "./bbs/component/pages/BbsUpdatePage";

function App() {
  return (
    <BrowserRouter>
      <h2>React BBS Project</h2>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/bbs-write" element={<BbsWriter />}></Route>
        <Route path="/bbs-view/:id" element={<BbsView />}></Route>
        <Route path="/bbs-update" element={<BbsUpdate />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

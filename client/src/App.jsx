import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dec1 from "./pages/Dec1";
import Dec2 from "./pages/Dec2";
import Dec3 from "./pages/Dec3";
import Dec4 from "./pages/Dec4";
import Dec5 from "./pages/Dec5";
import Dec6 from "./pages/Dec6";
import Dec7 from "./pages/Dec7";
import Dec8 from "./pages/Dec8";
import Dec9 from "./pages/Dec9";
import Dec10 from "./pages/Dec10";
import Dec11 from "./pages/Dec11";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/dec1" element={<Dec1 />}></Route>
          <Route path="/dec2" element={<Dec2 />}></Route>
          <Route path="/dec3" element={<Dec3 />}></Route>
          <Route path="/dec4" element={<Dec4 />}></Route>
          <Route path="/dec5" element={<Dec5 />}></Route>
          <Route path="/dec6" element={<Dec6 />}></Route>
          <Route path="/dec7" element={<Dec7 />}></Route>
          <Route path="/dec8" element={<Dec8 />}></Route>
          <Route path="/dec9" element={<Dec9 />}></Route>
          <Route path="/dec10" element={<Dec10 />}></Route>
          <Route path="/dec11" element={<Dec11 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

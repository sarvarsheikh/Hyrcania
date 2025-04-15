import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <BrowserRouter>
     <ScrollToTop />
        <App data-oid="90g1s5d" /> {/* Main app content */}
    </BrowserRouter>
);

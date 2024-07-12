import "bootstrap/dist/css/bootstrap.min.css";
import Slidebar from "./Slidebar";
import React from "react";
import { Route, Routes } from "react-router-dom";
import ContentPage1 from "./ContentSupport/ContentPage1";
import ContentPage2 from "./ContentSupport/ContentPage2";
import ContentPage3 from "./ContentSupport/ContentPage3";
import ContentPage4 from "./ContentSupport/ContentPage4";
import ContentPage5 from "./ContentSupport/ContentPage5";
import ContentPage6 from "./ContentSupport/ContentPage6";
import ContentPage7 from "./ContentSupport/ContentPage7";
import ContentPage8 from "./ContentSupport/ContentPage8";
import ContentPage9 from "./ContentSupport/ContentPage9";
import ContentPage10 from "./ContentSupport/ContentPage10";
import ContentPage11 from "./ContentSupport/ContentPage11";

const Support = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <Slidebar />
        </div>
        <div className="col-lg-8">
          <Routes>
            <Route path="" element={<ContentPage1 />} />
            <Route path="support1" element={<ContentPage1 />} />
            <Route path="support2" element={<ContentPage2 />} />
            <Route path="support3" element={<ContentPage3 />} />
            <Route path="support4" element={<ContentPage4 />} />
            <Route path="support5" element={<ContentPage5 />} />
            <Route path="support6" element={<ContentPage6 />} />
            <Route path="support7" element={<ContentPage7 />} />
            <Route path="support8" element={<ContentPage8 />} />
            <Route path="support9" element={<ContentPage9 />} />
            <Route path="support10" element={<ContentPage10 />} />
            <Route path="support11" element={<ContentPage11 />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Support;

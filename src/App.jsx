import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home.jsx";
// import About from "./About.jsx";
// import Contact from "./Contact.jsx";
import RdNavbar from "./RdNavbar.jsx";
// import Service from "./Service.jsx";
import API from "./API.jsx";
import Product from "./Product.jsx";

export default function App() {
  return (
    <Router>
      <RdNavbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/ser" element={<Service />} /> */}
        <Route path="/api" element={<API />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>
  );
}

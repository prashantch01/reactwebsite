import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./components/Home";
import Details from "./components/Details";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  const { search, pathname } = useLocation();
  console.log(pathname, search);
  return (
    <div className="h-screen w-screen  flex">
      {(pathname != "/" || search.length > 0) && (
        <Link
          className="px-3 py-1 rounded-md text-sky-300 font-semibold border border-sky-300 absolute left-[17%] top-[4.5%]"
          to="/"
        >
          Home
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create/>} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit/>} />
      </Routes>
    </div>
  );
}

export default App;

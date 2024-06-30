import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

export const Nav = () => {
  const [products] = useContext(ProductContext);

  let distint_element =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);

  distint_element = [...new Set(distint_element)];
  // console.log(distint_element);

  const color = ()=>{
    return `rgba(${(Math.random()*255).toFixed()} , ${(Math.random()*255).toFixed()} , ${(Math.random()*255).toFixed()} , 0.4 )`
  }

 

  return (
    <>
      <nav className="w-[15%] h-screen bg-red-100 flex flex-col items-center pt-5 ">
        <a
          className="px-5 py-3 border rounded-md border-blue-400 text-blue-400"
          href="/create"
        >
          Add new product
        </a>
        <hr className="w-[80%] my-3" />
        <h1 className="text-2xl mb-3 w-[80%]">Categorry</h1>

        <div className="w-[80%]   ">
          {distint_element.map((c, i) => 
       
            <Link key={i} to={`/?category=${c}`} className=" mb-3 flex items-center mb-3">
              <span style={{backgroundColor:color()} } className="rounded-full mr-2 w-[15px] h-[15px] "></span>{" "}
              {c}
            </Link>
            
          )}
        </div>
      </nav>
    </>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { Nav } from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { Loading } from "./Loading";
import axios from "../utils/axiox";

export const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);
  //  console.log(category)

  const [filterproducts, setfilterproducts] = useState(null);

  const getproductcategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilterproducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filterproducts || category == "undefined") setfilterproducts(products);
    if (category != "undefined") 
        {
            
            // getproductcategory();
            setfilterproducts(products.filter((p)=>p.category == category))
        
        }
  }, [category, products]);

  // console.log(filterproducts);

  return products ? (
    <>
      <Nav />

      <div className="h-screen w-[85%] p-10 pt-[5%]  flex flex-wrap gap-10 overflow-x-hidden overflow-y-auto">
        {filterproducts &&
          filterproducts.map((p, i) => (
            <Link
              key={p.id}
              to={`/details/${p.id}`}
              className="border  shadow rounded  card p-5 w-[18%] h-[35vh] flex flex-col justify-center items-center"
            >
              <div
                className="w-full h-[80%] bg-contain bg-no-repeat bg-center hover:scale-110 mb-5"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <h1 className="hover:text-blue-300"> {p.title} </h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading />
  );
};

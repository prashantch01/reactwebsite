import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const [products, setproducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const {id} = useParams();
  const [product , setproduct] = useState({
    title:"",
    image : "",
    price : "",
    category:"",
    description:"",
  })
  
  const ChangeHandler = (e)=>{
    // console.log(e.target.name , e.target.value)
    setproduct({...product , [e.target.name]: e.target.value})
  }
  useEffect(()=>{

    setproduct(products.filter((p)=>p.id == id)[0])
  } , [id])


//   console.log(product)
  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 5
    ) {
      alert("Each and every product must have atleast 4 characters");
      return;
    }

  
    const pi = products.findIndex((p)=>p.id==id)
    const copydata = [...products]
    copydata[pi] = {...products[pi],...product}

  
    setproducts(copydata)
    localStorage.setItem("products", JSON.stringify(copydata));
    navigate(-1);
  };

  return (
    <div>
      <form
        onSubmit={AddProductHandler}
        action=""
        className="flex flex-col items-center p-[5%] w-screen h-screen"
      >
        <h1 className="text-3xl mb-3 outline-none font-semibold w-1/2">
          Edit Product
        </h1>
        <input
          type="url"
          placeholder="image"
          className="bg-zinc-100 text-1xl font-semibold text-red-900 rounded-md outline-none w-1/2  p-3 mb-3"
          name="image"
          onChange={ChangeHandler}
          value={ product &&  product.image}
        />
        <input
          type="text"
          placeholder="title"
          className="bg-zinc-100 text-1xl font-semibold text-red-900 rounded-md  w-1/2 outline-none p-3 mb-3"
          name="title"
          onChange={ChangeHandler}
          value={product &&  product.title}
        />

        <div className="w-1/2">
          <input
            type="text"
            placeholder="category"
            className="bg-zinc-100 text-1xl font-semibold text-red-900 rounded-md  w-1/2  p-3 mb-3 outline-none mr-3"
            name="category"
            onChange={ChangeHandler}
            value={product &&  product.category}
          />
          <input
            type="number"
            placeholder="price"
            className="bg-zinc-100 text-1xl font-semibold text-red-900 rounded-md  w-[21.65vw] outline-none p-3 mb-3"
            name="price"
            onChange={ChangeHandler}
            value={product &&  product.price}
          />
        </div>

        <textarea
          type="text"
          placeholder="enter product description here.."
          className="bg-zinc-100 text-1xl font-semibold text-red-900 rounded-md outline-none w-1/2  p-3 mb-3"
          name="description"
          onChange={ChangeHandler}
          value={product &&  product.description}
          rows="10"
        />

        <div className="w-1/2">
          <button className="px-3 py-1 border rounded-md border-blue-400 text-blue-400">
            Let's edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;

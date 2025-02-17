import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
    const navigate = useNavigate()
  const [products, setproducts] = useContext(ProductContext);
  const [title, setTitle] = useState("");
  const [image, setimage] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      price.trim().length < 1 ||
      description.trim().length < 5
    ) {
      alert("Each and every product must have atleast 4 characters");
      return;
    }

    const product = {
      id: nanoid(),
      title,
      image,
      description,
      category,
      price,
    };
    setproducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products , product]));
    toast.success("Product added !!")
    navigate("/");
  };

  return (
    <div>
      <form
        onSubmit={AddProductHandler}
        action=""
        className="flex flex-col items-center p-[5%] w-screen h-screen"
      >
        <h1 className="text-3xl mb-3 outline-none font-semibold w-1/2">
          Add New Product
        </h1>
        <input
          type="url"
          placeholder="image"
          className="bg-zinc-100 text-1xl font-semibold text-red-900 rounded-md outline-none w-1/2  p-3 mb-3"
          onChange={(e) => setimage(e.target.value)}
          value={image}
        />
        <input
          type="text"
          placeholder="title"
          className="bg-zinc-100 text-1xl font-semibold text-red-900 rounded-md  w-1/2 outline-none p-3 mb-3"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <div className="w-1/2">
          <input
            type="text"
            placeholder="category"
            className="bg-zinc-100 text-1xl font-semibold text-red-900 rounded-md  w-1/2  p-3 mb-3 outline-none mr-3"
            onChange={(e) => setcategory(e.target.value)}
            value={category}
          />
          <input
            type="number"
            placeholder="price"
            className="bg-zinc-100 text-1xl font-semibold text-red-900 rounded-md  w-[21.65vw] outline-none p-3 mb-3"
            onChange={(e) => setprice(e.target.value)}
            value={price}
          />
        </div>

        <textarea
          type="text"
          placeholder="enter product description here.."
          className="bg-zinc-100 text-1xl font-semibold text-red-900 rounded-md outline-none w-1/2  p-3 mb-3"
          onChange={(e) => setdescription(e.target.value)}
          value={description}
          rows="10"
        />

        <div className="w-1/2">
          <button  className="px-3 py-1 border rounded-md border-blue-400 text-blue-400">
            Let's create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;

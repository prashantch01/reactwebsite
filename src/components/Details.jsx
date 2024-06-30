import axios from '../utils/axiox';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProductContext } from '../utils/Context';
import { Loading } from './Loading';

const Details = () => {

  const navigate = useNavigate()

const[products , setproducts] = useContext(ProductContext);

  const [product , setproduct] = useState(null);

  const {id} = useParams();
  // console.log(id);
 


  // const getsingleproduct = async()=>{
  //   try {
  //     const {data} = await axios.get(`/products/${id}`)
  //     setproduct(data);
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(()=>{
   if(!product)
    {
      setproduct(products.filter((p)=>p.id == id)[0])
    }
  },[])

  
  const ProductDeleteHandler =  (id) => {

    const FilterProducts = products.filter((p)=>p.id !== id)
    setproducts(FilterProducts)
    localStorage.setItem('products', JSON.stringify(FilterProducts))
    navigate("/");

  }


  return product ?  (
    <div  className='w-[70%]  h-full m-auto py-[10%] px-[5%] flex items-center  justify-center'>

    
      
          <img className='w-[50%] h-[80%] object-contain' src={`${product.image}`}  alt="" />

          <div className="content  w-[50%]  ">
            <h2 className='text-3xl font-bold ' >{product.title}</h2>
            <h3 className='text-zinc-400 font-semibold'>{product.category}</h3>
            <h2 className='text-red-500 font-semibold mt-3'>$ {product.price}</h2>
            <p className='mb-10 mt-3'> {product.description} </p>
            <Link to={`/edit/${product.id}`} className='me-5 border border-blue-500 rounded-md px-5 py-2 text-blue-500 text-sm'>Edit</Link>
            <button onClick={()=>ProductDeleteHandler(product.id)} className='border border-red-500 rounded-md px-5 py-2 text-red-500 text-sm'>Delete</button>
           
          </div>

          


      

    
    </div>
  ) : (<Loading/>)
}

export default Details
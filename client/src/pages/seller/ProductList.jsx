import React from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const {products, currency, axios, fetchProducts} = useAppContext()

    const navigate = useNavigate()

    const toggleStock = async (id, inStock)=>{
        try {
            const { data } = await axios.post('/api/product/stock', {id, inStock});
            if (data.success){
                fetchProducts();
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
        <div className="w-full md:p-10 p-4">
            <h2 className="pb-4 text-lg font-medium">All Products</h2>

            <div className="flex flex-col items-center max-w-4xl w-full overflow-x-auto rounded-md bg-white border border-gray-500/20">

                <table className="md:table-auto table-fixed w-full">
                    <thead className="text-gray-900 text-sm text-left">
                        <tr>
                            <th className="px-4 py-3 font-semibold">Product</th>
                            <th className="px-4 py-3 font-semibold">Category</th>
                            <th className="px-4 py-3 font-semibold hidden md:table-cell">Selling Price</th>
                            <th className="px-4 py-3 font-semibold">In Stock</th>
                            <th className="px-4 py-3 font-semibold hidden md:table-cell">Edit</th>
                        </tr>
                    </thead>

                    <tbody className="text-sm text-gray-500">
                        {products.map((product) => (
                            <tr key={product._id} className="border-t border-gray-500/20">

                                {/* Product */}
                                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                                    <div className="border border-gray-300 rounded p-2">
                                        <img src={product.image[0]} alt="Product" className="w-16" />
                                    </div>

                                    <div className="flex flex-col w-full">
                                        <span className="truncate">{product.name}</span>

                                        {/* Mobile Edit Button */}
                                        <button
                                            onClick={() => navigate(`/seller/edit/${product._id}`)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded mt-1 w-fit md:hidden"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="px-4 py-3">{product.category}</td>

                                {/* Price */}
                                <td className="px-4 py-3 hidden md:table-cell">
                                    {currency}{product.offerPrice}
                                </td>

                                {/* Stock Toggle */}
                                <td className="px-4 py-3">
                                    <label className="relative inline-flex items-center cursor-pointer gap-3">
                                        <input
                                            onClick={()=> toggleStock(product._id, !product.inStock)}
                                            checked={product.inStock}
                                            type="checkbox"
                                            className="sr-only peer"
                                        />
                                        <div className="w-12 h-7 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition"></div>
                                        <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-5"></span>
                                    </label>
                                </td>

                                {/* Desktop Edit Button */}
                                <td className="px-4 py-3 hidden md:table-cell">
                                    <button
                                        onClick={() => navigate(`/seller/edit/${product._id}`)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    </div>
  )
}

export default ProductList
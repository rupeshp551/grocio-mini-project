import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const EditProduct = () => {

    const { id } = useParams()
    const { axios, fetchProducts } = useAppContext() 
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')

    // Fetch product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/product/${id}`)
                if (data.success) {
                    const p = data.product
                    setProduct(p)
                    setName(p.name)
                    setDescription(p.description.join('\n'))
                    setPrice(p.price)
                    setOfferPrice(p.offerPrice)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        fetchProduct()
    }, [id])

    // Update product
    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault()

            const productData = {
                id: product._id,
                name,
                description: description.split('\n'),
                price,
                offerPrice
            }

            const formData = new FormData()
            formData.append('productData', JSON.stringify(productData))

            const { data } = await axios.post('/api/product/update', formData)

            if (data.success){
                toast.success(data.message)
                await fetchProducts()
                setTimeout(() => {
                  navigate('/seller/product-list')
                }, 500);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    if (!product) return <p>Loading...</p>

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">

                {/* Product Name */}
                <div className="flex flex-col gap-1">
                    <label className="text-base font-medium">Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        className="outline-none px-3 py-2 border border-gray-400 rounded"
                        required
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1">
                    <label className="text-base font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        rows={4}
                        className="outline-none px-3 py-2 border border-gray-400 rounded"
                    />
                </div>

                {/* Prices */}
                <div className="flex gap-5 flex-wrap">
                    <div className="flex flex-col">
                        <label className="text-base font-medium">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e)=> setPrice(e.target.value)}
                            className="border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-base font-medium">Offer Price</label>
                        <input
                            type="number"
                            value={offerPrice}
                            onChange={(e)=> setOfferPrice(e.target.value)}
                            className="border px-3 py-2 rounded"
                            required
                        />
                    </div>
                </div>

                <button className="px-6 py-2 bg-blue-500 text-white rounded">
                    Update Product
                </button>

            </form>
        </div>
    )
}

export default EditProduct
import axios from "axios"
import { useState, useEffect } from "react"
import { API_URL } from "../utils/GlobalVar"
import CardProduct from "../components/CardProduct"
import swal from "sweetalert"
import SkeletonLoading from "../components/SkeletonLoading"

const MainLayout = ({onKeranjangUpdate}) => {
    const [products, setProducts] = useState(null)
    const [categories, setCategories] = useState(null)
    const [categoryShow, setCategoryShow] = useState("")

    const getProducts = () => {
        axios.get(`${API_URL}/products${categoryShow}`)
        .then(res=>{
            const products = res.data
            setProducts(products)
            console.log(products)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const getCategories = () => {
        axios.get(`${API_URL}/categories`)
        .then(res=>{
            const categories = res.data
            setCategories(categories)
            console.log(categories)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    useEffect(() => {
        getProducts()
        getCategories()
    }, [categoryShow])

    const handleMasukKeranjang = (e) => {

        // cek apakah ada menu yang sama dalam keranjang
        axios.get(`${API_URL}/keranjangs?product.id=${e.id}`)
        .then(res=>{
            if(res.data.length === 0 ){
                // jika tidak ada menu dalam keranjang, tambahkan menu baru
                const dataKeranjang = {
                    total_pesanan : 1,
                    total_harga : e.harga,
                    product : e
                }
        
                axios.post(`${API_URL}/keranjangs`,dataKeranjang)
                .then((res) => {
                    swal({
                        title: `Sukses menambahkan ${e.nama} ke Dalam Keranjang`,
                        icon: "success",
                        button: true
                    })
                    onKeranjangUpdate()
                })
            } else {
                // jika ada menu yang sama dalam keranjang, update menu yang ada dalam keranjang
                const dataKeranjang = {
                    total_pesanan : res.data[0].total_pesanan + 1,
                    total_harga : res.data[0].total_harga + e.harga,
                    product : e
                }

                axios.put(`${API_URL}/keranjangs/${res.data[0].id}`,dataKeranjang)
                .then((res) => {
                    swal({
                        title: `Sukses menambahkan ${e.nama} ke Dalam Keranjang`,
                        icon: "success",
                        button: true
                    })
                    onKeranjangUpdate()
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
        
    }

    return(
        <div className="px-10 py-[90px] flex w-full justify-between">
            <div id="daftar-kategori" className="w-[20%]  ">
                <span className="font-fredoka text-center block text-2xl">Kategori</span>
                <ul>
                    {categories ? categories.map((e) => (
                        <li key={e.id} className="py-2 underline list-disc"><span className="hover:cursor-pointer" onClick={() => {setCategoryShow(`?category.nama=${e.nama}`)}}>{e.nama}</span></li>
                    )) : "loading"}
                    <li className="py-2 underline list-disc"><span className="hover:cursor-pointer" onClick={() => {setCategoryShow("")}}>Semua Menu</span></li>
                </ul>
            </div>
            <div id="" className="w-[60%] ">
                <span className="font-fredoka text-center block text-2xl">Daftar Produk</span>
                <div className="flex gap-4 flex-wrap justify-center py-10">
                    {products ? products.map((e)=>(
                        <CardProduct masukKeranjang={()=>handleMasukKeranjang(e)} key={e.kode} productName={e.nama} productPrice={e.harga} image={`/assets/images/${e.category.nama.toLowerCase()}/${e.gambar}`} productDetail={e.detail}/>
                    )) : (
                        <div>
                            <SkeletonLoading/>
                            <SkeletonLoading/>
                            <SkeletonLoading/>
                            <SkeletonLoading/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MainLayout
import { useEffect, useState } from "react"
import { API_URL } from "../utils/GlobalVar"
import axios from "axios"
import swal from "sweetalert"

const KeranjangBelanja = ({statusKeranjang}) => {
    const [isiKeranjang, setIsiKeranjang] = useState(null)
    const [keranjangUpdated, setKeranjangUpdated] = useState(false);

    const handleKeranjangUpdate = () => {
        setKeranjangUpdated(!keranjangUpdated);
    };

    const getIsiKeranjang = () => {
        axios.get(`${API_URL}/keranjangs`)
        .then((res) => {
            setIsiKeranjang(res.data)
        })
    }

    const handleHapusPesanan = (e) => {
        if (window.confirm(`Apakah anda yakin ingin menghapus pesanan menu ${e.product.nama} ini? Anda bisa menambahkannya lagi nanti`)) {
            axios.delete(`${API_URL}/keranjangs/${e.id}`)
            .then((res)=>{
                swal({
                    title: `Berhasil menghapus pesanan`,
                    icon: "error",
                    button: true
                })
                handleKeranjangUpdate()
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    useEffect(()=>{
        getIsiKeranjang()
    }, [statusKeranjang, keranjangUpdated])

    return(
        <div className="fixed w-[50%] md:w-[35%] bg-gray-400 h-[50vh] overflow-y-auto top-[110px] right-[40px] z-[9999] rounded-lg shadow-2xl">
            <span className="p-4 block font-oswald">Keranjang anda</span>
            <div>
                {isiKeranjang ? isiKeranjang.map((e) => (
                    <div className="px-4 py-2 m-2 font-pt-sans border-2">
                        Menu Pesanan : {e.product.nama} <br/>
                        Total : {e.total_pesanan} <br/>
                        Total Harga : {e.total_harga} <br/>
                        <button onClick={() => handleHapusPesanan(e)} className="bg-red-600 text-white py-2 px-4 my-1 rounded-md" >Hapus Pesanan</button>
                    </div>
                )) : "loading"}
            </div>
        </div>
    )
}

export default KeranjangBelanja
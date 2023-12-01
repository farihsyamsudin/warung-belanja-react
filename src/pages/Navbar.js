import './Navbar.css'
import { KeranjangSVG } from '../svg/SVG'
import { useState } from 'react'
import KeranjangBelanja from '../components/KeranjangBelanja'

const Navbar = ({statusKeranjang}) => {
    const [showKeranjang, setShowKeranjang] = useState(false)

    const handleShowKeranjang = () => {
        setShowKeranjang(!showKeranjang);
    }

    return (
        <div>
            <nav className="w-full py-4 background-nav flex fixed justify-between items-center px-6 z-[999]">
                <div className='font-oswald'>
                    <span className='text-2xl'>Kasir App</span>
                </div>
                <div>
                    <span onClick={handleShowKeranjang} className='hover:cursor-pointer'>
                        <KeranjangSVG width="40px" height="40px"/>
                    </span>
                </div>
            </nav>
            {showKeranjang && <KeranjangBelanja statusKeranjang={statusKeranjang} />}
        </div>
    )
}

export default Navbar
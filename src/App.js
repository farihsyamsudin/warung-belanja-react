import { useState } from "react";
import MainLayout from "./pages/MainLayout";
import Navbar from "./pages/Navbar";

function App() {
  const [keranjangUpdated, setKeranjangUpdated] = useState(false);

  const handleKeranjangUpdate = () => {
    setKeranjangUpdated(!keranjangUpdated);
  };

  return (
    <div className="margin-0">
      <Navbar statusKeranjang={keranjangUpdated}/>
      <MainLayout onKeranjangUpdate={handleKeranjangUpdate}/>
    </div>
  );
}

export default App;

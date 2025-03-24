import React from "react";
import UploadImage from "./components/Upload";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center px-4" style={{backgroundImage: "url('/images/backgroundblur.jpg')", backgroundSize: "cover", backgroundPosition: "center",}}>
      <h1 className="text-3xl font-bold text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,1)] mb-12">
        เริ่มต้นการจำแนกประเภทการใช้ประโยชน์ที่ดินของคุณ
      </h1>
      <div className="mx-auto">
        <UploadImage />
      </div>
    </div>
  );
}

export default App;

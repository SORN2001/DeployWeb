import React from "react";
import UploadImage from "./components/Upload";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center px-4" style={{backgroundImage: "url('/images/background.jpg')", backgroundSize: "cover", backgroundPosition: "center",}}>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        เริ่มต้นการจำแนกประเภทการใช้ประโยชน์ที่ดินของคุณ
      </h1>
      <div className="mx-auto">
        <UploadImage />
      </div>
    </div>
  );
}

export default App;

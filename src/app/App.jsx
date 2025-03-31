import React, { useState } from "react";
import UploadImage from "./components/Upload";

function App() {
  const [showManual, setShowManual] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-2">
          <img src="/images/signal-satellite.png" alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-bold">จำแนกประเภทการใช้ประโยชน์ที่ดิน ตำบลสายตะกู</span>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowManual(true)}
            className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            คู่มือการใช้งาน
          </button>
          <button
            onClick={() => setShowAbout(true)}
            className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            About Me
          </button>
        </div>
      </nav>

      {/* Modal for คู่มือการใช้งาน */}
      {showManual && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl max-w-md w-full text-center">
            <h2 className="text-lg font-bold mb-4">คู่มือการใช้งาน</h2>
            <p>เนื้อหาคู่มือการใช้งาน</p>
            <button
              onClick={() => setShowManual(false)}
              className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              ปิด
            </button>
          </div>
        </div>
      )}

      {/* Modal for About Me */}
      {showAbout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl max-w-md w-full text-center">
            <h2 className="text-lg font-bold mb-4">About Me</h2>
            <p>เนื้อหาเกี่ยวกับฉัน</p>
            <button
              onClick={() => setShowAbout(false)}
              className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              ปิด
            </button>
          </div>
        </div>
      )}

      <div
        className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center px-4"
        style={{
          backgroundImage: "url('/images/backgroundblur.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <h1 className="text-4xl font-bold text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,1)] mb-12">
          เริ่มต้นการจำแนกประเภทการใช้ประโยชน์ที่ดินของคุณ
        </h1> */}
        <div className="mx-auto">
          <UploadImage />
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [percentages, setPercentages] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setShowPopup(true);
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
        setPercentages(data.percentages);
      } else {
        console.error("Error from server:", response.statusText);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ:", error);
    } finally {
      setIsLoading(false);
      setShowPopup(true);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          อัปโหลดภาพเพื่อจำแนก
        </h1>
        <p className="text-gray-600 mb-4">
          กรุณาเลือกรูปภาพถ่ายดาวเทียม Sentinel-2 เพื่อใช้สำหรับการจำแนกประเภทการใช้ประโยชน์ที่ดิน
        </p>
        <div className="mb-4">
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white cursor-pointer focus:outline-none"
          />
        </div>

        {preview && (
          <div className="mb-4">
            <p className="text-gray-600 mb-2">ภาพที่คุณเลือก</p>
            <img
              src={preview}
              alt="Preview"
              className="w-64 h-64 object-contain border border-gray-300 rounded-lg"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          className={`w-full ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold py-2 px-4 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400 mb-1`}
          disabled={isLoading}
        >
          {isLoading ? "กำลังประมวลผล..." : "กดเพื่อจำแนก"}
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
            {result ? (
              <>
                <p className="text-gray-800 text-lg font-semibold mb-4">
                  ผลการจำแนกประเภท = <span className="text-green-600">{result}</span>
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  <strong>ความน่าจะเป็น</strong>
                  <div className="mt-3">
                    <span className="flex justify-between pl-8 pr-8 mt-1"><strong>F - ป่าไม้ :</strong> {percentages["F"] || "-"}</span>
                    <span className="flex justify-between pl-8 pr-8 mt-1"><strong>P - สวนยาง :</strong> {percentages["P"] || "-"}</span>
                    <span className="flex justify-between pl-8 pr-8 mt-1"><strong>R - นาข้าว :</strong> {percentages["R"] || "-"}</span>
                    <span className="flex justify-between pl-8 pr-8 mt-1"><strong>U - ที่อยู่อาศัย :</strong> {percentages["U"] || "-"}</span>
                    <span className="flex justify-between pl-8 pr-8 mt-1"><strong>W - แหล่งน้ำ :</strong> {percentages["W"] || "-"}</span>
                  </div>
                </p>
                {preview && (
                  <div className="mb-4">
                    <p className="text-gray-600 mb-2">ภาพที่คุณอัปโหลด</p>
                    <img
                      src={preview}
                      alt="Uploaded Preview"
                      className="w-64 h-64 object-contain border border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-800 text-lg font-semibold mb-4">
                กรุณาเลือกภาพถ่ายดาวเทียมก่อนทำการกดจำแนก !!!
              </p>
            )}
            <button
              onClick={refreshPage}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
            >
              ตกลง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadImage;

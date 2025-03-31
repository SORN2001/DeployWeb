import React, { useState } from "react";

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("ภาพถ่ายดาวเทียม");
  const [result, setResult] = useState("");
  const [percentages, setPercentages] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setFileName(file.name);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      alert("กรุณาอัปโหลดเฉพาะไฟล์รูปภาพเท่านั้น");
      setSelectedFile(null);
      setPreview(null);
      setFileName("ภาพถ่ายดาวเทียม");
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
    <div className="flex items-center justify-center">
      <div className="shadow-lg rounded-xl p-8 max-w-xl w-full text-center text-white bg-gray-800">
        <h1 className="text-3xl font-bold mb-4">อัปโหลดภาพถ่ายดาวเทียม</h1>
        <p className="mb-4">
          เลือกภาพถ่ายดาวเทียมเพื่อใช้สำหรับการจำแนกประเภทการใช้ประโยชน์ที่ดิน
        </p>
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <label
            htmlFor="fileInput"
            className="flex items-center justify-between bg-gray-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-500"
          >
            <span className="flex items-center gap-3">
              <img
                src="/images/files.png"
                alt="icon"
                className="w-6 h-6 opacity-75"
              />
              {fileName}
            </span>
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {preview && (
          <div className="mb-4 flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-64 h-64 object-contain border border-gray-500 rounded-lg"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          className={`w-full py-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 mb-1
          ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={isLoading}
        >
          {isLoading ? "กำลังประมวลผล..." : "จำแนก"}
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-xs text-center">
            {result ? (
              <>
                <p className="text-white text-lg font-semibold mb-4">
                  ผลการจำแนกประเภท = <span className="text-green-400">{result}</span>
                </p>
                <p className="text-sm text-gray-300 mb-4">
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
                    <p className="text-gray-300 mb-2">ภาพที่คุณอัปโหลด</p>
                    <img
                      src={preview}
                      alt="Uploaded Preview"
                      className="w-64 h-64 object-contain border border-gray-500 rounded-lg"
                    />
                  </div>
                )}
              </>
            ) : (
              <p className="text-white text-lg font-semibold mb-4">
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

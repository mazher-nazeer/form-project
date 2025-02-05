"use client";
import { useState, useEffect } from "react";
import QRCode from "qrcode";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    gender: "",
    dob: "",
    contact: "",
    cnic: "",
    nationality: "",
    passport: "",
    batchNumber: "",
    image: null,
  });

  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique 10-character alphanumeric key
    const randomKey = Math.random().toString(36).substring(2, 12).toUpperCase();
    setGeneratedKey(randomKey);

    // Construct the QR Code URL
    const qrUrl = `http://localhost:3000/vaccine-card?card=${randomKey}`;

    // Save form data to localStorage
    localStorage.setItem(randomKey, JSON.stringify(formData));

    // Generate QR code as an image
    QRCode.toDataURL(qrUrl)
      .then((url) => {
        setQrCodeUrl(url);
      })
      .catch((err) => console.error("QR Code Error:", err));

    console.log("Form Data:", formData);
    console.log("QR Code URL:", qrUrl);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input name="fatherName" placeholder="S/O" className="w-full p-2 border rounded" onChange={handleChange} required />
        <select name="gender" className="w-full p-2 border rounded" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="date" name="dob" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input name="contact" placeholder="Contact No." className="w-full p-2 border rounded" onChange={handleChange} required />
        <input name="cnic" placeholder="C.N.I.C. #" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input name="nationality" placeholder="Nationality" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input name="passport" placeholder="Passport #" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input name="batchNumber" placeholder="Batch Number" className="w-full p-2 border rounded" onChange={handleChange} required />

        {/* Image Upload */}
        <input type="file" accept="image/*" className="w-full p-2 border rounded" onChange={handleImageUpload} />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>

      {/* Show QR Code after submission */}
      {qrCodeUrl && (
        <div className="text-center mt-4">
          <p className="font-bold">Scan this QR Code:</p>
          <img src={qrCodeUrl} alt="QR Code" className="mx-auto w-40 h-40" />
        </div>
      )}
    </div>
  );
};

export default Home;

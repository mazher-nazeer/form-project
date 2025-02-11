"use client";
import { useState, useEffect } from "react";
import QRCode from "qrcode";
import Link from "next/link";

const Home = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    hospitalAddress: "",
    hospitalContact: "",
    mrNo: "",
    physicianName: "",
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
    printedOn: "",
    vaccinationDate: "",
    validityDate: "",
    vaccinename: "",
    vaccineManufacturer: "",
    status: "",
    vaccineValidity: "",
  });

  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxWidth = 200;
        const maxHeight = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/webp", 0.5);

        localStorage.setItem(
          type === "hospital" ? "hospitalImage" : "compressedImage",
          compressedDataUrl
        );

        setFormData((prev) => ({
          ...prev,
          [type === "hospital" ? "hospitalImage" : "image"]: compressedDataUrl,
        }));
      };
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique 10-character alphanumeric key
    const randomKey = Math.random().toString(36).substring(2, 12).toUpperCase();
    setGeneratedKey(randomKey);

    // Get all keys from localStorage
    const storedKeys = Object.keys(localStorage);

    // If more than one key exists, remove the oldest one
    if (storedKeys.length >= 1) {
      localStorage.removeItem(storedKeys[0]);
    }

    // Construct the QR Code URL
    const qrUrl = `https://form-project-red.vercel.app/vaccine-card?card=${randomKey}`;
    // const qrUrl = `http://localhost:3000/vaccine-card?card=${randomKey}`;
    setRedirectUrl(qrUrl);

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
        {/* Hospital Details */}
        <div>
          <p>Hosp name</p>
          <input
            type="text"
            name="hospitalName"
            placeholder="Hospital Name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Hosp address</p>
          <input
            type="text"
            name="hospitalAddress"
            placeholder="Hospital Address"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>hospitalContact</p>
          <input
            type="text"
            name="hospitalContact"
            placeholder="Hospital Contact"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Mr No</p>
          <input
            name="mrNo"
            placeholder="MR no"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        {/* Patient Details */}
        <div>
          <p>Name</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Father name</p>
          <input
            type="text"
            name="fatherName"
            placeholder="S/O"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>gander</p>
          <select
            name="gender"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <p>Date of birth</p>
          <input
            type="date"
            name="dob"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Contact #</p>
          <input
            type="text"
            name="contact"
            placeholder="Contact No."
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>CNIC</p>
          <input
            type="number"
            name="cnic"
            placeholder="C.N.I.C. #"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Nationality</p>
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Passport</p>

          <input
            type="text"
            name="passport"
            placeholder="Passport #"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Batch Number</p>
          <input
            type="text"
            name="batchNumber"
            placeholder="Batch Number"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <p>vaccination Date</p>
          <input
            type="date"
            name="vaccinationDate"
            placeholder="Vaccination Date"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>validityDate</p>
          <input
            type="date"
            name="validityDate"
            placeholder="Validity Date"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>printed On Date</p>
          <input
            type="datetime-local"
            name="printedOn"
            placeholder="Validity Date"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        {/* Vaccination Details */}

        {/* Physician Details */}
        <div>
          <p>Physician Name</p>
          <input
            type="text"
            name="physicianName"
            placeholder="Physician Name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <p>Vaccine Name</p>
          <input
            type="text"
            name="vaccinename"
            placeholder="Vaccine name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Manufacturer name</p>
          <input
            type="text"
            name=" vaccineManufacturer"
            placeholder="Manufacturer name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <p>Validity in Years</p>
          <input
            type="text"
            name="vaccineValidity"
            placeholder="50 saal tk valid kerdo maa ki aankh..."
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>
      
        <div>
          <p>Status</p>
          <input
            type="text"
            name=" vaccineManufacturer"
            placeholder="Vaccinated"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        {/* Hospital Image Upload */}
        <div>
          <p>Hospital Image</p>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={(e) => handleImageUpload(e, "hospital")}
          />
        </div>

        {/* Patient Image Upload */}
        <div>
          <p>Patient Image</p>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={(e) => handleImageUpload(e, "patient")}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>

      <div className="mt-6">
        <Link
          href={redirectUrl}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          View Form
        </Link>
      </div>

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

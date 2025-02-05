"use client";
import React, { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const VaccineCard = () => {
  
  const searchParams = useSearchParams();
  const card = searchParams.get("card");
  const [data, setData] = useState(null);
  const cardRef = useRef(null); // 🔹 Reference to the card for PDF generation

  useEffect(() => {
    if (card) {
      const storedData = localStorage.getItem(card);
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, [card]);

  if (!data) {
    return <p className="text-center mt-10 text-red-500">Invalid QR Code or No Data Found!</p>;
  }

  // 🔹 Function to generate PDF
  const downloadPDF = async () => {
    const input = cardRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`Vaccine_Certificate_${card}.pdf`);
  };

  return (
    <div className="overflow-auto p-4 bg-white print:p-0">
      <div ref={cardRef} className="min-w-[800px] space-y-6">
        {/* Your prefilled card content goes here */}
        <header className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center justify-center">
            <img src="https://via.placeholder.com/100x50" alt="Logo" className="w-32 mx-auto" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-xl font-bold">Uni Care Medical Lab (UCML)</h1>
            <div className="text-sm text-gray-600">
              <p className="flex items-center justify-center gap-2">
                📍 Suit No. 2, Javed Arcade, SB 1 KHI, Block 17 Gulistan-e-Johar, Karachi
              </p>
              <div className="flex items-center justify-center gap-4 mt-1">
                <span>📞 0301-9243782</span>
                <span>📧 info@ucml.pk</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/vaccine-card?card=${card}`}
              alt="QR Code"
              className="w-28 h-28 mx-auto"
            />
          </div>
        </header>

        {/* Patient Info Section */}
        <div className="grid grid-cols-3 gap-4 text-sm mb-6">
          <div>
            <span className="font-semibold">M.R.#</span> {card}
          </div>
          <div>
            <span className="font-semibold">Vaccination Date:</span> 23-Jan-2025
          </div>
          <div>
            <span className="font-semibold">Validity Date:</span> 23-Jan-2030
          </div>
        </div>

        {/* Patient Details */}
        <div className="grid grid-cols-12 gap-4 mb-6">
          <div className="col-span-10">
            <h4 className="text-lg font-semibold mb-3">Patient Details</h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="font-semibold">Name:</span> {data.name}
              </div>
              <div>
                <span className="font-semibold">S/O:</span> {data.fatherName}
              </div>
              <div>
                <span className="font-semibold">Gender:</span> {data.gender}
              </div>
              <div>
                <span className="font-semibold">Date of Birth:</span> {data.dob}
              </div>
              <div>
                <span className="font-semibold">Contact No.:</span> {data.contact}
              </div>
              <div>
                <span className="font-semibold">C.N.I.C. #:</span> {data.cnic}
              </div>
              <div>
                <span className="font-semibold">Nationality:</span> {data.nationality}
              </div>
              <div>
                <span className="font-semibold">Passport #:</span> {data.passport}
              </div>
              <div>
                <span className="font-semibold">Batch Number:</span> {data.batchNumber}
              </div>
            </div>
          </div>

          {/* Patient Image */}
          <div className="col-span-2 flex justify-center">
            {data.image ? (
              <img src={data.image} alt="Patient" className="w-24 h-24 rounded border" />
            ) : (
              <img src="https://via.placeholder.com/100x120" alt="Patient" className="w-24 h-24 rounded" />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="space-y-6 text-center">
          <h4 className="font-bold text-red-600">
            This report is digitally verified and does not require any Signature
          </h4>
          <p className="text-xs text-gray-600">
            For verification, scan the QR code or visit{" "}
            <a href="https://www.ucml.pk/" className="text-blue-500 underline">
              ucml.pk
            </a>{" "}
            and enter MRN/CNIC.
          </p>
          <div className="text-xs text-gray-500">
            Printed Date & Time: {new Date().toLocaleString()}
          </div>
        </footer>
      </div>

      {/* 🔹 Download PDF Button */}
      <div className="text-center mt-6">
        <button
          onClick={downloadPDF}
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default function VaccineCertificateWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VaccineCertificate />
    </Suspense>
  );
}
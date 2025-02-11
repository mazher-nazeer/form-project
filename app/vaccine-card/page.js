"use client";
import React, { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import signature from "../../public/images/signature2.png";
import qrCode from "../../public/images/qr-code.jpeg";
import Image from "next/image";
import "../globals.css";

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
    return (
      <p className="text-center mt-10 text-red-500">
        Invalid QR Code or No Data Found!
      </p>
    );
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
    <div className="overflow-auto px-8 py-24 print:px-2 print:py-4  print-main-section bg-white  ">
      <div
        ref={cardRef}
        className="min-w-[800px] print:w-full print:min-w-full space-y-6 print:space-y-1 print:p-4 p-5 border border-[#cdcdcd]"
      >
        {/* Your prefilled card content goes here */}
        <header className="flex items-center  gap-4 mb-6 w-full justify-between px-3">
          {/* <div className="flex items-center justify-center">
          <Image src={hospLogo} alt="Logo" className="w-24 mx-auto print:w-20" />

        </div> */}
          <div className=" flex items-center justify-center">
            {data.hospitalImage ? (
              <Image
                src={data.hospitalImage}
                alt="Hospital Logo"
                width={0}
                height={0}
                className="w-24 mx-auto print:w-20"
              />
            ) : (
              <img
                src="https://via.placeholder.com/100x120"
                alt="Patient"
                className="w-24 mx-auto print:w-20"
              />
            )}
          </div>
          <div className="text-center space-y-2">
            <h1 className=" font-bold text-[38px] uppercase text-red-500 print:text-[22px]">
              {data.hospitalName}
            </h1>
            <div className="text-sm text-gray-600">
              <p className="flex items-center justify-center gap-2 text-base">
                📍 {data.hospitalAddress}
              </p>
              <div className="flex items-center justify-center gap-4 mt-1 text-base">
                <span>📞 {data.hospitalContact}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={qrCode}
              // src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://form-project-red.vercel.app/vaccine-card?card=${card}`}
              // // src={`https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:3000/vaccine-card?card=${card}`}
              // alt="QR Code"
              className="w-24 h-24 mx-auto print:w-14"
              width={0}
              height={0}
            />
          </div>
        </header>
        <div className="patient-details">
          {/* Patient Info Section */}
          <div className="flex items-center justify-center gap-4  my-6 print:my-2 text-base">
            <div>
              <span className="font-semibold">M.R.#</span> {data.mrNo}
            </div>
            <div>
              <span className="font-semibold">Vaccination Date:</span>
              {new Date(data.vaccinationDate).toLocaleDateString("en-GB")}
            </div>
            <div>
              <span className="font-semibold">Validity Date:</span>{" "}
              {new Date(data.validityDate).toLocaleDateString("en-GB")}
            </div>
          </div>

          {/* Patient Details */}
          <div className="flex items-center justify-center ">
            <h4 className="text-lg font-semibold mb-3">Patient Details</h4>
          </div>
          <div className="flex items-center  justify-between ">
            <div className="flex flex-col  text-sm  w-[70%] print:w-[84%] ">
              <div className="flex items-center gap-8 p-3 border-b-0 print:text-xs ">
                <div className="print:flex print:flex-col">
                  <span className="font-semibold">Name:</span> {data.name}
                </div>
                <div className="print:flex print:flex-col">
                  <span className="font-semibold">S/O:</span> {data.fatherName}
                </div>
                <div className="print:flex print:flex-col">
                  <span className="font-semibold">Gender:</span> {data.gender}
                </div>
                <div className="print:flex print:flex-col">
                  <span className="font-semibold">Date of Birth:</span>

                  {new Date(data.dob).toLocaleDateString("en-GB")}
                </div>
                <div className="print:flex print:flex-col">
                  <span className="font-semibold">Contact No.:</span>{" "}
                  {data.contact}
                </div>
              </div>

              <div className="flex items-center gap-8  p-3  print:text-xs">
                <div className="print:flex print:flex-col">
                  <span className="font-semibold">C.N.I.C. #:</span> {data.cnic}
                </div>
                <div className="print:flex print:flex-col">
                  <span className="font-semibold">Nationality:</span>{" "}
                  {data.nationality}
                </div>
                <div className="print:flex print:flex-col">
                  <span className="font-semibold">Passport #:</span>{" "}
                  {data.passport}
                </div>
                <div className="print:flex print:flex-col">
                  <span className="font-semibold">Batch Number:</span>{" "}
                  {data.batchNumber}
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              {data.image ? (
                <Image
                  src={data.image}
                  alt="Patient"
                  className="w-32 h-32 print:w-24 "
                  width={0}
                  height={0}
                />
              ) : (
                <Image
                  src="https://via.placeholder.com/100x120"
                  alt="Patient"
                  className="w-24 h-24 rounded"
                />
              )}
            </div>
          </div>

          {/* Vaccination Data */}
          <div className="mb-6 print:my-8 ">
            <h2 className="text-center text-xl font-bold border-b border-black py-2 mb-4 print:text-[26px]">
              VACCINATION CERTIFICATE
            </h2>
            <h4 className="text-center text-lg font-semibold mb-6">
              Meningococcal Quadrivalent Polysaccharide Conjugate Vaccine
            </h4>

            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-3 font-semibold print:p-2">Brand</td>
                  <td className="p-3 print:p-2"> {data.vaccinename}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-3 font-semibold print:p-2">Manufacturer</td>
                  <td className="p-3 print:p-2"> {data.vaccineManufacturer}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-3 print:p-2 font-semibold">Status</td>
                  <td className="p-3 print:p-2">{data.status}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold print:p-2">Remarks</td>
                  <td className="p-3 print:p-2">
                    This Vaccination is valid for 5 years.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="space-y-6 text-center">
          {/* <h4 className="font-bold text-red-600">
          This report is digitally verified and does not require any Signature
        </h4> */}

          <div className=" flex w-full items-center justify-between gap-4 pt-4 border-t border-gray-300 text-sm">
            <div className="text-xs text-gray-500">
              Printed Date & Time:{" "}
              {new Date(data.printedOn)
                .toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })
                .replace(/\//g, "-")}
            </div>
            <div className="relative ">
              <p className="font-semibold">{data.physicianName}</p>
              <p>M.B.B.S,RMP</p>
              <p>Microbiologist </p>
              <div className="flex items-center justify-end w-full mt-2 pr-1">
                <Image
                  src={signature}
                  width={0}
                  height={0}
                  className="w-36"
                  alt=""
                />
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* 🔹 Download PDF Button */}
      <div className="text-center mt-6">
        <button
          onClick={downloadPDF}
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 print:hidden"
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
      <VaccineCard />
    </Suspense>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const VaccineCertificate = () => {
  const searchParams = useSearchParams();
  const card = searchParams.get("card"); // Get the 'card' key from URL

  const [data, setData] = useState(null);

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

  return (
    <div className="overflow-auto p-4 bg-white print:p-0">
      <div className="min-w-[800px] space-y-6">
        {/* Header Section */}
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
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/vaccine-card?card=${card}`} 
                 alt="QR Code" className="w-28 h-28 mx-auto" />
          </div>
        </header>

        {/* Patient Info Section */}
        <div className="grid grid-cols-3 gap-4 text-sm mb-6">
          <div><span className="font-semibold">M.R.#</span> {card}</div>
          <div><span className="font-semibold">Vaccination Date:</span> 23-Jan-2025</div>
          <div><span className="font-semibold">Validity Date:</span> 23-Jan-2030</div>
        </div>

        {/* Patient Details */}
        <div className="grid grid-cols-12 gap-4 mb-6">
          <div className="col-span-10">
            <h4 className="text-lg font-semibold mb-3">Patient Details</h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <div><span className="font-semibold">Name:</span> {data.name}</div>
              <div><span className="font-semibold">S/O:</span> {data.fatherName}</div>
              <div><span className="font-semibold">Gender:</span> {data.gender}</div>
              <div><span className="font-semibold">Date of Birth:</span> {data.dob}</div>
              <div><span className="font-semibold">Contact No.:</span> {data.contact}</div>
              <div><span className="font-semibold">C.N.I.C. #:</span> {data.cnic}</div>
              <div><span className="font-semibold">Nationality:</span> {data.nationality}</div>
              <div><span className="font-semibold">Passport #:</span> {data.passport}</div>
              <div><span className="font-semibold">Batch Number:</span> {data.batchNumber}</div>
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

        {/* Vaccination Data */}
        <div className="mb-6">
          <h2 className="text-center text-xl font-bold border border-black py-2 mb-4">
            VACCINATION CERTIFICATE
          </h2>
          <h4 className="text-center text-lg font-semibold mb-6">
            Meningococcal Quadrivalent Polysaccharide Conjugate Vaccine
          </h4>

          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-3 font-semibold">Brand</td>
                <td className="p-3">Nimenrix</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-3 font-semibold">Manufacturer</td>
                <td className="p-3">Pfizer</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-3 font-semibold">Status</td>
                <td className="p-3">Vaccinated</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Remarks</td>
                <td className="p-3">This Vaccination is valid for 5 years.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Section */}
        <footer className="space-y-6">
          <div className="text-center text-red-600">
            <h4 className="font-bold mb-2">This report is digitally verified and does not require any Signature</h4>
            <p className="text-xs text-gray-600">
              For verification, please scan the QR code or visit 
              <a href="https://www.ucml.pk/" className="text-blue-500 underline"> ucml.pk</a> and enter MRN/CNIC.<br />
              This certificate is valid for all airports, airlines, embassies, and schools worldwide.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-300 text-sm">
            <div className="text-center">
              <p className="font-semibold">Dr. M.Tayyab</p>
              <p>M.B.B.S, RMP</p>
              <p>Chief Physician</p>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500">
            Printed Date & Time: {new Date().toLocaleString()}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VaccineCertificate;

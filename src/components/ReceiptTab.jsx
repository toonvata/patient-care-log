import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const ReceiptTab = () => {
  const [receiptData, setReceiptData] = useState({
    patientName: '',
    treatmentDate: '',
    treatmentDescription: '',
    amount: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReceiptData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const generateReceipt = () => {
    const doc = new jsPDF();
    doc.setFont('Sarabun-Regular');
    doc.setFontSize(16);
    doc.text('ใบเสร็จรับเงิน / Receipt', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`ชื่อผู้ป่วย: ${receiptData.patientName}`, 20, 40);
    doc.text(`วันที่รับการรักษา: ${receiptData.treatmentDate}`, 20, 50);
    doc.text(`รายการรักษา: ${receiptData.treatmentDescription}`, 20, 60);
    doc.text(`จำนวนเงิน: ${receiptData.amount} บาท`, 20, 70);
    doc.text('ลงชื่อ..................................', 130, 100);
    doc.text('(ดร. สมศักดิ์ รักษาดี)', 135, 110);
    doc.text('แพทย์ผู้รักษา', 145, 120);
    doc.save('receipt.pdf');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">พิมพ์ใบเสร็จรับเงิน</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">ชื่อผู้ป่วย:</label>
          <input
            type="text"
            name="patientName"
            value={receiptData.patientName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">วันที่รับการรักษา:</label>
          <input
            type="date"
            name="treatmentDate"
            value={receiptData.treatmentDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">รายการรักษา:</label>
          <textarea
            name="treatmentDescription"
            value={receiptData.treatmentDescription}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1">จำนวนเงิน (บาท):</label>
          <input
            type="number"
            name="amount"
            value={receiptData.amount}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="button"
          onClick={generateReceipt}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          พิมพ์ใบเสร็จ
        </button>
      </form>
    </div>
  );
};

export default ReceiptTab;
import React, { useState } from 'react';

export default function CancellationModal({ booking, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState('');

  if (!booking) return null;

  // Calculate refund percentage based on departure time
  // For simplicity, we just use a placeholder logic if we can't parse exactly
  let refundPercentage = 80;
  try {
    const parts = booking.outboundDate.replace(/,/g, '').split(' ');
    const day = parseInt(parts[0], 10);
    const monthMap = { "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "Mei": 4, "Jun": 5, "Jul": 6, "Agt": 7, "Sep": 8, "Okt": 9, "Nov": 10, "Des": 11, "May": 4, "Aug": 7, "Oct": 9, "Dec": 11 };
    const month = monthMap[parts[1]] || 0;
    let year = parseInt(parts[2], 10);
    if (year < 100) year += 2000;
    
    const [hours, minutes] = (booking.outboundTicket?.departTime || "00:00").split(':').map(Number);
    const departDate = new Date(year, month, day, hours, minutes).getTime();
    const now = new Date().getTime();
    
    const hoursDifference = (departDate - now) / (1000 * 60 * 60);

    if (hoursDifference <= 0) {
      refundPercentage = 0; // Sudah berangkat
    } else if (hoursDifference < 24) {
      refundPercentage = 50; // < 24 jam
    } else {
      refundPercentage = 80; // > 24 jam
    }
  } catch(e) {
    refundPercentage = 80; // fallback
  }

  const estimatedRefund = Math.round(booking.finalPaid * (refundPercentage / 100));

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-[150] flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] w-full max-w-md shadow-2xl p-6 relative overflow-hidden animate-scale-up">
        
        <div className="absolute top-0 left-0 w-full h-2 bg-rose-500"></div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="font-extrabold text-slate-900 text-lg">Batalkan Tiket</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"><i className="fa-solid fa-xmark"></i></button>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Kode Booking</p>
          <p className="text-lg font-extrabold text-slate-800 mb-4">{booking.bookingId}</p>

          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Total Pembayaran</p>
          <p className="text-lg font-extrabold text-emerald-600">Rp {booking.finalPaid.toLocaleString('id-ID')}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-sm text-slate-800 mb-2">Kebijakan Pengembalian Dana (Refund)</h3>
          <ul className="text-xs text-slate-600 space-y-2 mb-4 list-disc pl-4">
            <li>Batal &gt; 24 jam sebelum berangkat: <span className="font-bold text-slate-800">Refund 80%</span></li>
            <li>Batal &lt; 24 jam sebelum berangkat: <span className="font-bold text-slate-800">Refund 50%</span></li>
            <li>Sudah berangkat: <span className="font-bold text-rose-600">Tidak bisa dibatalkan</span></li>
          </ul>

          {refundPercentage === 0 ? (
            <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-xs font-bold border border-rose-100 flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>
              Tiket ini sudah tidak dapat dibatalkan karena jadwal keberangkatan telah lewat.
            </div>
          ) : (
            <div className="bg-sky-50 border border-sky-100 p-4 rounded-xl">
              <p className="text-xs font-semibold text-primary mb-1">Estimasi Pengembalian Dana ({refundPercentage}%)</p>
              <p className="text-xl font-extrabold text-sky-700">Rp {estimatedRefund.toLocaleString('id-ID')}</p>
              <p className="text-[10px] text-sky-500 mt-2 font-medium">Dana akan diproses dalam 3-5 hari kerja ke rekening/sumber dana awal.</p>
            </div>
          )}
        </div>

        {refundPercentage > 0 && (
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-600 mb-2">
              Ketik <span className="text-rose-500 select-all">BATALKAN</span> untuk konfirmasi pembatalan.
            </label>
            <input 
              type="text" 
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="BATALKAN"
              className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 font-bold"
            />
          </div>
        )}

        <div className="flex gap-3 mt-2">
          <button 
            onClick={onClose} 
            className="flex-1 py-3 bg-white border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-600 hover:bg-slate-50 transition"
          >
            Tutup
          </button>
          {refundPercentage > 0 && (
            <button 
              disabled={confirmText !== 'BATALKAN'}
              onClick={() => onConfirm(booking.bookingId)}
              className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
                confirmText === 'BATALKAN' 
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Batalkan Tiket
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

const monthMap = {
  "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "Mei": 4, "Jun": 5,
  "Jul": 6, "Agt": 7, "Sep": 8, "Okt": 9, "Nov": 10, "Des": 11,
  "May": 4, "Aug": 7, "Oct": 9, "Dec": 11
};

export default function CountdownTimer({ departureDate, departureTime, routeLabel, vesselName }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasDeparted, setHasDeparted] = useState(false);

  useEffect(() => {
    if (!departureDate || !departureTime) return;

    // Parse date string: "6 Jun, 26" or "6 Jun, 2026"
    // Remove commas
    const cleanDateStr = departureDate.replace(/,/g, '');
    const parts = cleanDateStr.split(' ');
    if (parts.length < 3) return;

    const day = parseInt(parts[0], 10);
    const monthStr = parts[1];
    let year = parseInt(parts[2], 10);
    
    // If year is 2 digits, assume 20xx
    if (year < 100) year += 2000;

    const month = monthMap[monthStr] !== undefined ? monthMap[monthStr] : 0;

    const [hours, minutes] = departureTime.split(':').map(Number);

    const targetDate = new Date(year, month, day, hours, minutes, 0, 0).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setHasDeparted(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [departureDate, departureTime]);

  if (hasDeparted) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-sky-600 rounded-2xl p-6 text-white shadow-lg text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 wave-animation" style={{
          background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'><path fill=\'%23ffffff\' fill-opacity=\'1\' d=\'M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\'></path></svg>") repeat-x bottom/cover',
          animation: 'wave 10s linear infinite'
        }}></div>
        <div className="relative z-10">
          <i className="fa-solid fa-ship text-4xl mb-3 animate-bounce"></i>
          <h3 className="text-xl font-bold">Kapal Anda Sudah Berangkat</h3>
          <p className="text-sm text-blue-100 mt-1">{vesselName} • {routeLabel}</p>
        </div>
        <style>{`
          @keyframes wave {
            0% { background-position-x: 0; }
            100% { background-position-x: 1440px; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm text-center">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Live Countdown Keberangkatan</h3>
      <div className="flex justify-center gap-3 sm:gap-4 mb-4">
        <div className="flex flex-col items-center">
          <div className="bg-primary text-white w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold shadow-md">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-1">Hari</span>
        </div>
        <span className="text-2xl font-bold text-slate-300 self-start mt-2 sm:mt-4">:</span>
        <div className="flex flex-col items-center">
          <div className="bg-primary text-white w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold shadow-md">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-1">Jam</span>
        </div>
        <span className="text-2xl font-bold text-slate-300 self-start mt-2 sm:mt-4">:</span>
        <div className="flex flex-col items-center">
          <div className="bg-primary text-white w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold shadow-md">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-1">Menit</span>
        </div>
        <span className="text-2xl font-bold text-slate-300 self-start mt-2 sm:mt-4">:</span>
        <div className="flex flex-col items-center">
          <div className="bg-accent text-white w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold shadow-md animate-pulse">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <span className="text-[10px] sm:text-xs text-slate-500 font-semibold mt-1">Detik</span>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
        <i className="fa-solid fa-location-dot text-primary"></i>
        <span>{routeLabel}</span>
        <span className="mx-1">•</span>
        <i className="fa-solid fa-ship text-slate-400"></i>
        <span>{vesselName}</span>
      </div>
    </div>
  );
}

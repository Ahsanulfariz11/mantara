import React, { useState, useEffect } from 'react';

const hotelData = {
  "Tanjung Selor": [
    { name: "Grand Kayan Hotel", rating: 4.5, price: "Rp 450.000", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Penginapan Bulungan Indah", rating: 4.0, price: "Rp 250.000", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Villa Kayan Riverside", rating: 4.8, price: "Rp 750.000", image: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
  ],
  "Nunukan": [
    { name: "Hotel Sedadap", rating: 4.2, price: "Rp 350.000", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Penginapan Borneo Stay", rating: 4.1, price: "Rp 200.000", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Grand Nunukan Inn", rating: 4.6, price: "Rp 550.000", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
  ],
  "Malinau": [
    { name: "Hotel Mahakam Malinau", rating: 4.3, price: "Rp 400.000", image: "https://images.unsplash.com/photo-1551882547-ff40c0d129df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Penginapan Alam Malinau", rating: 4.5, price: "Rp 300.000", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Grand Malinau Hotel", rating: 4.7, price: "Rp 600.000", image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
  ],
  "Tarakan": [
    { name: "Swiss-Belhotel Tarakan", rating: 4.8, price: "Rp 850.000", image: "https://images.unsplash.com/photo-1618773928120-22245b08c903?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Hotel Tarakan Plaza", rating: 4.4, price: "Rp 500.000", image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Blue Sky Tarakan", rating: 4.5, price: "Rp 550.000", image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
  ],
  "Derawan": [
    { name: "Derawan Dive Resort", rating: 4.9, price: "Rp 1.200.000", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Nabucco Island Resort", rating: 4.8, price: "Rp 1.500.000", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { name: "Penginapan Coral View", rating: 4.6, price: "Rp 450.000", image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
  ]
};

export default function HotelRecommendations({ destination }) {
  const [isVisible, setIsVisible] = useState(false);
  const hotels = hotelData[destination] || [];

  useEffect(() => {
    if (hotels.length > 0) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [destination, hotels.length]);

  if (hotels.length === 0) return null;

  return (
    <div className={`mt-8 transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center gap-2 mb-4">
        <i className="fa-solid fa-hotel text-primary text-xl"></i>
        <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Penginapan Pilihan di {destination}</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
        {hotels.map((hotel, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
            <div className="h-40 overflow-hidden relative">
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-slate-800 text-[10px] font-extrabold px-2 py-1 rounded-lg z-10 flex items-center gap-1 shadow-sm">
                <i className="fa-solid fa-star text-amber-400"></i> {hotel.rating}
              </div>
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm mb-1 leading-tight">{hotel.name}</h4>
                <p className="text-xs font-semibold text-primary">{hotel.price} <span className="text-[10px] text-slate-400 font-normal">/ malam</span></p>
              </div>
              <button 
                disabled
                className="mt-4 w-full bg-slate-50 border border-slate-200 text-slate-400 font-bold text-[10px] uppercase tracking-widest py-2 rounded-xl cursor-not-allowed"
              >
                Lihat Detail (Segera)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

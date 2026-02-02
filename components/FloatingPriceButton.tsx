"use client";

import React, { useState } from "react";
import { X, LineChart } from "lucide-react";
import { PriceInsightsContent } from "./PriceInsightsContent";

export function FloatingPriceButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* FAB */}

            <button
                onClick={() => setIsModalOpen(true)}
                style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}
                className="bg-[#4e6bf5] hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative"
            >
                {/* Marker 2: Onboarding Badge */}
                <div className="absolute -top-1 -left-1 flex h-6 w-6 z-50">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-orange-500 text-white text-xs font-bold items-center justify-center border-2 border-white">
                        2
                    </span>
                </div>

                <LineChart className="w-6 h-6" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap font-bold">
                    가격 인사이트
                </span>
            </button>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">

                    {/* Modal Content */}
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scale-in">
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <LineChart className="w-5 h-5 text-blue-600" />
                                가격 인사이트
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Body */}
                        <div>
                            <PriceInsightsContent />
                        </div>

                        {/* Footer (Optional action) */}
                        <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-[#4e6bf5] hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-sm transition-colors w-full md:w-auto"
                            >
                                예약하러 가기
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

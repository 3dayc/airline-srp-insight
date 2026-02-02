"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { PriceInsightsContent } from "./PriceInsightsContent";

export function PriceInsights() {
  const [isOpen, setIsOpen] = useState(false); // Closed by default as requested

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden font-sans">
      {/* Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center gap-2 relative">
          {/* Marker 1: Onboarding Badge */}
          <div className="absolute -left-3 -top-2 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-orange-500 text-white text-[10px] font-bold items-center justify-center border border-white">
              1
            </span>
          </div>

          <span className="font-bold text-gray-800 text-sm md:text-base pl-2">
            지금이 예약하기 적당한 가격일까요? 확인하기
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Accordion Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden bg-white",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border-t border-gray-100">
          <PriceInsightsContent />
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { Info, Flame } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    ReferenceLine,
    Label,
    ReferenceDot,
    ReferenceArea,
    LabelList // Imported LabelList
} from "recharts";

// 1. Generate 30 daily data points for trend - Piecewise Parabola
const generateTrendData = () => {
    const data = [];

    // Goal: 
    // 30 days ago: Start (~34man)
    // 22 days ago: Peak (High ~36.5man) - requested
    // 10 days ago: Valley (Low ~26.4man)
    // Today: Rebound to 272,300

    const startPrice = 340000;
    const maxPrice = 365000; // 22 days ago
    const minPrice = 264000; // 10 days ago
    const endPrice = 272300; // Today

    for (let i = 30; i >= 0; i--) {
        const dateStr = i === 0 ? "오늘" : `${i}일전`;
        const x = 30 - i; // 0 to 30
        let price = 0;

        // X=0 is 30 days ago | X=8 is 22 days ago | X=20 is 10 days ago | X=30 is Today

        if (x <= 8) {
            // Segment 1: Rise from Start to Max (0 -> 8)
            const t = x / 8; // 0 to 1
            // Simple ease-out quad
            price = startPrice + (maxPrice - startPrice) * (1 - Math.pow(1 - t, 2));
        } else if (x <= 20) {
            // Segment 2: Drop from Max to Min (8 -> 20)
            const t = (x - 8) / 12; // 0 to 1
            // Smooth S-curve (Cosine interpolation)
            const cosT = (1 - Math.cos(t * Math.PI)) / 2;
            price = maxPrice - (maxPrice - minPrice) * cosT;
        } else {
            // Segment 3: Rise from Min to End (20 -> 30)
            const t = (x - 20) / 10; // 0 to 1
            // Quadratic ease-in-out
            price = minPrice + (endPrice - minPrice) * Math.pow(t, 2);
        }

        // Add minimal natural noise
        price += (Math.random() - 0.5) * 300;

        // Force precise key points
        if (i === 22) price = 365000;  // Max (22 days ago)
        if (i === 0) price = 272300;   // Today

        data.push({
            date: dateStr,
            price: Math.floor(price / 100) * 100,
            displayLabel: null as number | null
        });
    }

    // Find absolute Min/Max
    let maxIdx = 0;
    let minIdx = 0;
    let maxVal = -Infinity;
    let minVal = Infinity;

    data.forEach((d, idx) => {
        if (d.price > maxVal) { maxVal = d.price; maxIdx = idx; }
        if (d.price < minVal) { minVal = d.price; minIdx = idx; }
    });

    data[maxIdx].displayLabel = data[maxIdx].price;
    data[minIdx].displayLabel = data[minIdx].price;

    const maxPoint = data[maxIdx];
    const minPoint = data[minIdx];

    return { data, maxPoint, minPoint };
};

const { data: trendData, maxPoint, minPoint } = generateTrendData();

const distributionData = [
    { price: 200000, amount: 5 },
    { price: 220000, amount: 15 },
    { price: 240000, amount: 35 },
    { price: 260000, amount: 60 },
    { price: 280000, amount: 80 },
    { price: 300000, amount: 100 },
    { price: 320000, amount: 85 },
    { price: 340000, amount: 60 },
    { price: 360000, amount: 30 },
    { price: 380000, amount: 10 },
    { price: 400000, amount: 5 },
];

// PriceLabel now receives props from certain LabelList context
// LabelList passes: x, y, value, index...
// Compact PriceLabel to prevent overflow
const PriceLabel = (props: any) => {
    const { x, y, value, minVal, maxVal } = props;
    if (!value) return null;

    const isMax = value === maxVal;

    // Adjusted for mobile safety:
    // Max (Top-Centerish): Rise above the peak. 
    // Min (Bottom-Centerish): Sit below the valley.
    // Reduced extreme horizontal shifts (dx) to prevent falling off screen edges or looking detached.

    const config = isMax ? {
        text: "최고가",
        textColor: "#ef4444",
        bgColor: "#fff0f0",
        borderColor: "#fecaca",
        // Position: Top Right of dot, closer to prevent drifting
        dx: 10,
        dy: -40
    } : {
        text: "최저가",
        textColor: "#16a34a",
        bgColor: "#f0fdf4",
        borderColor: "#bbf7d0",
        // Position: Bottom Left (slightly) of dot to sit nicely in the V-shape valley
        // Removing the extreme -85 shift which breaks on mobile
        dx: -40,
        dy: 20
    };

    return (
        <g transform={`translate(${x},${y})`}>
            {/* Reduced width/height for compact size and overflow handling */}
            <foreignObject x={config.dx} y={config.dy} width="100" height="40" style={{ overflow: "visible" }}>
                <div
                    className="flex flex-col items-start justify-center backdrop-blur-[1px]"
                >
                    <div
                        className="flex items-center gap-1.5 px-2 py-1 rounded border shadow-sm whitespace-nowrap bg-opacity-95"
                        style={{
                            backgroundColor: config.bgColor,
                            borderColor: config.borderColor,
                        }}
                    >
                        <span className="font-bold text-[10px]" style={{ color: config.textColor }}>{config.text}</span>
                        <div className="h-2.5 w-px bg-gray-300"></div>
                        <span className="font-bold text-xs text-gray-900 tracking-tight">{value.toLocaleString()}원</span>
                    </div>
                </div>
            </foreignObject>
        </g>
    );
};

export function PriceInsightsContent() {
    return (
        <div className="p-4 md:p-6 bg-white space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {/* Left Column: Price Trend Line Chart */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4 group relative cursor-help w-fit">
                        <h3 className="text-xl font-bold text-gray-900">
                            최저가 추이 (최근 30일)
                        </h3>
                        <Info className="w-5 h-5 text-gray-400" />

                        <div className="absolute left-full top-0 ml-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                            지난 30일 동안의 최저가 추이를 분석하여 현재 가격이 얼마나 저렴한지 알려드립니다.
                        </div>
                    </div>

                    <div className="flex-1 min-h-[320px] w-full p-2 bg-gray-50/50 rounded-xl relative">
                        {/* Added padding directly to container to ensure labels aren't clipped */}
                        <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
                            <AreaChart data={trendData} margin={{ top: 40, right: 30, left: 10, bottom: 20 }}>
                                <defs>
                                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.1" />
                                    </filter>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12, fill: '#9ca3af' }}
                                    axisLine={false}
                                    tickLine={false}
                                    interval="preserveStartEnd"
                                    ticks={['30일전', '25일전', '20일전', '15일전', '10일전', '5일전', '오늘']}
                                />

                                <YAxis
                                    tick={({ x, y, payload, index }) => {
                                        if (index === 0) return <g />; // Hide bottom-most label
                                        return (
                                            <text x={x} y={y} dy={4} textAnchor="end" fill="#9ca3af" fontSize={12}>
                                                {`${Math.floor(payload.value / 10000)}만`}
                                            </text>
                                        );
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                    // Dynamic domain
                                    domain={['dataMin - 10000', 'auto']}
                                />

                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value: any) => [`${value.toLocaleString()}원`, '가격']}
                                    labelStyle={{ color: '#6b7280' }}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorPrice)"
                                    activeDot={{ r: 6, fill: '#2563eb', stroke: 'white', strokeWidth: 2 }}
                                >
                                    {/* Using LabelList for robust positioning of text labels */}
                                    {/* Using LabelList for robust positioning of text labels. Pass min/max to component for styling */}
                                    <LabelList
                                        dataKey="displayLabel"
                                        content={(props) => <PriceLabel {...props} minVal={minPoint.price} maxVal={maxPoint.price} />}
                                    />
                                </Area>

                                {/* Spots (Dots) using ReferenceDot for precise control on top of line */}
                                <ReferenceDot
                                    x={maxPoint.date}
                                    y={maxPoint.price}
                                    r={5}
                                    fill="#ef4444"
                                    stroke="white"
                                    strokeWidth={2}
                                />

                                <ReferenceDot
                                    x={minPoint.date}
                                    y={minPoint.price}
                                    r={5}
                                    fill="#16a34a"
                                    stroke="white"
                                    strokeWidth={2}
                                />

                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right Column: Price Distribution */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4 group relative cursor-help w-fit">
                        <h3 className="text-xl font-bold text-gray-900">
                            다른 여행자 가격 비교
                        </h3>
                        <Info className="w-5 h-5 text-gray-400" />
                        <div className="absolute right-0 top-8 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-left">
                            최근 7일간 동일 조건(FSC 오전 출발 등) 실제 결제 데이터 기준입니다.
                        </div>
                    </div>

                    <div className="flex-1 min-h-[320px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={distributionData} margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="price"
                                    tickFormatter={(val) => `${val / 10000}만`}
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    tickLine={false}
                                />

                                <ReferenceArea x1={280000} x2={320000} fill="#eff6ff" fillOpacity={0.8} />

                                <Area
                                    type="natural"
                                    dataKey="amount"
                                    stroke="#3b82f6"
                                    fill="url(#colorAmount)"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    activeDot={false}
                                />
                                <ReferenceLine x={300000} stroke="#9ca3af" strokeDasharray="3 3">
                                    <Label value="가장 많은 예약 구간" position="top" fill="#4b5563" fontSize={12} offset={10} />
                                </ReferenceLine>

                                <Tooltip
                                    cursor={{ stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '3 3' }}
                                    formatter={(value: any) => [`${value}명`, '예약수']}
                                    labelFormatter={(label) => [`${label.toLocaleString()}원`]}
                                />

                            </AreaChart>
                        </ResponsiveContainer>

                        <div className="absolute top-[48%] left-[24%] flex flex-col items-center z-10 animate-fade-in-up">
                            <div className="bg-[#ff6902] text-white p-3 rounded-lg shadow-lg mb-2 w-max text-center relative">
                                <div className="text-sm font-bold mb-1">최저가: 272,300원</div>
                                <div className="text-xs opacity-95">
                                    평균보다 <span className="font-bold text-yellow-200">12% 더 저렴한</span><br />
                                    상위 15%의 가격입니다! ✨
                                </div>
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#ff6902]"></div>
                            </div>
                            <div className="relative">
                                <div className="w-4 h-4 bg-[#ff6902] rounded-full border-2 border-white shadow-sm z-10 relative"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#ff6902] rounded-full opacity-20 animate-ping"></div>
                            </div>
                            <div className="mt-1 text-xs font-bold text-gray-800 bg-white/80 px-1 rounded backdrop-blur-sm">현재 최저가</div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Insight Box */}
            <div className="w-full">
                <div className="bg-[#f0f9ff] p-6 rounded-2xl flex items-start gap-4 border border-blue-100 shadow-sm">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl shrink-0 text-blue-600">
                        💡
                    </div>
                    <div className="bg-transparent space-y-3">
                        <h4 className="text-xl font-bold text-gray-900 leading-snug">
                            와! 지금 이 티켓, 비슷한 조건의 항공권 평균보다 <span className="text-blue-600">30,000원</span>이나 더 아낄 수 있어요.
                        </h4>

                        <div className="w-full h-px bg-blue-100/50 my-2"></div>

                        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                            지금 평균 중위값 범위보다 <span className="font-bold text-blue-600">낮은 가격</span>이면서
                            최근 30일 내 <span className="font-bold text-blue-600">최저가 수준</span>에 근접해 있습니다.<br className="hidden md:block" />
                            보통 출발 <span className="font-bold text-gray-900">15일 전</span>부터 가격이 오르는 경향이 있으니,
                            <span className="font-bold underline decoration-blue-300 decoration-2 underline-offset-2 ml-1">지금 예약하시는 것을 추천드려요!</span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

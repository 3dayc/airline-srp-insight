import { PriceInsights } from "@/components/PriceInsights";
import { FloatingPriceButton } from "@/components/FloatingPriceButton";
import { ArrowLeftRight, Calendar, User } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header / Nav */}
      <header className="bg-white p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">항공</h1>
          <div className="w-10"></div>{/* Spacer for center alignment */}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">

        {/* Search Bar (Refined Design) */}
        <div className="bg-white rounded-[20px] border border-gray-800 p-6 hidden md:block shadow-sm">
          {/* Top Row: Tabs & Checkbox */}
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-0">
            <div className="flex items-center gap-6">
              <button className="border-b-2 border-gray-900 pb-3 font-bold text-gray-900 px-2">왕복</button>
              <button className="text-gray-400 hover:text-gray-900 pb-3 font-medium px-2">편도</button>
              <button className="text-gray-400 hover:text-gray-900 pb-3 font-medium px-2">다구간</button>
            </div>
            <div className="pb-3 flex items-center gap-2">
              <div className="w-5 h-5 border border-gray-300 rounded bg-white"></div>
              <span className="text-sm text-gray-500 font-medium">직항</span>
            </div>
          </div>

          {/* Input Row */}
          <div className="flex items-center h-16">
            {/* Route */}
            <div className="flex-1 flex items-center justify-center gap-8 px-4 border-r border-gray-100 min-w-[320px]">
              <span className="font-bold text-xl text-gray-900 whitespace-nowrap">서울 SEL</span>
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
              <span className="font-bold text-xl text-gray-900 whitespace-nowrap">후쿠오카 FUK</span>
            </div>

            {/* Date */}
            <div className="flex-1 flex items-center justify-center gap-2 px-4 border-r border-gray-100">
              <Calendar className="text-gray-300 w-6 h-6" />
              <span className="font-bold text-lg text-gray-900">04.19(일) - 04.21(화)</span>
            </div>

            {/* Passenger */}
            <div className="flex-1 flex items-center justify-center gap-2 px-4">
              <User className="text-gray-300 w-6 h-6" />
              <span className="font-bold text-lg text-gray-900">탑승객 1명, 일반석</span>
            </div>

            {/* Search Button */}
            <div className="pl-4">
              <button className="bg-[#4e6bf5] hover:bg-blue-600 text-white font-bold h-14 px-8 rounded-xl text-lg shadow-sm transition-colors">
                최저가로 검색
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Summary (Visible only on mobile) */}
        <div className="md:hidden bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center shadow-sm">
          <div>
            <div className="font-bold text-gray-900">서울 - 후쿠오카</div>
            <div className="text-sm text-gray-500">04.19 - 04.21 · 일반석 1명</div>
          </div>
          <button className="text-blue-600 font-bold text-sm">변경</button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start relative">

          {/* Left Filter Sidebar (Sticky) */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <div className="bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">전체 필터</h3>
                <button className="text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded hover:bg-gray-50">초기화</button>
              </div>

              <div className="space-y-8">
                {/* Recommendation */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-sm">추천</h4>
                    <span className="text-xs text-gray-400 underline cursor-pointer">전체해제</span>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 border border-gray-300 rounded bg-white group-hover:border-blue-500"></div>
                      <span className="text-sm text-gray-600">직항만</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 border border-gray-300 rounded bg-white group-hover:border-blue-500"></div>
                      <span className="text-sm text-gray-600">대한항공·아시아나</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 bg-gray-800 border border-gray-800 rounded flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-sm text-gray-600">가는편 오전 출발</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Flight List & Price Insights */}
          <div className="lg:col-span-3 space-y-6">

            {/* Price Insights Component Integrated HERE (Moved to Top) */}
            <PriceInsights />

            <div className="flex justify-between items-end">
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="font-bold text-gray-900">직항 우선</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
              </div>
              <span className="text-xs text-gray-400">성인 1인 · 수수료 포함</span>
            </div>

            {/* Flight List Content */}
            <div className="space-y-4">
              {/* Flight Card 1 */}
              <FlightCard
                airline="에어부산"
                outbound={{ dep: "07:20", arr: "08:55", code: "ICN", arrCode: "FUK", duration: "01시간 35분" }}
                inbound={{ dep: "10:00", arr: "11:35", code: "FUK", arrCode: "ICN", duration: "01시간 35분" }}
                price="272,300"
              />
              <FlightCard
                airline="에어부산"
                outbound={{ dep: "11:10", arr: "13:00", code: "ICN", arrCode: "FUK", duration: "01시간 50분" }}
                inbound={{ dep: "10:00", arr: "11:35", code: "FUK", arrCode: "ICN", duration: "01시간 35분" }}
                price="272,300"
              />
              <FlightCard
                airline="제주항공"
                outbound={{ dep: "13:30", arr: "15:00", code: "ICN", arrCode: "FUK", duration: "01시간 30분" }}
                inbound={{ dep: "16:00", arr: "17:30", code: "FUK", arrCode: "ICN", duration: "01시간 30분" }}
                price="278,500"
              />
              <FlightCard
                airline="티웨이항공"
                outbound={{ dep: "15:00", arr: "16:30", code: "ICN", arrCode: "FUK", duration: "01시간 30분" }}
                inbound={{ dep: "18:00", arr: "19:30", code: "FUK", arrCode: "ICN", duration: "01시간 30분" }}
                price="281,000"
              />
              <FlightCard
                airline="진에어"
                outbound={{ dep: "09:00", arr: "10:30", code: "ICN", arrCode: "FUK", duration: "01시간 30분" }}
                inbound={{ dep: "12:00", arr: "13:30", code: "FUK", arrCode: "ICN", duration: "01시간 30분" }}
                price="285,400"
              />
              <FlightCard
                airline="대한항공"
                outbound={{ dep: "10:00", arr: "11:35", code: "ICN", arrCode: "FUK", duration: "01시간 35분" }}
                inbound={{ dep: "14:00", arr: "15:35", code: "FUK", arrCode: "ICN", duration: "01시간 35분" }}
                price="320,000"
              />
              <FlightCard
                airline="아시아나"
                outbound={{ dep: "14:00", arr: "15:30", code: "ICN", arrCode: "FUK", duration: "01시간 30분" }}
                inbound={{ dep: "17:00", arr: "18:30", code: "FUK", arrCode: "ICN", duration: "01시간 30분" }}
                price="325,000"
              />
              <FlightCard
                airline="에어서울"
                outbound={{ dep: "16:00", arr: "17:30", code: "ICN", arrCode: "FUK", duration: "01시간 30분" }}
                inbound={{ dep: "19:00", arr: "20:30", code: "FUK", arrCode: "ICN", duration: "01시간 30분" }}
                price="275,000"
              />
            </div>
          </div>
        </div>

      </main>

      {/* Floating Action Button */}
      <FloatingPriceButton />
    </div>
  );
}

function FlightCard({
  airline,
  outbound,
  inbound,
  price
}: {
  airline: string,
  outbound: { dep: string, arr: string, code: string, arrCode: string, duration: string },
  inbound: { dep: string, arr: string, code: string, arrCode: string, duration: string },
  price: string
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Flight Segments Column */}
        <div className="flex-1 space-y-6">
          {/* Outbound */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 w-24">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                {/* Auto-detect logo style based on airline name or just generic */}
                <img src={`https://ui-avatars.com/api/?name=${airline.substring(0, 2)}&background=eff6ff&color=2563eb&size=32&font-size=0.4&rounded=true&bold=true`} alt={airline} className="rounded-full w-8 h-8" />
              </div>
              <span className="font-bold text-gray-700 text-sm whitespace-nowrap">{airline}</span>
            </div>
            <div className="flex-1 flex items-center justify-between md:justify-start md:gap-12">
              <div className="text-center md:text-left min-w-[60px]">
                <div className="font-bold text-xl text-gray-900">{outbound.dep}</div>
                <div className="text-xs text-gray-400">{outbound.code}</div>
              </div>
              <div className="flex flex-col items-center gap-1 min-w-[80px]">
                <span className="text-xs text-gray-400">{outbound.duration}</span>
                <div className="flex items-center gap-1">
                  <div className="w-16 h-[1px] bg-gray-300"></div>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="gray" stroke="none"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" /></svg>
                </div>
              </div>
              <div className="text-center md:text-left min-w-[60px]">
                <div className="font-bold text-xl text-gray-900">{outbound.arr}</div>
                <div className="text-xs text-gray-400">{outbound.arrCode}</div>
              </div>
              <div className="hidden md:flex flex-col items-center gap-1 min-w-[40px]">
                <span className="text-sm text-gray-700 font-medium">직항</span>
                <span className="text-xs text-gray-400 flex items-center gap-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></svg>
                  15kg
                </span>
              </div>
            </div>
          </div>

          {/* Inbound */}
          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 w-24">
              {/* Simplified logic for inbound, assuming same airline */}
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <img src={`https://ui-avatars.com/api/?name=${airline.substring(0, 2)}&background=eff6ff&color=2563eb&size=32&font-size=0.4&rounded=true&bold=true`} alt={airline} className="rounded-full w-8 h-8" />
              </div>
              <span className="font-bold text-gray-700 text-sm whitespace-nowrap">{airline}</span>
            </div>
            <div className="flex-1 flex items-center justify-between md:justify-start md:gap-12">
              <div className="text-center md:text-left min-w-[60px]">
                <div className="font-bold text-xl text-gray-900">{inbound.dep}</div>
                <div className="text-xs text-gray-400">{inbound.code}</div>
              </div>
              <div className="flex flex-col items-center gap-1 min-w-[80px]">
                <span className="text-xs text-gray-400">{inbound.duration}</span>
                <div className="flex items-center gap-1">
                  <div className="w-16 h-[1px] bg-gray-300"></div>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="gray" stroke="none"><path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" /></svg>
                </div>
              </div>
              <div className="text-center md:text-left min-w-[60px]">
                <div className="font-bold text-xl text-gray-900">{inbound.arr}</div>
                <div className="text-xs text-gray-400">{inbound.arrCode}</div>
              </div>
              <div className="hidden md:flex flex-col items-center gap-1 min-w-[40px]">
                <span className="text-sm text-gray-700 font-medium">직항</span>
                <span className="text-xs text-gray-400 flex items-center gap-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></svg>
                  15kg
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="hidden md:block w-[1px] bg-gray-100 h-auto self-stretch mx-2"></div>

        {/* Price Column */}
        <div className="md:w-48 flex flex-col justify-center items-end gap-1 shrink-0">
          <span className="text-xs text-gray-400 font-medium whitespace-nowrap">NOL 카드 외 5개</span>
          <div className="text-2xl font-bold text-gray-900 whitespace-nowrap">{price} 원</div>
        </div>
      </div>
    </div>
  )
}

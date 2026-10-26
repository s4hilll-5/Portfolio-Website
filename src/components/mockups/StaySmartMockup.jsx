import { BedDouble, Download, Heart, MapPin, Search, SlidersHorizontal, Star } from 'lucide-react'
import BrowserFrame from './BrowserFrame'
import { CoastScene, HeritageScene, HillsScene } from './Scenes'

// Illustrative concept of the Stay-Smart interface (sample content, not a screenshot).

const C = {
  bg: '#0D111C',
  card: '#141A29',
  line: 'rgba(255,255,255,0.07)',
  text: '#E8ECF5',
  muted: '#8A93A8',
  accent: '#FB923C',
}

const stays = [
  { name: 'Coastal Nest', place: 'Goa', price: '₹4,250', rating: '4.8', left: '2 rooms left', Scene: CoastScene },
  { name: 'Pine Ridge Cabin', place: 'Manali, Himachal Pradesh', price: '₹3,600', rating: '4.7', left: 'Available', Scene: HillsScene },
  { name: 'Haveli Courtyard', place: 'Jaipur, Rajasthan', price: '₹5,100', rating: '4.9', left: '1 room left', Scene: HeritageScene },
]

const bars = [38, 52, 44, 68, 58, 82, 74]

export default function StaySmartMockup() {
  return (
    <BrowserFrame title="Stay-Smart — Find your stay">
      <div className="absolute inset-0 overflow-hidden font-sans" style={{ background: C.bg, color: C.text }}>
        {/* App nav */}
        <div className="flex h-[50px] items-center justify-between px-[26px]">
          <div className="flex items-center gap-2">
            <span
              className="grid h-7 w-7 place-items-center rounded-lg"
              style={{ background: 'linear-gradient(135deg, #FB923C, #F472B6)' }}
            >
              <BedDouble className="h-4 w-4 text-white" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">Stay-Smart</span>
          </div>
          <div className="flex items-center gap-6 text-[12px]" style={{ color: C.muted }}>
            <span style={{ color: C.text }}>Stays</span>
            <span>Destinations</span>
            <span>My bookings</span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-[10.5px]"
              style={{ border: `1px solid ${C.line}`, color: C.muted }}
            >
              Admin
            </span>
            <span
              className="h-7 w-7 rounded-full"
              style={{ background: 'linear-gradient(135deg, #A78BFA, #67E8F9)' }}
            />
          </div>
        </div>

        {/* Hero banner */}
        <div className="relative mx-[26px] h-[168px] overflow-hidden rounded-[18px]">
          <div className="absolute inset-0">
            <CoastScene />
          </div>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(13,17,28,0.85) 0%, rgba(13,17,28,0.35) 50%, transparent 75%)' }}
          />
          <div className="absolute left-[28px] top-[30px] max-w-[330px]">
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.18em]" style={{ color: '#FDBA74' }}>
              36 states & union territories
            </p>
            <p className="mt-2 text-[27px] font-semibold leading-[1.08] tracking-tight text-white">
              Find a stay that feels like yours
            </p>
            <p className="mt-2 text-[12px]" style={{ color: '#CBD2E1' }}>
              19,000+ listings across India
            </p>
          </div>

          {/* Admin insight widget */}
          <div
            className="absolute right-[22px] top-[20px] w-[210px] rounded-[14px] p-3"
            style={{
              background: 'rgba(13,17,28,0.72)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: C.muted }}>
                Admin · Booking insights
              </p>
            </div>
            <div className="mt-3 flex h-[52px] items-end gap-[6px]">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-[3px]"
                  style={{
                    height: `${h}%`,
                    background:
                      i === bars.length - 2
                        ? 'linear-gradient(180deg, #FDBA74, #FB923C)'
                        : 'rgba(255,255,255,0.16)',
                  }}
                />
              ))}
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-[9.5px]" style={{ color: C.muted }}>
                Revenue · last 7 days
              </span>
              <span
                className="flex items-center gap-1 rounded-md px-1.5 py-[3px] text-[9px] font-medium"
                style={{ background: 'rgba(251,146,60,0.16)', color: '#FDBA74' }}
              >
                <Download className="h-2.5 w-2.5" /> CSV
              </span>
            </div>
          </div>
        </div>

        {/* Search bar — light on dark */}
        <div
          className="relative z-10 mx-[46px] -mt-[28px] flex h-[56px] items-center rounded-[14px] pl-5 pr-2"
          style={{ background: '#F8FAFC', color: '#0F172A', boxShadow: '0 18px 40px -12px rgba(0,0,0,0.6)' }}
        >
          {[
            ['Where', 'Goa, India'],
            ['Check in', '12 Dec'],
            ['Check out', '15 Dec'],
            ['Guests', '2 adults · 1 room'],
          ].map(([label, value], i) => (
            <div
              key={label}
              className="flex-1 pr-4"
              style={{ borderLeft: i ? '1px solid #E2E8F0' : 'none', paddingLeft: i ? 16 : 0 }}
            >
              <p className="text-[8.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</p>
              <p className="mt-0.5 text-[12.5px] font-medium">{value}</p>
            </div>
          ))}
          <span
            className="flex h-[40px] items-center gap-1.5 rounded-[10px] px-4 text-[12px] font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #FB923C, #F472B6)' }}
          >
            <Search className="h-3.5 w-3.5" /> Search
          </span>
        </div>

        {/* Filters */}
        <div className="mt-[18px] flex items-center justify-between px-[26px]">
          <div className="flex gap-2">
            {['All stays', 'Beach', 'Mountains', 'Heritage', 'Pet friendly'].map((chip, i) => (
              <span
                key={chip}
                className="rounded-full px-3 py-[5px] text-[10.5px]"
                style={{
                  background: i === 0 ? '#E8ECF5' : 'transparent',
                  color: i === 0 ? '#0D111C' : C.muted,
                  border: `1px solid ${i === 0 ? '#E8ECF5' : C.line}`,
                  fontWeight: i === 0 ? 600 : 400,
                }}
              >
                {chip}
              </span>
            ))}
          </div>
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[10.5px]"
            style={{ border: `1px solid ${C.line}`, color: C.muted }}
          >
            <SlidersHorizontal className="h-3 w-3" /> Filters
          </span>
        </div>

        {/* Property cards */}
        <div className="mt-[14px] grid grid-cols-3 gap-[14px] px-[26px]">
          {stays.map(({ name, place, price, rating, left, Scene }) => (
            <div key={name} className="rounded-[14px] p-2" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <div className="relative h-[94px] overflow-hidden rounded-[10px]">
                <Scene />
                <span
                  className="absolute left-2 top-2 rounded-full px-2 py-[3px] text-[8.5px] font-semibold"
                  style={{ background: 'rgba(13,17,28,0.75)', color: '#86EFAC' }}
                >
                  {left}
                </span>
                <span
                  className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full"
                  style={{ background: 'rgba(13,17,28,0.6)' }}
                >
                  <Heart className="h-3 w-3 text-white" />
                </span>
              </div>
              <div className="px-1 pb-1 pt-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-[12.5px] font-semibold">{name}</p>
                  <span className="flex items-center gap-1 text-[10.5px]" style={{ color: C.text }}>
                    <Star className="h-3 w-3" style={{ color: '#FBBF24', fill: '#FBBF24' }} /> {rating}
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1 text-[10px]" style={{ color: C.muted }}>
                  <MapPin className="h-2.5 w-2.5" /> {place}
                </p>
                <p className="mt-2 text-[12px] font-semibold">
                  {price} <span className="font-normal" style={{ color: C.muted }}>/ night</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}

import { ArrowRight, Check, Plus, ShoppingBag, User } from 'lucide-react'
import BrowserFrame from './BrowserFrame'
import DessertCup from './DessertCup'

// Illustrative concept of the Bae Laban storefront (sample menu, not a screenshot).

const C = {
  cream: '#F7EFE4',
  card: '#FFF9F1',
  line: '#EADBC8',
  choco: '#3B2416',
  choco2: '#6B4A36',
  caramel: '#C68B59',
  caramelLight: '#E8C39E',
}

const serif = { fontFamily: "'Playfair Display Variable', Georgia, serif" }

const menu = [
  {
    name: 'Pistachio Cream Cup',
    price: '₹249',
    bg: '#E9EEDC',
    cup: { topping: 'pistachio', layers: [{ color: '#DCE6C3', depth: 0.05 }, { color: '#FFF4E4', depth: 0.4 }, { color: '#B7C98F', depth: 0.62 }, { color: '#B0825C', depth: 0.84 }] },
  },
  {
    name: 'Chocolate Fudge Cup',
    price: '₹279',
    bg: '#EFDCCB',
    cup: { topping: 'chocolate', drizzle: '#3B2416', layers: [{ color: '#F3E3D0', depth: 0.05 }, { color: '#5A3A28', depth: 0.32 }, { color: '#FFF4E4', depth: 0.55 }, { color: '#3B2416', depth: 0.78 }] },
  },
  {
    name: 'Mango Malai Cup',
    price: '₹229',
    bg: '#FBE7C4',
    cup: { topping: 'mango', layers: [{ color: '#FFE7A8', depth: 0.05 }, { color: '#FFF4E4', depth: 0.36 }, { color: '#FBBF24', depth: 0.6 }, { color: '#C89B6D', depth: 0.84 }] },
  },
  {
    name: 'Rose Milk Pudding',
    price: '₹199',
    bg: '#F8DCE2',
    cup: { topping: 'rose', layers: [{ color: '#FBE1E7', depth: 0.05 }, { color: '#F9A8D4', depth: 0.42 }, { color: '#FFF4E4', depth: 0.66 }, { color: '#E8A0B4', depth: 0.86 }] },
  },
]

const hero = {
  topping: 'berry',
  drizzle: '#C68B59',
  layers: [
    { color: '#FFF4E4', depth: 0.04 },
    { color: '#C68B59', depth: 0.26 },
    { color: '#F3E3D0', depth: 0.44 },
    { color: '#4A2C1D', depth: 0.64 },
    { color: '#A87452', depth: 0.84 },
  ],
}

export default function BaeLabanMockup() {
  return (
    <BrowserFrame title="Bae Laban — Desserts" tone="light">
      <div className="absolute inset-0 overflow-hidden font-sans" style={{ background: C.cream, color: C.choco }}>
        {/* warm blush in the corner */}
        <div
          className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(232,195,158,0.55), transparent 65%)' }}
        />

        {/* Nav */}
        <div className="relative flex h-[56px] items-center justify-between px-[30px]">
          <p className="text-[21px] font-semibold tracking-tight" style={serif}>
            Bae Laban<span style={{ color: C.caramel }}>.</span>
          </p>
          <div className="flex items-center gap-7 text-[11.5px]" style={{ color: C.choco2 }}>
            <span style={{ color: C.choco, fontWeight: 600 }}>Menu</span>
            <span>Our story</span>
            <span>Track order</span>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-4 w-4" style={{ color: C.choco2 }} />
            <span className="relative">
              <ShoppingBag className="h-[18px] w-[18px]" />
              <span
                className="absolute -right-2 -top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full text-[8.5px] font-bold text-white"
                style={{ background: C.caramel }}
              >
                2
              </span>
            </span>
            <span className="ml-2 rounded-full px-4 py-[7px] text-[11px] font-medium" style={{ background: C.choco, color: C.cream }}>
              Order now
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="relative flex h-[262px] px-[30px]">
          <div className="w-[430px] pt-[22px]">
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em]" style={{ color: C.caramel }}>
              Handcrafted daily · Pickup in store
            </p>
            <p className="mt-3 text-[46px] font-semibold leading-[1.02] tracking-[-0.02em]" style={serif}>
              Layers of pure
              <br />
              <span style={{ color: C.caramel }}>indulgence.</span>
            </p>
            <p className="mt-4 max-w-[330px] text-[12px] leading-[1.6]" style={{ color: C.choco2 }}>
              Creamy cups, cakes and puddings made fresh every morning. Order ahead and pick up when it suits you.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span
                className="flex items-center gap-2 rounded-full px-5 py-[10px] text-[11.5px] font-medium"
                style={{ background: C.choco, color: C.cream }}
              >
                Order for pickup <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span
                className="rounded-full px-5 py-[10px] text-[11.5px] font-medium"
                style={{ border: `1px solid ${C.choco}33` }}
              >
                Explore menu
              </span>
            </div>
          </div>

          {/* Hero dessert */}
          <div className="relative flex-1">
            <div
              className="absolute left-1/2 top-[8px] h-[236px] w-[236px] -translate-x-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle at 40% 35%, #F3DCC2, #E8C39E 60%, #D9A97E)' }}
            />
            <DessertCup {...hero} className="absolute left-1/2 top-[-6px] h-[262px] w-[200px] -translate-x-1/2" />

            {/* Live order tracking card */}
            <div
              className="absolute bottom-[14px] left-[6px] w-[190px] rounded-[14px] p-3"
              style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: '0 16px 30px -14px rgba(59,36,22,0.35)' }}
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold">Order #BL-2048</p>
                <span className="flex items-center gap-1 text-[8.5px] font-semibold" style={{ color: '#15803D' }}>
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" /> Live
                </span>
              </div>
              <div className="mt-2.5 flex items-center">
                {['Placed', 'Preparing', 'Ready'].map((step, i) => (
                  <div key={step} className="flex flex-1 items-center last:flex-none">
                    <span
                      className="grid h-[14px] w-[14px] place-items-center rounded-full"
                      style={{ background: i < 2 ? C.choco : C.line }}
                    >
                      {i < 2 ? <Check className="h-2 w-2 text-white" strokeWidth={3} /> : null}
                    </span>
                    {i < 2 ? <span className="h-[2px] flex-1" style={{ background: i === 0 ? C.choco : C.caramelLight }} /> : null}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[9px]" style={{ color: C.choco2 }}>
                Preparing · ready for pickup soon
              </p>
            </div>

            <span
              className="absolute right-[18px] top-[30px] rounded-full px-3 py-[6px] text-[9.5px] font-semibold"
              style={{ background: C.card, border: `1px solid ${C.line}` }}
            >
              Fresh today
            </span>
          </div>
        </div>

        {/* Category filter */}
        <div className="relative mt-[6px] flex items-center gap-2 px-[30px]">
          {['All', 'Cream cups', 'Cakes', 'Puddings', 'Seasonal'].map((c, i) => (
            <span
              key={c}
              className="rounded-full px-3.5 py-[6px] text-[10.5px]"
              style={{
                background: i === 0 ? C.choco : 'transparent',
                color: i === 0 ? C.cream : C.choco2,
                border: `1px solid ${i === 0 ? C.choco : C.line}`,
                fontWeight: i === 0 ? 600 : 400,
              }}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Product cards */}
        <div className="relative mt-[14px] grid grid-cols-4 gap-[14px] px-[30px]">
          {menu.map((item) => (
            <div key={item.name} className="rounded-[18px] p-2.5" style={{ background: C.card, border: `1px solid ${C.line}` }}>
              <div className="relative grid h-[100px] place-items-center overflow-hidden rounded-[13px]" style={{ background: item.bg }}>
                <DessertCup {...item.cup} className="h-[92px] w-[70px] translate-y-1" />
              </div>
              <div className="flex items-end justify-between px-1 pb-0.5 pt-2.5">
                <div>
                  <p className="text-[12px] font-semibold leading-tight" style={serif}>{item.name}</p>
                  <p className="mt-1 text-[11px] font-semibold" style={{ color: C.caramel }}>{item.price}</p>
                </div>
                <span className="grid h-[24px] w-[24px] place-items-center rounded-full" style={{ background: C.choco }}>
                  <Plus className="h-3 w-3 text-white" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}

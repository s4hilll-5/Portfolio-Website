import { useId } from 'react'
import {
  Bell,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ChartColumn,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
} from 'lucide-react'
import BrowserFrame from './BrowserFrame'

// Illustrative concept of the StudentHub dashboard (sample data, not a screenshot).

const C = {
  bg: '#0A0F1E',
  panel: '#10172E',
  line: 'rgba(255,255,255,0.06)',
  text: '#E6E9F5',
  muted: '#8B93B0',
  indigo: '#818CF8',
  cyan: '#22D3EE',
  green: '#34D399',
  amber: '#FBBF24',
  rose: '#FB7185',
}

// Catmull-Rom → cubic Bézier for a smooth chart line
function smoothPath(points) {
  return points.reduce((d, [x, y], i, arr) => {
    if (i === 0) return `M${x},${y}`
    const [x0, y0] = arr[i - 2] ?? arr[i - 1]
    const [x1, y1] = arr[i - 1]
    const [x3, y3] = arr[i + 1] ?? [x, y]
    const c1 = [x1 + (x - x0) / 6, y1 + (y - y0) / 6]
    const c2 = [x - (x3 - x1) / 6, y - (y3 - y1) / 6]
    return `${d} C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${x},${y}`
  }, '')
}

const W = 420
const H = 120
const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']
const toPoints = (values) => values.map((v, i) => [(i / (values.length - 1)) * W, H - (v / 100) * H])
const current = toPoints([42, 48, 46, 58, 62, 60, 72, 78])
const previous = toPoints([36, 40, 44, 41, 49, 52, 50, 57])

const sidebar = [LayoutDashboard, ClipboardList, CalendarCheck, CalendarDays, FileText, ChartColumn]

const subjects = [
  { name: 'Data Structures', value: 96, color: C.cyan },
  { name: 'Database Systems', value: 92, color: C.indigo },
  { name: 'Web Technologies', value: 89, color: C.green },
  { name: 'Operating Systems', value: 84, color: C.amber },
]

const assignments = [
  { title: 'ER diagram for library system', subject: 'Database Systems', due: 'Tomorrow', color: C.rose },
  { title: 'Linked list operations', subject: 'Data Structures', due: 'Thu', color: C.amber },
  { title: 'Responsive portfolio page', subject: 'Web Technologies', due: 'Mon', color: C.green },
]

const timetable = [
  { time: '09:00', subject: 'Data Structures', room: 'Lab 2' },
  { time: '11:15', subject: 'Database Systems', room: 'Room 304' },
  { time: '14:00', subject: 'Study block · Revision', room: 'Planner' },
]

function Panel({ title, right, className = '', children }) {
  return (
    <div className={`rounded-[14px] p-4 ${className}`} style={{ background: C.panel, border: `1px solid ${C.line}` }}>
      <div className="flex items-center justify-between">
        <p className="text-[11.5px] font-semibold">{title}</p>
        {right}
      </div>
      {children}
    </div>
  )
}

export default function StudentHubMockup() {
  const id = useId().replace(/:/g, '')
  const ring = 2 * Math.PI * 15

  return (
    <BrowserFrame title="StudentHub — Dashboard">
      <div className="absolute inset-0 flex overflow-hidden font-sans" style={{ background: C.bg, color: C.text }}>
        {/* Sidebar */}
        <aside
          className="flex w-[62px] flex-col items-center py-4"
          style={{ borderRight: `1px solid ${C.line}`, background: '#0C1226' }}
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-xl"
            style={{ background: 'linear-gradient(135deg, #6366F1, #22D3EE)' }}
          >
            <GraduationCap className="h-[18px] w-[18px] text-white" />
          </span>
          <div className="mt-6 flex flex-1 flex-col gap-2">
            {sidebar.map((Icon, i) => (
              <span
                key={i}
                className="grid h-9 w-9 place-items-center rounded-xl"
                style={{
                  background: i === 0 ? 'rgba(129,140,248,0.16)' : 'transparent',
                  color: i === 0 ? C.indigo : C.muted,
                }}
              >
                <Icon className="h-[16px] w-[16px]" />
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2" style={{ color: C.muted }}>
            <span className="grid h-9 w-9 place-items-center"><Settings className="h-4 w-4" /></span>
            <span className="grid h-9 w-9 place-items-center"><LogOut className="h-4 w-4" /></span>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 px-[22px] py-[18px]">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[19px] font-semibold tracking-tight">Dashboard</p>
              <p className="mt-0.5 text-[10.5px]" style={{ color: C.muted }}>
                Monday · Week 7 of the semester
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-[30px] w-[150px] items-center gap-2 rounded-lg px-2.5 text-[10.5px]"
                style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.muted }}
              >
                <Search className="h-3 w-3" /> Search…
              </span>
              <span
                className="relative grid h-[30px] w-[30px] place-items-center rounded-lg"
                style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.muted }}
              >
                <Bell className="h-3.5 w-3.5" />
                <span className="absolute right-[7px] top-[6px] h-1.5 w-1.5 rounded-full" style={{ background: C.rose }} />
              </span>
              <span
                className="rounded-md px-2 py-1 text-[9.5px] font-semibold"
                style={{ background: 'rgba(52,211,153,0.12)', color: C.green }}
              >
                STUDENT
              </span>
              <span className="h-[30px] w-[30px] rounded-full" style={{ background: 'linear-gradient(135deg,#F0ABFC,#818CF8)' }} />
            </div>
          </div>

          {/* Stat cards */}
          <div className="mt-4 grid grid-cols-4 gap-3">
            <div className="flex items-center justify-between rounded-[14px] p-3.5" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
              <div>
                <p className="text-[10px]" style={{ color: C.muted }}>Attendance</p>
                <p className="mt-1 text-[20px] font-semibold">92%</p>
                <p className="text-[9.5px]" style={{ color: C.green }}>Above 75% target</p>
              </div>
              <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
                <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                <circle
                  cx="20" cy="20" r="15" fill="none" stroke={C.cyan} strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={`${ring * 0.92} ${ring}`} transform="rotate(-90 20 20)"
                />
              </svg>
            </div>
            {[
              { label: 'Assignments', value: '3 due', note: 'This week', color: C.amber },
              { label: 'Next exam', value: '6 days', note: 'Database Systems', color: C.indigo },
            ].map((s) => (
              <div key={s.label} className="rounded-[14px] p-3.5" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
                <p className="flex items-center gap-1.5 text-[10px]" style={{ color: C.muted }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                  {s.label}
                </p>
                <p className="mt-1 text-[20px] font-semibold">{s.value}</p>
                <p className="text-[9.5px]" style={{ color: C.muted }}>{s.note}</p>
              </div>
            ))}
            <div className="rounded-[14px] p-3.5" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
              <p className="text-[10px]" style={{ color: C.muted }}>Study plan</p>
              <p className="mt-1 text-[20px] font-semibold">
                14.5h <span className="text-[11px] font-normal" style={{ color: C.muted }}>/ 18h</span>
              </p>
              <div className="mt-2 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="h-full w-[80%] rounded-full" style={{ background: `linear-gradient(90deg, ${C.indigo}, ${C.cyan})` }} />
              </div>
            </div>
          </div>

          {/* Chart + attendance */}
          <div className="mt-3 grid grid-cols-[1.6fr_1fr] gap-3">
            <Panel
              title="Academic progress"
              right={
                <div className="flex items-center gap-3 text-[9.5px]" style={{ color: C.muted }}>
                  <span className="flex items-center gap-1.5"><span className="h-1.5 w-3 rounded-full" style={{ background: C.cyan }} />This semester</span>
                  <span className="flex items-center gap-1.5"><span className="h-1.5 w-3 rounded-full" style={{ background: C.indigo, opacity: 0.6 }} />Last semester</span>
                </div>
              }
            >
              <svg viewBox={`0 -6 ${W} ${H + 24}`} className="mt-2 h-[132px] w-full" aria-hidden="true">
                <defs>
                  <linearGradient id={`${id}area`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={C.cyan} stopOpacity="0.32" />
                    <stop offset="1" stopColor={C.cyan} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                  <line key={t} x1="0" x2={W} y1={H * t} y2={H * t} stroke="rgba(255,255,255,0.05)" />
                ))}
                <path d={`${smoothPath(current)} L${W},${H} L0,${H} Z`} fill={`url(#${id}area)`} />
                <path d={smoothPath(previous)} fill="none" stroke={C.indigo} strokeOpacity="0.6" strokeWidth="1.6" strokeDasharray="4 4" />
                <path d={smoothPath(current)} fill="none" stroke={C.cyan} strokeWidth="2.2" />
                <circle cx={current[6][0]} cy={current[6][1]} r="4" fill={C.bg} stroke={C.cyan} strokeWidth="2" />
                <g transform={`translate(${current[6][0] - 26}, ${current[6][1] - 30})`}>
                  <rect width="52" height="18" rx="5" fill="#1B2547" />
                  <text x="26" y="12.5" textAnchor="middle" fontSize="9" fill={C.text} fontWeight="600">72 / 100</text>
                </g>
                {weeks.map((w, i) => (
                  <text key={w} x={(i / (weeks.length - 1)) * W} y={H + 16} fontSize="8.5" fill={C.muted} textAnchor={i === 0 ? 'start' : i === weeks.length - 1 ? 'end' : 'middle'}>
                    {w}
                  </text>
                ))}
              </svg>
            </Panel>

            <Panel title="Attendance by subject" right={<span className="text-[9.5px]" style={{ color: C.muted }}>This term</span>}>
              <div className="mt-3.5 space-y-3">
                {subjects.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-[10px]">
                      <span>{s.name}</span>
                      <span style={{ color: C.muted }}>{s.value}%</span>
                    </div>
                    <div className="mt-1.5 h-[5px] rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* Assignments + timetable */}
          <div className="mt-3 grid grid-cols-[1.25fr_1fr] gap-3">
            <Panel title="Upcoming assignments" right={<span className="text-[9.5px]" style={{ color: C.indigo }}>View all</span>}>
              <div className="mt-2.5 space-y-2">
                {assignments.map((a) => (
                  <div key={a.title} className="flex items-center gap-2.5 rounded-lg px-2 py-[7px]" style={{ background: 'rgba(255,255,255,0.025)' }}>
                    <BookOpen className="h-3.5 w-3.5 shrink-0" style={{ color: a.color }} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10.5px] font-medium">{a.title}</p>
                      <p className="text-[9px]" style={{ color: C.muted }}>{a.subject}</p>
                    </div>
                    <span className="rounded-md px-1.5 py-[2px] text-[9px] font-medium" style={{ background: `${a.color}22`, color: a.color }}>
                      {a.due}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="Today's timetable" right={<CalendarDays className="h-3.5 w-3.5" style={{ color: C.muted }} />}>
              <div className="mt-2.5 space-y-2">
                {timetable.map((t, i) => (
                  <div key={t.time} className="flex items-center gap-3">
                    <span className="w-[34px] text-[9.5px] font-medium" style={{ color: C.muted }}>{t.time}</span>
                    <span className="h-[30px] w-[3px] rounded-full" style={{ background: [C.cyan, C.indigo, C.green][i] }} />
                    <div>
                      <p className="text-[10.5px] font-medium">{t.subject}</p>
                      <p className="text-[9px]" style={{ color: C.muted }}>{t.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

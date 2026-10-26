import ScaleBox from '../ui/ScaleBox'
import StaySmartMockup from './StaySmartMockup'
import StudentHubMockup from './StudentHubMockup'
import BaeLabanMockup from './BaeLabanMockup'

const mockups = {
  'stay-smart': StaySmartMockup,
  studenthub: StudentHubMockup,
  'bae-laban': BaeLabanMockup,
}

// Every mockup is drawn at 880×560 and scaled to fit its container.
export const MOCKUP_WIDTH = 880
export const MOCKUP_HEIGHT = 560

export default function ProjectMockup({ name, className = '' }) {
  const Mockup = mockups[name]
  if (!Mockup) return null
  return (
    <ScaleBox width={MOCKUP_WIDTH} height={MOCKUP_HEIGHT} className={className}>
      <Mockup />
    </ScaleBox>
  )
}

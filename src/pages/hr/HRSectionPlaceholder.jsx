import { useLocation } from 'react-router-dom'
import {
  Users,
  FileCheck,
  ClipboardCheck,
  ChartNoAxesCombined,
  Settings,
  Construction,
} from 'lucide-react'

import './HRSectionPlaceholder.css'

const sections = {
  '/hr/nurses': {
    title: 'Nurse Directory',
    description: 'View and manage the nursing workforce registered under your hospital.',
    icon: Users,
  },
  '/hr/licences': {
    title: 'Licence Monitoring',
    description: 'Monitor professional licence validity and upcoming expiry dates.',
    icon: FileCheck,
  },
  '/hr/employment': {
    title: 'Employment Verification',
    description: 'Review and confirm employment records for nurses associated with your hospital.',
    icon: ClipboardCheck,
  },
  '/hr/reports': {
    title: 'Reports',
    description: 'Review workforce and professional licence compliance reports.',
    icon: ChartNoAxesCombined,
  },
  '/hr/settings': {
    title: 'Settings',
    description: 'View your hospital account and institutional preferences.',
    icon: Settings,
  },
}

function HRSectionPlaceholder() {
  const location = useLocation()
  const section = sections[location.pathname] || sections['/hr/nurses']
  const Icon = section.icon

  return (
    <section className="hr-placeholder">
      <span className="hr-dashboard-eyebrow">HOSPITAL ADMINISTRATION</span>

      <div className="hr-placeholder-icon">
        <Icon size={28} />
      </div>

      <h1>{section.title}</h1>
      <p>{section.description}</p>

      <div className="hr-placeholder-notice">
        <Construction size={19} />
        <span>This section is being developed.</span>
      </div>
    </section>
  )
}

export default HRSectionPlaceholder
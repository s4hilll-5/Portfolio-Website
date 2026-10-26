import {
  Atom,
  Braces,
  Database,
  LayoutTemplate,
  Lightbulb,
  MonitorSmartphone,
  Server,
  ShieldCheck,
  Wrench,
} from 'lucide-react'

// Maps icon names used in the data files to Lucide components.
// Importing them explicitly keeps the bundle tree-shaken.
const icons = {
  Atom,
  Braces,
  Database,
  LayoutTemplate,
  Lightbulb,
  MonitorSmartphone,
  Server,
  ShieldCheck,
  Wrench,
}

export default function Icon({ name, ...props }) {
  const Component = icons[name]
  if (!Component) return null
  return <Component aria-hidden="true" {...props} />
}

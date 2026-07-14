// Minimal inline stroke icons (no external dependency), 24x24 viewBox.
const S = ({ children, size = 18, ...p }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    {children}
  </svg>
)

export const IconDashboard = (p) => (
  <S {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></S>
)
export const IconOpp = (p) => (
  <S {...p}><path d="M3 7h18M3 7l2-3h14l2 3M5 7v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7" /><path d="M9 11h6" /></S>
)
export const IconChecklist = (p) => (
  <S {...p}><path d="M9 5h9M9 12h9M9 19h9" /><path d="M4 5l1 1 1.5-1.8M4 12l1 1 1.5-1.8M4 19l1 1 1.5-1.8" /></S>
)
export const IconTrophy = (p) => (
  <S {...p}><path d="M6 4h12v4a6 6 0 0 1-12 0V4Z" /><path d="M6 6H4a2 2 0 0 0 0 4h2M18 6h2a2 2 0 0 1 0 4h-2M10 15h4M9 20h6M12 15v5" /></S>
)
export const IconBook = (p) => (
  <S {...p}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" /><path d="M4 5v14" /></S>
)
export const IconGear = (p) => (
  <S {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 0 1-4 0v-.1A1.7 1.7 0 0 0 6 19.7l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15H2.9a2 2 0 0 1 0-4H3a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 3.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.5 11H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 0Z" /></S>
)
export const IconBell = (p) => (
  <S {...p}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" /></S>
)
export const IconEdit = (p) => (
  <S {...p}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></S>
)
export const IconCheck = (p) => (
  <S {...p}><path d="M20 6 9 17l-5-5" /></S>
)
export const IconCheckCircle = (p) => (
  <S {...p}><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 5-5" /></S>
)
export const IconAlert = (p) => (
  <S {...p}><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /></S>
)
export const IconFlag = (p) => (
  <S {...p}><path d="M4 22V4M4 4h13l-2 4 2 4H4" /></S>
)
export const IconLink = (p) => (
  <S {...p}><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" /></S>
)
export const IconSpark = (p) => (
  <S {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /><circle cx="12" cy="12" r="2.5" /></S>
)
export const IconPlus = (p) => (
  <S {...p}><path d="M12 5v14M5 12h14" /></S>
)
export const IconMenu = (p) => (
  <S {...p}><path d="M4 6h16M4 12h16M4 18h16" /></S>
)
export const IconChevron = (p) => (
  <S {...p}><path d="m9 18 6-6-6-6" /></S>
)
export const IconLock = (p) => (
  <S {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></S>
)
export const IconArrowLeft = (p) => (
  <S {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></S>
)
export const IconTrash = (p) => (
  <S {...p}><path d="M3 6h18M8 6V4h8v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" /></S>
)
export const IconSearch = (p) => (
  <S {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></S>
)
export const IconClose = (p) => (
  <S {...p}><path d="M18 6 6 18M6 6l12 12" /></S>
)

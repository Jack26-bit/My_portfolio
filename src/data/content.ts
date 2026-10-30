// All portfolio content — sourced verbatim from README.md
// Lines marked [ADD] need real values before deploying.

export interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  href: string | null
}

export interface ResearchItem {
  id: string
  title: string
  description: string
}

export interface Highlight {
  id: string
  label: string
  title: string
  description: string
}

export interface ExperienceItem {
  year: string
  role: string
  org: string
  summary: string
}

export interface EducationItem {
  year: string
  degree: string
  school: string
}

export const PROFILE = {
  name: 'Neeraj Kiran Janakula',
  tagline: 'AI/ML engineer and space-tech builder from Bengaluru.',
  bio: 'B.Tech student in Artificial Intelligence & Machine Learning at REVA University. ML Lead on a CubeSat/NavIC AI research project, and Co-Founder & CTO of an early-stage startup.',
  location: 'Bengaluru, India',
  email: 'neerajkiran26@gmail.com',
  github: 'https://github.com/Jack26-bit',
  linkedin: 'https://www.linkedin.com/in/neeraj-kiran-janakula-904643384',
  seeking: 'Internships in AI/ML, remote sensing, embedded systems and space technology.',
  roles: ['AI/ML Engineer', 'Space-Tech Builder', 'Full-Stack Developer'] as const,
} as const

export const RESEARCH: ResearchItem[] = [
  {
    id: 'space-weather',
    title: 'Space Weather ML',
    description:
      'Building an electron flux forecasting pipeline for geostationary orbit for the ISRO Bharatiya Antariksh Hackathon 2026 (Team GEO Explorer). CatBoost/XGBoost with LSTM/Transformer models, SHAP explainability, multi-horizon forecasts and validation against GRASP/GSAT data.',
  },
  {
    id: 'navic',
    title: 'NavIC / GNSS Research',
    description:
      'Studying ionospheric scintillation and ML for time-series prediction. Designing a CubeSat payload concept for scintillation prediction.',
  },
  {
    id: 'startup',
    title: 'Startup',
    description: 'Led the full-stack MVP as CTO.',
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'echo-resqnet',
    title: 'ECHO / ResqNet',
    description:
      'Emergency response apps with BLE mesh, SOS broadcast and Gemini AI chat.',
    stack: ['Flutter', 'Firebase', 'Gemini'],
    href: 'https://github.com/Jack26-bit/Resq',
  },
  {
    id: 'cansat',
    title: 'CanSat Live Telemetry',
    description: 'Open-source live telemetry for CanSat missions.',
    stack: ['Arduino', 'ESP32', 'Embedded C++'],
    href: 'https://github.com/Jack26-bit/How-to-build-a-Cansat',
  },
  {
    id: 'iko',
    title: 'IKO',
    description: 'Gamified productivity app with RPG-style quests.',
    stack: ['Flutter', 'Python'],
    href: 'https://github.com/Jack26-bit/IKO',
  },
  {
    id: 'e-profile',
    title: 'E-Profile',
    description: 'Personal portfolio site.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    href: 'https://e-profile-six.vercel.app',
  },
]

export const HIGHLIGHTS: Highlight[] = [
  {
    id: 'iot-expo',
    label: '1st Prize',
    title: 'IoT Expo 2025',
    description:
      'CanSat Live Telemetry System — recognised for excellence in embedded systems, IoT and aerospace engineering.',
  },
  {
    id: 'decode-sih',
    label: 'Top 50 of 15,000+',
    title: 'Decode SIH Finalist',
    description:
      'Remote-sensing project that detects polluted rivers used by villages for drinking water.',
  },
  {
    id: 'smartideathon',
    label: 'Top 100',
    title: 'SmartIDEAthon 2025',
    description:
      'Selected among thousands of national teams at the ideation stage.',
  },
  {
    id: 'google-build-ai',
    label: 'Submission',
    title: 'Google Build with AI 2026',
    description:
      'ResQ — AI-driven emergency-response platform with voice-to-text reporting and ML-based request classification.',
  },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    year: '2026 —',
    role: 'Machine Learning Lead',
    org: 'CubeSat Payload Research',
    summary:
      'Researching AI/ML for real-time NavIC/GNSS ionospheric-scintillation prediction and automated interference classification.',
  },
  {
    year: '2025 — 2026',
    role: 'Co-Founder & CTO',
    org: 'Startup Venture',
    summary:
      'Architected and led end-to-end product development — full-stack frontend, backend APIs, database design, cloud deployment. Top 100 Team at SmartIDEAthon 2025.',
  },
  {
    year: '2026',
    role: 'Full-Stack & AI/ML Developer',
    org: 'ResQ · Google Build with AI',
    summary:
      'Built an AI-powered emergency-response platform — voice-to-text reporting, ML request classification, secure REST backend, real-time coordination.',
  },
  {
    year: '2025',
    role: 'Embedded · Aerospace Builder',
    org: 'CanSat Live Telemetry',
    summary:
      'Designed and built an end-to-end CanSat platform on ESP32. Won 1st Prize at IoT Expo 2025.',
  },
]

export const EDUCATION: EducationItem[] = [
  {
    year: '2025 — 2029',
    degree: 'B.Tech, Artificial Intelligence & Machine Learning',
    school: 'REVA University, Bangalore',
  },
  {
    year: '2023 — 2025',
    degree: 'Pre-University · PCMC (Physics · Chem · Math · CS)',
    school: 'Nagarjuna Pre-University College',
  },
  {
    year: '2023',
    degree: 'ICSE — 10th Standard',
    school: 'Euro School',
  },
]

export const SKILLS = {
  languages: ['Python', 'Embedded C++', 'C'],
  ml: ['TensorFlow', 'PyTorch', 'OpenCV', 'CatBoost', 'XGBoost', 'LSTM', 'Transformers'],
  web: ['React', 'Next.js', 'Node.js', 'Flutter', 'Firebase'],
  hardware: ['ESP32', 'Arduino', 'GCP'],
  domains: ['CubeSat development', 'NavIC/GNSS', 'Remote sensing', 'Time-series forecasting'],
} as const

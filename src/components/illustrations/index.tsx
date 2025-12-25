import React from "react";

// Hero Illustration - Environmental Action & Planet
export const HeroEarthIllustration = () => (
  <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background Circle - Sky */}
    <circle cx="250" cy="250" r="240" fill="url(#skyGradient)" />
    
    {/* Earth Globe */}
    <circle cx="250" cy="250" r="180" fill="url(#earthGradient)" />
    
    {/* Continents */}
    <path
      d="M180 200 Q200 180 220 190 L240 180 Q250 185 260 195 L280 190 Q290 200 285 220 L270 240 Q260 250 250 245 L230 250 Q220 240 215 230 L200 220 Q185 210 180 200Z"
      fill="#A0C878"
      opacity="0.9"
    />
    <path
      d="M300 260 Q320 250 340 265 L350 280 Q345 300 330 310 L315 305 Q305 295 300 280 Z"
      fill="#7FAF5C"
      opacity="0.9"
    />
    <path
      d="M200 290 Q210 280 225 285 L235 300 Q230 315 215 320 L205 310 Z"
      fill="#A0C878"
      opacity="0.9"
    />
    
    {/* Trees on Earth - Left side */}
    <g transform="translate(150, 240)">
      <path d="M0 20 L-8 5 L-4 5 L-6 -5 L-3 -5 L-5 -15 L0 -20 L5 -15 L3 -5 L6 -5 L4 5 L8 5 Z" fill="#27667B" />
      <rect x="-2" y="20" width="4" height="12" fill="#8B4513" />
    </g>
    <g transform="translate(180, 255)">
      <path d="M0 15 L-6 3 L-3 3 L-4 -3 L-2 -3 L-3 -10 L0 -15 L3 -10 L2 -3 L4 -3 L3 3 L6 3 Z" fill="#27667B" />
      <rect x="-1.5" y="15" width="3" height="10" fill="#8B4513" />
    </g>
    
    {/* Trees on Earth - Right side */}
    <g transform="translate(320, 250)">
      <path d="M0 20 L-8 5 L-4 5 L-6 -5 L-3 -5 L-5 -15 L0 -20 L5 -15 L3 -5 L6 -5 L4 5 L8 5 Z" fill="#7FAF5C" />
      <rect x="-2" y="20" width="4" height="12" fill="#8B4513" />
    </g>
    
    {/* Wind Turbines around Earth */}
    <g transform="translate(140, 180)">
      <rect x="-2" y="0" width="4" height="40" fill="#0C2B4E" />
      <ellipse cx="0" cy="-5" rx="3" ry="20" fill="#FCB53B" opacity="0.8" transform="rotate(0)" />
      <ellipse cx="0" cy="-5" rx="3" ry="20" fill="#FCB53B" opacity="0.8" transform="rotate(120)" />
      <ellipse cx="0" cy="-5" rx="3" ry="20" fill="#FCB53B" opacity="0.8" transform="rotate(240)" />
      <circle cx="0" cy="0" r="4" fill="#27667B" />
    </g>
    
    <g transform="translate(360, 190)">
      <rect x="-2" y="0" width="4" height="35" fill="#0C2B4E" />
      <ellipse cx="0" cy="-5" rx="3" ry="18" fill="#DDEB9D" opacity="0.9" transform="rotate(45)" />
      <ellipse cx="0" cy="-5" rx="3" ry="18" fill="#DDEB9D" opacity="0.9" transform="rotate(165)" />
      <ellipse cx="0" cy="-5" rx="3" ry="18" fill="#DDEB9D" opacity="0.9" transform="rotate(285)" />
      <circle cx="0" cy="0" r="4" fill="#27667B" />
    </g>
    
    {/* Solar Panel */}
    <g transform="translate(370, 300)">
      <rect x="0" y="0" width="50" height="30" fill="#143D60" stroke="#0C2B4E" strokeWidth="2" />
      <line x1="25" y1="0" x2="25" y2="30" stroke="#FCB53B" strokeWidth="1" />
      <line x1="0" y1="15" x2="50" y2="15" stroke="#FCB53B" strokeWidth="1" />
      <line x1="0" y1="0" x2="25" y2="40" stroke="#8B4513" strokeWidth="2" />
    </g>
    
    {/* Recycling Symbol */}
    <g transform="translate(120, 310)">
      <path
        d="M10 5 L15 15 L8 15 L12 20 M20 8 L15 15 M5 15 L10 8 L15 5 L12 10"
        stroke="#A0C878"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12.5" cy="12.5" r="15" fill="none" stroke="#7FAF5C" strokeWidth="2" strokeDasharray="4 2" />
    </g>
    
    {/* Orbiting Leaves/Actions */}
    <g transform="translate(250, 250)">
      {/* Leaf 1 */}
      <ellipse cx="0" cy="-220" rx="12" ry="20" fill="#A0C878" opacity="0.7" />
      <line x1="0" y1="-220" x2="0" y2="-205" stroke="#27667B" strokeWidth="1.5" />
      
      {/* Leaf 2 */}
      <ellipse cx="200" cy="-80" rx="12" ry="20" fill="#DDEB9D" opacity="0.7" transform="rotate(45 200 -80)" />
      <line x1="200" y1="-80" x2="195" y2="-68" stroke="#27667B" strokeWidth="1.5" />
      
      {/* Leaf 3 */}
      <ellipse cx="-190" cy="90" rx="12" ry="20" fill="#7FAF5C" opacity="0.7" transform="rotate(-30 -190 90)" />
      <line x1="-190" y1="90" x2="-188" y2="102" stroke="#27667B" strokeWidth="1.5" />
    </g>
    
    {/* CO2 Reduction indicator */}
    <g transform="translate(430, 250)">
      <circle cx="0" cy="0" r="28" fill="rgba(252, 181, 59, 0.2)" />
      <path d="M-8 0 L8 -10 L4 0 L8 10 Z" fill="#FCB53B" />
      <text x="15" y="6" fill="#FCB53B" fontSize="22" fontWeight="bold">CO₂</text>
      <text x="15" y="20" fill="#5A9E5F" fontSize="18" fontWeight="bold">↓</text>
    </g>
    
    {/* Hearts/Care symbols */}
    <path d="M80 140 Q75 135 70 140 Q65 145 70 150 L80 160 L90 150 Q95 145 90 140 Q85 135 80 140 Z" fill="#FF6B9D" opacity="0.5" />
    <path d="M410 360 Q405 355 400 360 Q395 365 400 370 L410 380 L420 370 Q425 365 420 360 Q415 355 410 360 Z" fill="#FF6B9D" opacity="0.5" />
    
    {/* Sparkles/Stars */}
    <circle cx="100" cy="100" r="3" fill="#FCB53B" opacity="0.8" />
    <circle cx="390" cy="130" r="2.5" fill="#DDEB9D" opacity="0.8" />
    <circle cx="120" cy="380" r="3" fill="#A0C878" opacity="0.6" />
    <circle cx="380" cy="400" r="2" fill="#FCB53B" opacity="0.7" />
    
    {/* Gradients */}
    <defs>
      <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D0E8C5" />
        <stop offset="100%" stopColor="#F5F5F5" />
      </linearGradient>
      <linearGradient id="earthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#27667B" />
        <stop offset="50%" stopColor="#1E4F66" />
        <stop offset="100%" stopColor="#0C2B4E" />
      </linearGradient>
    </defs>
  </svg>
);

export const GreenTrackLogo = ({ size = 120 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Leaf Shape */}
    <path
      d="M100 20C80 20 65 35 55 55C45 75 40 100 45 120C50 140 65 155 85 165C95 170 105 170 115 165C135 155 150 140 155 120C160 100 155 75 145 55C135 35 120 20 100 20Z"
      fill="#A0C878"
    />
    {/* Vein */}
    <path
      d="M100 40C100 40 100 100 100 140"
      stroke="#0C2B4E"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Side Veins */}
    <path
      d="M100 70C100 70 85 75 75 85"
      stroke="#0C2B4E"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M100 70C100 70 115 75 125 85"
      stroke="#0C2B4E"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M100 100C100 100 80 105 70 115"
      stroke="#0C2B4E"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M100 100C100 100 120 105 130 115"
      stroke="#0C2B4E"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Circle for tracking */}
    <circle cx="100" cy="160" r="25" fill="#FCB53B" opacity="0.8" />
    <text
      x="100"
      y="168"
      textAnchor="middle"
      fill="#0C2B4E"
      fontSize="20"
      fontWeight="bold"
    >
      CO₂
    </text>
  </svg>
);

export const TreeIllustration = () => (
  <svg width="300" height="250" viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ground */}
    <ellipse cx="150" cy="230" rx="120" ry="15" fill="#D0E8C5" opacity="0.5" />
    
    {/* Tree Trunk */}
    <rect x="135" y="140" width="30" height="90" rx="5" fill="#8B4513" />
    
    {/* Tree Foliage - Multiple circles */}
    <circle cx="150" cy="100" r="50" fill="#A0C878" />
    <circle cx="120" cy="120" r="40" fill="#A0C878" />
    <circle cx="180" cy="120" r="40" fill="#A0C878" />
    <circle cx="140" cy="70" r="35" fill="#DDEB9D" />
    <circle cx="165" cy="75" r="30" fill="#DDEB9D" />
    
    {/* Leaves accents */}
    <circle cx="110" cy="110" r="15" fill="#DDEB9D" opacity="0.8" />
    <circle cx="190" cy="110" r="15" fill="#DDEB9D" opacity="0.8" />
    
    {/* Small birds */}
    <path d="M 200 50 Q 205 45 210 50" stroke="#0C2B4E" strokeWidth="2" fill="none" />
    <path d="M 210 50 Q 215 45 220 50" stroke="#0C2B4E" strokeWidth="2" fill="none" />
  </svg>
);

export const EarthIllustration = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Earth Circle */}
    <circle cx="100" cy="100" r="80" fill="#27667B" />
    
    {/* Continents - Abstract shapes */}
    <path
      d="M 70 60 Q 80 50 100 55 Q 120 60 125 75 L 115 85 Q 105 80 95 85 L 85 75 Q 75 70 70 60 Z"
      fill="#A0C878"
    />
    <path
      d="M 130 90 Q 140 85 150 90 L 155 105 Q 150 115 140 110 L 135 100 Z"
      fill="#A0C878"
    />
    <path
      d="M 60 110 Q 70 105 80 110 Q 85 120 80 130 L 65 125 Z"
      fill="#A0C878"
    />
    <path
      d="M 95 120 Q 110 115 120 125 Q 125 135 115 145 L 100 140 Q 90 130 95 120 Z"
      fill="#A0C878"
    />
    
    {/* Clouds */}
    <ellipse cx="70" cy="50" rx="15" ry="8" fill="#FFFFFF" opacity="0.6" />
    <ellipse cx="140" cy="70" rx="12" ry="6" fill="#FFFFFF" opacity="0.6" />
    
    {/* Heart shape overlay */}
    <path
      d="M 100 140 Q 85 125 85 115 Q 85 105 92 105 Q 100 105 100 115 Q 100 105 108 105 Q 115 105 115 115 Q 115 125 100 140 Z"
      fill="#FCB53B"
      opacity="0.9"
    />
  </svg>
);

export const LeafLoadingIllustration = () => (
  <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="leaf-animate">
      <path
        d="M 75 30 Q 60 40 55 60 Q 50 80 55 95 Q 65 110 80 115 Q 90 117 100 110 Q 115 100 118 80 Q 120 60 110 45 Q 100 35 75 30 Z"
        fill="#A0C878"
      />
      <path d="M 75 40 L 75 110" stroke="#0C2B4E" strokeWidth="3" />
      <path d="M 75 60 Q 65 65 60 75" stroke="#0C2B4E" strokeWidth="2" />
      <path d="M 75 60 Q 85 65 90 75" stroke="#0C2B4E" strokeWidth="2" />
      <path d="M 75 85 Q 65 90 58 100" stroke="#0C2B4E" strokeWidth="2" />
      <path d="M 75 85 Q 85 90 92 100" stroke="#0C2B4E" strokeWidth="2" />
    </g>
  </svg>
);

export const EmailEnvelopeIllustration = () => (
  <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Envelope */}
    <rect x="20" y="40" width="160" height="100" rx="8" fill="#FFFFFF" stroke="#27667B" strokeWidth="3" />
    
    {/* Envelope flap */}
    <path
      d="M 20 40 L 100 100 L 180 40"
      fill="#A0C878"
      stroke="#27667B"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    
    {/* Email content lines */}
    <line x1="50" y1="90" x2="150" y2="90" stroke="#D0E8C5" strokeWidth="3" />
    <line x1="50" y1="105" x2="130" y2="105" stroke="#D0E8C5" strokeWidth="3" />
    <line x1="50" y1="120" x2="140" y2="120" stroke="#D0E8C5" strokeWidth="3" />
    
    {/* Leaf accent */}
    <ellipse cx="160" cy="55" rx="12" ry="18" fill="#FCB53B" transform="rotate(30 160 55)" />
  </svg>
);

export const LockSecurityIllustration = () => (
  <svg width="190" height="200" viewBox="0 0 190 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Lock body */}
    <rect x="50" y="90" width="90" height="90" rx="8" fill="#A0C878" />
    
    {/* Lock shackle */}
    <path
      d="M 70 90 V 60 Q 70 35 95 35 Q 120 35 120 60 V 90"
      stroke="#27667B"
      strokeWidth="8"
      fill="none"
      strokeLinecap="round"
    />
    
    {/* Keyhole */}
    <circle cx="95" cy="125" r="12" fill="#0C2B4E" />
    <rect x="90" y="130" width="10" height="25" rx="2" fill="#0C2B4E" />
    
    {/* Leaf decoration */}
    <ellipse cx="140" cy="100" rx="8" ry="12" fill="#FCB53B" transform="rotate(25 140 100)" />
    <ellipse cx="50" cy="100" rx="8" ry="12" fill="#FCB53B" transform="rotate(-25 50 100)" />
  </svg>
);

export const CarbonFootprintIllustration = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Calendar/Schedule Icon - Light & Modern */}
    <rect x="40" y="40" width="120" height="130" rx="12" fill="#FFFFFF" stroke="#D0E8C5" strokeWidth="3" />
    
    {/* Calendar Header */}
    <rect x="40" y="40" width="120" height="25" rx="12" fill="#D0E8C5" />
    <circle cx="70" cy="52.5" r="3" fill="#27667B" />
    <circle cx="130" cy="52.5" r="3" fill="#27667B" />
    
    {/* Date indicators - dots */}
    <circle cx="60" cy="90" r="4" fill="#A0C878" opacity="0.6" />
    <circle cx="80" cy="90" r="4" fill="#A0C878" opacity="0.6" />
    <circle cx="100" cy="90" r="4" fill="#FCB53B" />
    <circle cx="120" cy="90" r="4" fill="#A0C878" opacity="0.6" />
    <circle cx="140" cy="90" r="4" fill="#A0C878" opacity="0.6" />
    
    {/* Activity icons - minimal line style */}
    {/* Car - simplified */}
    <g transform="translate(55, 110)">
      <rect x="0" y="5" width="25" height="12" rx="2" fill="none" stroke="#27667B" strokeWidth="2" />
      <circle cx="6" cy="18" r="3" fill="#27667B" />
      <circle cx="19" cy="18" r="3" fill="#27667B" />
    </g>
    
    {/* Food - simplified */}
    <g transform="translate(105, 110)">
      <circle cx="10" cy="10" r="8" fill="none" stroke="#FCB53B" strokeWidth="2" />
      <path d="M 5 8 Q 10 5 15 8" stroke="#FCB53B" strokeWidth="1.5" fill="none" />
    </g>
    
    {/* Checkmark - modern */}
    <path d="M 48 127 L 52 131 L 58 123" stroke="#A0C878" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M 98 127 L 102 131 L 108 123" stroke="#FCB53B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    
    {/* Plus icon at bottom - light */}
    <g transform="translate(100, 150)">
      <circle cx="0" cy="0" r="12" fill="#F5F5F5" stroke="#D0E8C5" strokeWidth="2" />
      <line x1="0" y1="-6" x2="0" y2="6" stroke="#A0C878" strokeWidth="2" strokeLinecap="round" />
      <line x1="-6" y1="0" x2="6" y2="0" stroke="#A0C878" strokeWidth="2" strokeLinecap="round" />
    </g>
    
    {/* Decorative leaves - light */}
    <ellipse cx="25" cy="60" rx="5" ry="8" fill="#A0C878" opacity="0.3" transform="rotate(-20 25 60)" />
    <ellipse cx="175" cy="80" rx="5" ry="8" fill="#DDEB9D" opacity="0.3" transform="rotate(20 175 80)" />
  </svg>
);

export const RecycleIllustration = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Recycle symbol - three arrows in triangle */}
    <path
      d="M 100 40 L 70 90"
      stroke="#A0C878"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M 70 90 L 130 90"
      stroke="#A0C878"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M 130 90 L 100 40"
      stroke="#A0C878"
      strokeWidth="8"
      strokeLinecap="round"
    />
    
    {/* Arrow heads */}
    <path d="M 68 88 L 60 100 L 75 95 Z" fill="#A0C878" />
    <path d="M 132 88 L 140 85 L 130 75 Z" fill="#A0C878" />
    <path d="M 98 42 L 95 30 L 85 40 Z" fill="#A0C878" />
    
    {/* Center circle */}
    <circle cx="100" cy="73" r="15" fill="#FFFFFF" stroke="#27667B" strokeWidth="2" />
    <text x="100" y="80" textAnchor="middle" fill="#27667B" fontSize="18" fontWeight="bold">♻</text>
    
    {/* Leaves decoration */}
    <ellipse cx="50" cy="60" rx="8" ry="12" fill="#DDEB9D" transform="rotate(-20 50 60)" />
    <ellipse cx="150" cy="60" rx="8" ry="12" fill="#DDEB9D" transform="rotate(20 150 60)" />
    <ellipse cx="100" cy="130" rx="8" ry="12" fill="#DDEB9D" />
  </svg>
);

export const SolarPanelIllustration = () => (
  <svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Sun */}
    <circle cx="200" cy="40" r="25" fill="#FCB53B" />
    <g stroke="#FCB53B" strokeWidth="3" strokeLinecap="round">
      <line x1="200" y1="10" x2="200" y2="0" />
      <line x1="225" y1="40" x2="235" y2="40" />
      <line x1="220" y1="20" x2="228" y2="12" />
      <line x1="220" y1="60" x2="228" y2="68" />
    </g>
    
    {/* Solar panel stand */}
    <path d="M 80 160 L 120 100 L 160 160 Z" fill="#27667B" />
    
    {/* Solar panel */}
    <rect x="60" y="80" width="120" height="60" rx="4" fill="#0C2B4E" stroke="#27667B" strokeWidth="2" />
    
    {/* Panel grid */}
    <line x1="100" y1="80" x2="100" y2="140" stroke="#27667B" strokeWidth="1" />
    <line x1="140" y1="80" x2="140" y2="140" stroke="#27667B" strokeWidth="1" />
    <line x1="60" y1="110" x2="180" y2="110" stroke="#27667B" strokeWidth="1" />
    
    {/* Energy waves */}
    <path d="M 190 70 Q 195 75 190 80" stroke="#FCB53B" strokeWidth="2" fill="none" opacity="0.7" />
    <path d="M 185 85 Q 190 90 185 95" stroke="#FCB53B" strokeWidth="2" fill="none" opacity="0.7" />
    
    {/* Ground */}
    <ellipse cx="120" cy="170" rx="60" ry="8" fill="#D0E8C5" opacity="0.5" />
    
    {/* Small leaf accent */}
    <ellipse cx="40" cy="150" rx="10" ry="15" fill="#A0C878" transform="rotate(-30 40 150)" />
  </svg>
);

export const WindTurbineIllustration = () => (
  <svg width="200" height="240" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Tower */}
    <path d="M 95 100 L 100 220 L 105 100 Z" fill="#E5E7EB" stroke="#27667B" strokeWidth="2" />
    
    {/* Turbine center */}
    <circle cx="100" cy="100" r="12" fill="#27667B" />
    
    {/* Blades */}
    <ellipse cx="100" cy="60" rx="15" ry="45" fill="#FFFFFF" stroke="#27667B" strokeWidth="2" />
    <ellipse cx="130" cy="115" rx="45" ry="15" fill="#FFFFFF" stroke="#27667B" strokeWidth="2" transform="rotate(120 100 100)" />
    <ellipse cx="70" cy="115" rx="45" ry="15" fill="#FFFFFF" stroke="#27667B" strokeWidth="2" transform="rotate(240 100 100)" />
    
    {/* Ground */}
    <ellipse cx="100" cy="225" rx="70" ry="10" fill="#D0E8C5" opacity="0.5" />
    
    {/* Grass/plants */}
    <path d="M 40 220 Q 45 210 50 220" stroke="#A0C878" strokeWidth="2" fill="none" />
    <path d="M 50 220 Q 55 215 60 220" stroke="#A0C878" strokeWidth="2" fill="none" />
    <path d="M 140 220 Q 145 215 150 220" stroke="#A0C878" strokeWidth="2" fill="none" />
    <path d="M 150 220 Q 155 210 160 220" stroke="#A0C878" strokeWidth="2" fill="none" />
    
    {/* Clouds */}
    <ellipse cx="160" cy="40" rx="20" ry="10" fill="#FFFFFF" opacity="0.7" />
    <ellipse cx="50" cy="60" rx="15" ry="8" fill="#FFFFFF" opacity="0.7" />
  </svg>
);

export const EmptyStateIllustration = () => (
  <svg width="280" height="240" viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Empty box */}
    <rect x="70" y="80" width="140" height="120" rx="8" fill="#FFFFFF" stroke="#27667B" strokeWidth="3" strokeDasharray="8 4" />
    
    {/* Leaf inside box */}
    <path
      d="M 140 120 Q 125 125 120 140 Q 115 155 125 165 Q 135 172 145 167 Q 160 160 163 145 Q 165 130 155 122 Q 145 115 140 120 Z"
      fill="#D0E8C5"
    />
    <path d="M 140 125 L 140 165" stroke="#A0C878" strokeWidth="2" />
    
    {/* Question mark or empty indicator */}
    <text x="140" y="95" textAnchor="middle" fill="#27667B" fontSize="32" fontWeight="300">?</text>
    
    {/* Floating leaves */}
    <ellipse cx="240" cy="60" rx="8" ry="12" fill="#DDEB9D" opacity="0.6" transform="rotate(20 240 60)" />
    <ellipse cx="40" cy="100" rx="8" ry="12" fill="#DDEB9D" opacity="0.6" transform="rotate(-20 40 100)" />
    <ellipse cx="250" cy="160" rx="8" ry="12" fill="#A0C878" opacity="0.4" transform="rotate(45 250 160)" />
  </svg>
);

export const ChartGrowthIllustration = () => (
  <svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Chart axes */}
    <line x1="40" y1="160" x2="220" y2="160" stroke="#27667B" strokeWidth="2" />
    <line x1="40" y1="40" x2="40" y2="160" stroke="#27667B" strokeWidth="2" />
    
    {/* Rising bars */}
    <rect x="60" y="130" width="30" height="30" fill="#A0C878" opacity="0.7" />
    <rect x="100" y="110" width="30" height="50" fill="#A0C878" opacity="0.8" />
    <rect x="140" y="80" width="30" height="80" fill="#A0C878" opacity="0.9" />
    <rect x="180" y="50" width="30" height="110" fill="#A0C878" />
    
    {/* Trend line */}
    <path d="M 75 145 L 115 125 L 155 95 L 195 65" stroke="#FCB53B" strokeWidth="3" strokeLinecap="round" />
    <circle cx="75" cy="145" r="4" fill="#FCB53B" />
    <circle cx="115" cy="125" r="4" fill="#FCB53B" />
    <circle cx="155" cy="95" r="4" fill="#FCB53B" />
    <circle cx="195" cy="65" r="4" fill="#FCB53B" />
    
    {/* Arrow up */}
    <path d="M 195 65 L 185 75 M 195 65 L 205 75" stroke="#FCB53B" strokeWidth="3" strokeLinecap="round" />
    
    {/* Leaf accent on top bar */}
    <ellipse cx="195" cy="40" rx="8" ry="12" fill="#DDEB9D" transform="rotate(25 195 40)" />
  </svg>
);

export const SuccessCheckmarkIllustration = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Circle background */}
    <circle cx="100" cy="100" r="70" fill="#A0C878" opacity="0.2" />
    <circle cx="100" cy="100" r="60" fill="#A0C878" opacity="0.3" />
    
    {/* Checkmark */}
    <path
      d="M 70 100 L 90 120 L 130 75"
      stroke="#A0C878"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Leaf decorations */}
    <ellipse cx="140" cy="50" rx="10" ry="15" fill="#DDEB9D" transform="rotate(30 140 50)" />
    <ellipse cx="60" cy="60" rx="10" ry="15" fill="#DDEB9D" transform="rotate(-30 60 60)" />
    <ellipse cx="150" cy="140" rx="8" ry="12" fill="#FCB53B" opacity="0.8" transform="rotate(45 150 140)" />
  </svg>
);

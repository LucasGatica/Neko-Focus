import { CatType } from './types';

// Helper to encode SVG for Data URI using Base64 to prevent CSS parsing errors
const svgToDataUri = (svg: string) => {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

export const CAT_NAMES = [
  "Simba", "Felix", "Tom", "Romeo", "Oreo", "Garfield", "Luna", "Bella", "Nina", "Mia",
  "Mel", "Lola", "Chico", "Fred", "Mingau", "Paçoca", "Pipoca", "Thor", "Zeus", "Apolo",
  "Oliver", "Jack", "Milo", "Theo", "Salem", "Frajola", "Snow", "Coco", "Cookie", "Lucky",
  "Noel", "Claus", "Rudolph", "Merry"
];

export const CAT_QUOTES = [
  "Miau... (Aproveite o silêncio)",
  "Estou apenas descansando os olhos.",
  "Você está indo muito bem.",
  "Que tal um chá?",
  "Zzzzz...",
  "Calma, respira, foca.",
  "O sol está quentinho aqui.",
  "Ronrom...",
  "Devagar se vai ao longe.",
  "Miau suave.",
  "Estou cuidando da sua paz.",
  "Aconchego é tudo.",
  "Prrr prrr prrr.",
  "Tudo tem seu tempo."
];

// Detailed Cozy Palette
const C = {
  outline: '#5D4037', // Warm Brown outline for definition
  skin: '#FFF5E1',    // Cream
  orange: '#FFCCBC',  // Soft Orange
  orangeDark: '#FFAB91',
  black: '#455A64',   // Soft Black/Blue Grey
  white: '#FFFFFF',
  pink: '#F8BBD0',    // Blush
  tie: '#EF5350',     // Red tie
  green: '#C5E1A5',   // Alien green
  grey: '#CFD8DC',
  gold: '#FFE082',
  teal: '#80CBC4',    // For Calico scarf
  blueSuit: '#3949AB', // Business suit
  ninja: '#263238',    // Dark Ninja
  pigSkin: '#FFAB91',  // Pig Pink
  pigSnout: '#F06292', // Darker Pig Pink
  voidDark: '#263238', // Deep Blue/Black for void body
  voidLight: '#37474F', // Slightly lighter for void details
  purple: '#CE93D8',  // Mystical purple
  turtleSkin: '#AED581',
  turtleShell: '#558B2F', // Darker green for shell
  turtleBelly: '#DCEDC8',
  pastaYellow: '#FFECB3', // For lasagna
  sauceRed: '#FF7043',     // For lasagna
  
  // Christmas Colors
  hatRed: '#D32F2F',
  hatWhite: '#FAFAFA',
  tabbyGrey: '#EEEEEE',
  tabbyDark: '#BDBDBD'
};

const STROKE = `stroke="${C.outline}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"`;

// Highly Detailed Cats
export const CAT_ASSETS: Record<CatType, string> = {
  [CatType.STANDARD]: svgToDataUri(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Tail -->
      <path d="M75,75 Q90,65 85,45" fill="none" stroke="${C.skin}" stroke-width="8" stroke-linecap="round"/>
      <path d="M75,75 Q90,65 85,45" fill="none" stroke="${C.outline}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0 100"/>
      
      <!-- Body -->
      <path d="M25,85 Q20,45 50,40 Q80,45 75,85 L25,85 Z" fill="${C.skin}" ${STROKE}/>
      
      <!-- Head -->
      <path d="M25,40 Q20,10 50,25 Q80,10 75,40 Q80,65 50,65 Q20,65 25,40" fill="${C.skin}" ${STROKE}/>
      
      <!-- Ears Inner -->
      <path d="M30,35 Q28,20 45,30" fill="${C.pink}" opacity="0.6"/>
      <path d="M70,35 Q72,20 55,30" fill="${C.pink}" opacity="0.6"/>
      
      <!-- Face Details -->
      <circle cx="40" cy="45" r="3" fill="${C.black}"/>
      <circle cx="60" cy="45" r="3" fill="${C.black}"/>
      <path d="M48,52 Q50,55 52,52" fill="none" stroke="${C.outline}" stroke-width="2"/>
      <line x1="20" y1="48" x2="35" y2="50" stroke="${C.outline}" stroke-width="1"/>
      <line x1="20" y1="52" x2="35" y2="52" stroke="${C.outline}" stroke-width="1"/>
      <line x1="80" y1="48" x2="65" y2="50" stroke="${C.outline}" stroke-width="1"/>
      <line x1="80" y1="52" x2="65" y2="52" stroke="${C.outline}" stroke-width="1"/>
      
      <!-- Collar -->
      <path d="M35,65 Q50,70 65,65" fill="none" stroke="${C.tie}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="50" cy="68" r="3" fill="${C.gold}" stroke="${C.outline}" stroke-width="1"/>
    </svg>
  `),

  [CatType.ORANGE]: svgToDataUri(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Tail (Lazy on ground) -->
      <path d="M80,80 Q95,85 90,70" fill="none" stroke="${C.orange}" stroke-width="8" stroke-linecap="round"/>
      <path d="M80,80 Q95,85 90,70" fill="none" stroke="${C.outline}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0 100"/>
      
      <!-- Body (Very Round/Fat) -->
      <path d="M20,85 Q15,50 50,45 Q85,50 80,85 L20,85 Z" fill="${C.orange}" ${STROKE}/>
      
      <!-- Belly (Visible) -->
      <path d="M35,85 Q50,55 65,85" fill="${C.skin}" opacity="0.6"/>
      
      <!-- Head (Low and Wide) -->
      <ellipse cx="50" cy="45" rx="30" ry="22" fill="${C.orange}" ${STROKE}/>
      
      <!-- Ears (Small) -->
      <path d="M28,30 L25,18 L40,28" fill="${C.orange}" ${STROKE}/>
      <path d="M72,30 L75,18 L60,28" fill="${C.orange}" ${STROKE}/>
      
      <!-- Stripes -->
      <path d="M45,25 L50,32 L55,25" fill="${C.orangeDark}"/>
      <path d="M20,45 L28,45" stroke="${C.orangeDark}" stroke-width="3"/>
      <path d="M80,45 L72,45" stroke="${C.orangeDark}" stroke-width="3"/>

      <!-- Face (Sleepy/Eating) -->
      <path d="M35,42 Q40,38 45,42" fill="none" stroke="${C.black}" stroke-width="2"/> <!-- Closed Eye -->
      <path d="M55,42 Q60,38 65,42" fill="none" stroke="${C.black}" stroke-width="2"/> <!-- Closed Eye -->
      
      <!-- Mouth with Lasagna -->
      <path d="M45,55 Q50,65 55,55" fill="${C.sauceRed}" stroke="${C.outline}" stroke-width="1"/>
      <rect x="42" y="52" width="16" height="8" fill="${C.pastaYellow}" stroke="${C.outline}" stroke-width="1" transform="rotate(-5 50 56)"/>
      <rect x="42" y="48" width="16" height="4" fill="${C.sauceRed}" transform="rotate(-5 50 56)"/>

      <!-- Paws (Holding food) -->
      <circle cx="40" cy="65" r="6" fill="${C.skin}" stroke="${C.outline}" stroke-width="2"/>
      <circle cx="60" cy="65" r="6" fill="${C.skin}" stroke="${C.outline}" stroke-width="2"/>
    </svg>
  `),

  [CatType.VOID]: svgToDataUri(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Tail (Wrapping around like a shadow) -->
      <path d="M30,80 Q10,80 15,60" fill="none" stroke="${C.voidDark}" stroke-width="6" stroke-linecap="round"/>

      <!-- Body (Fluffy Blob / Liquid) -->
      <path d="M25,85 
               Q20,65 22,55 Q18,45 25,35 
               Q30,20 50,25 Q70,20 75,35 
               Q82,45 78,55 Q80,65 75,85 
               Q50,90 25,85 Z" 
               fill="${C.voidDark}" stroke="${C.voidDark}" stroke-width="3"/>
      
      <!-- Ears (Large and pointy) -->
      <path d="M30,35 L25,10 L45,30" fill="${C.voidDark}" stroke="${C.voidDark}" stroke-width="2"/>
      <path d="M70,35 L75,10 L55,30" fill="${C.voidDark}" stroke="${C.voidDark}" stroke-width="2"/>
      
      <!-- Galaxy/Dust Particles -->
      <circle cx="30" cy="70" r="1" fill="white" opacity="0.6"/>
      <circle cx="70" cy="60" r="1.5" fill="${C.purple}" opacity="0.5"/>
      <circle cx="50" cy="20" r="1" fill="white" opacity="0.4"/>
      <circle cx="80" cy="40" r="1" fill="${C.teal}" opacity="0.4"/>
      
      <!-- Eyes (Glowing) -->
      <ellipse cx="40" cy="45" rx="7" ry="6" fill="${C.gold}"/>
      <ellipse cx="60" cy="45" rx="7" ry="6" fill="${C.gold}"/>
      
      <circle cx="43" cy="43" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="63" cy="43" r="1.5" fill="white" opacity="0.9"/>
      
      <!-- Subtle mouth -->
      <path d="M48,55 Q50,56 52,55" fill="none" stroke="${C.voidLight}" stroke-width="1.5" opacity="0.5"/>
    </svg>
  `),

  [CatType.CALICO]: svgToDataUri(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
       <!-- Tail (Two toned) -->
      <path d="M80,75 Q95,65 90,45" fill="none" stroke="${C.black}" stroke-width="8" stroke-linecap="round"/>
      
      <!-- Body Base -->
      <path d="M25,85 Q20,45 50,40 Q80,45 75,85 L25,85 Z" fill="${C.white}" ${STROKE}/>
      
      <!-- Body Patches (Organic) -->
      <path d="M30,80 Q35,50 55,60 Q50,80 30,80" fill="${C.orange}" opacity="0.9"/>
      <path d="M60,80 Q65,60 75,65 L75,85 L60,85" fill="${C.black}" opacity="0.9"/>
      
      <!-- Head -->
      <path d="M25,40 Q20,10 50,25 Q80,10 75,40 Q80,65 50,65 Q20,65 25,40" fill="${C.white}" ${STROKE}/>
      
      <!-- Head Patches (Ears) -->
      <path d="M25,40 Q20,10 50,25 L50,45 Q35,45 25,40 Z" fill="${C.black}" opacity="0.9"/>
      <path d="M75,40 Q80,10 50,25 L50,45 Q65,45 75,40 Z" fill="${C.orange}" opacity="0.9"/>
      
      <!-- Scarf -->
      <path d="M30,65 Q50,75 70,65 L50,85 Z" fill="${C.teal}" ${STROKE}/>
      <circle cx="50" cy="68" r="2" fill="${C.white}"/>

      <!-- Face -->
      <circle cx="40" cy="48" r="3" fill="${C.black}"/>
      <circle cx="60" cy="48" r="3" fill="${C.black}"/>
      <circle cx="35" cy="55" r="4" fill="${C.pink}" opacity="0.4"/> <!-- Blush -->
      <circle cx="65" cy="55" r="4" fill="${C.pink}" opacity="0.4"/>
      <path d="M48,55 Q50,58 52,55" fill="none" stroke="${C.outline}" stroke-width="2"/>
    </svg>
  `),

  [CatType.ROBOT]: svgToDataUri(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Antenna -->
      <line x1="50" y1="20" x2="50" y2="10" stroke="${C.grey}" stroke-width="3"/>
      <circle cx="50" cy="8" r="4" fill="${C.tie}" stroke="${C.outline}" stroke-width="2"/>
      
      <!-- Head -->
      <rect x="25" y="20" width="50" height="40" rx="8" fill="${C.grey}" ${STROKE}/>
      
      <!-- Face Screen -->
      <rect x="35" y="30" width="30" height="20" rx="4" fill="#333"/>
      <circle cx="42" cy="40" r="3" fill="#00FF00"/>
      <circle cx="58" cy="40" r="3" fill="#00FF00"/>
      
      <!-- Body -->
      <path d="M35,60 L65,60 L70,90 L30,90 Z" fill="${C.grey}" ${STROKE}/>
      
      <!-- Panels -->
      <rect x="40" y="70" width="20" height="10" fill="#FFF" stroke="${C.outline}" stroke-width="1"/>
      <line x1="20" y1="75" x2="30" y2="75" stroke="${C.outline}" stroke-width="2"/>
      <line x1="80" y1="75" x2="70" y2="75" stroke="${C.outline}" stroke-width="2"/>
    </svg>
  `),

  [CatType.ALIEN]: svgToDataUri(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <path d="M35,90 L40,50 L30,30 L50,40 L70,30 L60,50 L65,90 Z" fill="${C.green}" ${STROKE}/>
      
      <!-- Head -->
      <path d="M30,40 Q30,10 50,10 Q70,10 70,40 Q70,60 50,60 Q30,60 30,40" fill="${C.green}" ${STROKE}/>
      
      <!-- Third Eye -->
      <circle cx="50" cy="25" r="4" fill="${C.black}" stroke="white" stroke-width="1"/>
      <circle cx="50" cy="25" r="1" fill="white"/>
      
      <!-- Normal Eyes -->
      <ellipse cx="40" cy="40" rx="5" ry="8" fill="${C.black}"/>
      <ellipse cx="60" cy="40" rx="5" ry="8" fill="${C.black}"/>
      
      <!-- Smile -->
      <path d="M45,52 Q50,55 55,52" fill="none" stroke="${C.outline}" stroke-width="1.5"/>
    </svg>
  `),

  [CatType.BUSINESS]: svgToDataUri(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Body (Suit Jacket) -->
      <path d="M25,85 Q20,45 50,40 Q80,45 75,85 L25,85 Z" fill="${C.blueSuit}" ${STROKE}/>
      
      <!-- Shirt (White Triangle) -->
      <path d="M40,50 L50,75 L60,50" fill="${C.white}"/>
      
      <!-- Tie -->
      <path d="M50,55 L45,50 L50,70 L55,50 Z" fill="${C.tie}" stroke="${C.outline}" stroke-width="0.5"/>
      
      <!-- Head -->
      <path d="M25,40 Q20,10 50,25 Q80,10 75,40 Q80,65 50,65 Q20,65 25,40" fill="${C.grey}" ${STROKE}/>
      
      <!-- Ears Inner -->
      <path d="M30,35 Q28,20 45,30" fill="${C.white}" opacity="0.6"/>
      <path d="M70,35 Q72,20 55,30" fill="${C.white}" opacity="0.6"/>
      
      <!-- Glasses -->
      <circle cx="40" cy="45" r="7" fill="none" stroke="${C.black}" stroke-width="2"/>
      <circle cx="60" cy="45" r="7" fill="none" stroke="${C.black}" stroke-width="2"/>
      <line x1="47" y1="45" x2="53" y2="45" stroke="${C.black}" stroke-width="2"/> <!-- Bridge -->
      
      <!-- Face -->
      <circle cx="40" cy="45" r="1.5" fill="${C.black}"/>
      <circle cx="60" cy="45" r="1.5" fill="${C.black}"/>
      <path d="M48,55 Q50,57 52,55" fill="none" stroke="${C.outline}" stroke-width="2"/>
      
      <!-- Pocket with Pen -->
      <rect x="60" y="70" width="10" height="8" fill="none" stroke="${C.white}" stroke-width="1"/>
      <line x1="63" y1="70" x2="63" y2="65" stroke="${C.white}" stroke-width="1.5"/>
    </svg>
  `),

  [CatType.PARTY]: svgToDataUri(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Tail (Wiggling) -->
      <path d="M80,75 Q95,85 90,55" fill="none" stroke="${C.skin}" stroke-width="8" stroke-linecap="round"/>
      <path d="M80,75 Q95,85 90,55" fill="none" stroke="${C.outline}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0 100"/>

      <!-- Body -->
      <path d="M25,85 Q20,45 50,40 Q80,45 75,85 L25,85 Z" fill="${C.white}" ${STROKE}/>
      
      <!-- Confetti on Fur -->
      <circle cx="35" cy="60" r="2" fill="${C.tie}"/>
      <circle cx="65" cy="70" r="2" fill="${C.gold}"/>
      <polygon points="45,75 48,80 42,80" fill="${C.green}"/>

      <!-- Head -->
      <path d="M25,40 Q20,10 50,25 Q80,10 75,40 Q80,65 50,65 Q20,65 25,40" fill="${C.white}" ${STROKE}/>
      
      <!-- Party Hat -->
      <polygon points="35,25 65,25 50,0" fill="${C.pink}" stroke="${C.outline}" stroke-width="2"/>
      <circle cx="50" cy="0" r="4" fill="${C.gold}" stroke="${C.outline}" stroke-width="1"/> <!-- Pom pom -->
      <path d="M40,20 L60,10 M38,15 L62,5" stroke="${C.white}" stroke-width="1" opacity="0.6"/> <!-- Stripes -->

      <!-- Face (Winking) -->
      <path d="M36,45 Q40,42 44,45" fill="none" stroke="${C.black}" stroke-width="2"/> <!-- Wink -->
      <circle cx="60" cy="45" r="3" fill="${C.black}"/>
      <circle cx="35" cy="55" r="4" fill="${C.pink}" opacity="0.4"/> <!-- Blush -->
      <circle cx="65" cy="55" r="4" fill="${C.pink}" opacity="0.4"/>
      
      <!-- Party Blower (Língua de Sogra) -->
      <path d="M50,55 L70,58" stroke="${C.teal}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="70" cy="58" r="3" fill="${C.teal}"/>
      <path d="M73,58 Q80,60 75,55" fill="none" stroke="${C.teal}" stroke-width="2"/> <!-- Unrolled bit -->
    </svg>
  `),

  [CatType.NINJA]: svgToDataUri(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Headband Tails (Flying) -->
      <path d="M75,35 Q90,30 95,20" fill="none" stroke="${C.tie}" stroke-width="4" stroke-linecap="round"/>
      <path d="M75,35 Q90,40 92,45" fill="none" stroke="${C.tie}" stroke-width="4" stroke-linecap="round"/>

      <!-- Body (Crouched) -->
      <path d="M25,85 Q20,55 50,55 Q80,55 75,85 L25,85 Z" fill="${C.ninja}" ${STROKE}/>
      
      <!-- Head -->
      <path d="M25,40 Q20,15 50,15 Q80,15 75,40 Q80,60 50,60 Q20,60 25,40" fill="${C.ninja}" ${STROKE}/>
      
      <!-- Mask Opening (Skin) -->
      <ellipse cx="50" cy="40" rx="15" ry="6" fill="${C.skin}"/>
      
      <!-- Headband Front -->
      <path d="M28,28 Q50,25 72,28" fill="none" stroke="${C.tie}" stroke-width="5" stroke-linecap="round"/>
      
      <!-- Eyes (Sharp) -->
      <path d="M38,38 L45,40" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M62,38 L55,40" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="43" cy="40" r="1.5" fill="black"/>
      <circle cx="57" cy="40" r="1.5" fill="black"/>

      <!-- Sword Handle on Back -->
      <line x1="60" y1="60" x2="75" y2="45" stroke="${C.grey}" stroke-width="3" stroke-linecap="round"/>
      <line x1="72" y1="48" x2="78" y2="42" stroke="${C.grey}" stroke-width="3" stroke-linecap="round"/> <!-- Crossguard -->
    </svg>
  `),

  [CatType.PIG]: svgToDataUri(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
       <!-- Tail (Curly) -->
      <path d="M75,70 Q85,75 80,65 Q75,60 82,60" fill="none" stroke="${C.pigSkin}" stroke-width="3" stroke-linecap="round"/>

      <!-- Body (Round) -->
      <ellipse cx="50" cy="65" rx="35" ry="28" fill="${C.pigSkin}" ${STROKE}/>
      
      <!-- Head -->
      <circle cx="50" cy="40" r="22" fill="${C.pigSkin}" ${STROKE}/>
      
      <!-- Ears (Floppy) -->
      <path d="M30,25 Q20,35 25,40 L35,35 Z" fill="${C.pigSkin}" stroke="${C.outline}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M70,25 Q80,35 75,40 L65,35 Z" fill="${C.pigSkin}" stroke="${C.outline}" stroke-width="2.5" stroke-linejoin="round"/>
      
      <!-- Snout -->
      <ellipse cx="50" cy="45" rx="8" ry="6" fill="${C.pigSnout}" stroke="${C.outline}" stroke-width="1.5"/>
      <circle cx="47" cy="45" r="1.5" fill="${C.outline}"/> <!-- Nostril -->
      <circle cx="53" cy="45" r="1.5" fill="${C.outline}"/> <!-- Nostril -->
      
      <!-- Eyes -->
      <circle cx="40" cy="35" r="2" fill="black"/>
      <circle cx="60" cy="35" r="2" fill="black"/>
      
      <!-- Blush -->
      <circle cx="35" cy="50" r="3" fill="${C.pigSnout}" opacity="0.5"/>
      <circle cx="65" cy="50" r="3" fill="${C.pigSnout}" opacity="0.5"/>
    </svg>
  `),

  [CatType.TURTLE]: svgToDataUri(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Feet -->
      <ellipse cx="30" cy="85" rx="8" ry="5" fill="${C.turtleSkin}" stroke="${C.outline}" stroke-width="2"/>
      <ellipse cx="70" cy="85" rx="8" ry="5" fill="${C.turtleSkin}" stroke="${C.outline}" stroke-width="2"/>

      <!-- Tail -->
      <path d="M15,65 L10,70 L20,70 Z" fill="${C.turtleSkin}" stroke="${C.outline}" stroke-width="2"/>

      <!-- Shell -->
      <path d="M20,75 Q15,35 50,30 Q85,35 80,75 Z" fill="${C.turtleShell}" stroke="${C.outline}" stroke-width="3"/>
      
      <!-- Shell Patterns (Hexagonsish) -->
      <path d="M35,65 L30,50 L50,40 L70,50 L65,65 L50,70 Z" fill="${C.turtleBelly}" stroke="${C.outline}" stroke-width="1.5" opacity="0.6"/>
      <path d="M30,50 L15,55 M70,50 L85,55 M50,40 L50,30" stroke="${C.outline}" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Head -->
      <circle cx="85" cy="50" r="14" fill="${C.turtleSkin}" stroke="${C.outline}" stroke-width="2.5"/>

      <!-- Eyes -->
      <circle cx="82" cy="48" r="2" fill="black"/>
      <circle cx="92" cy="48" r="2" fill="black"/>
      <path d="M80,44 Q85,42 90,44" fill="none" stroke="${C.outline}" stroke-width="1" opacity="0.5"/> 

      <!-- Fake Cat Ears (Headband) -->
      <path d="M75,45 Q85,35 95,45" fill="none" stroke="${C.tie}" stroke-width="2"/> <!-- Band -->
      <path d="M78,38 L75,25 L85,36" fill="${C.white}" stroke="${C.tie}" stroke-width="2"/> <!-- Ear Left -->
      <path d="M88,36 L95,25 L92,38" fill="${C.white}" stroke="${C.tie}" stroke-width="2"/> <!-- Ear Right -->
      <path d="M78,38 L75,25 L85,36" fill="${C.pink}" opacity="0.3"/> <!-- Ear pink part -->
      
      <!-- Blush -->
      <circle cx="80" cy="55" r="3" fill="${C.pink}" opacity="0.5"/>
    </svg>
  `),

  [CatType.CHRISTMAS]: svgToDataUri(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Tail -->
      <path d="M75,75 Q90,65 85,45" fill="none" stroke="${C.tabbyGrey}" stroke-width="8" stroke-linecap="round"/>
      <path d="M75,75 Q90,65 85,45" fill="none" stroke="${C.outline}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0 100"/>
      
      <!-- Body -->
      <path d="M25,85 Q20,45 50,40 Q80,45 75,85 L25,85 Z" fill="${C.tabbyGrey}" ${STROKE}/>
      
      <!-- Stripes Body -->
      <path d="M30,80 Q35,65 25,60" fill="none" stroke="${C.tabbyDark}" stroke-width="2"/>
      <path d="M70,80 Q65,65 75,60" fill="none" stroke="${C.tabbyDark}" stroke-width="2"/>

      <!-- Head -->
      <path d="M25,40 Q20,10 50,25 Q80,10 75,40 Q80,65 50,65 Q20,65 25,40" fill="${C.tabbyGrey}" ${STROKE}/>
      
      <!-- Face Stripes -->
      <path d="M25,35 L35,38" stroke="${C.tabbyDark}" stroke-width="2"/>
      <path d="M75,35 L65,38" stroke="${C.tabbyDark}" stroke-width="2"/>
      <path d="M48,22 L52,22" stroke="${C.tabbyDark}" stroke-width="2"/>

      <!-- Santa Hat -->
      <!-- Red part flops to left -->
      <path d="M30,25 Q10,25 15,50 L25,45 Q20,30 35,28" fill="${C.hatRed}" stroke="${C.outline}" stroke-width="2"/>
      <!-- Main hat on head -->
      <path d="M28,28 Q50,5 72,28" fill="${C.hatRed}" stroke="${C.outline}" stroke-width="2"/>
      
      <!-- White Pompom -->
      <circle cx="15" cy="50" r="5" fill="${C.hatWhite}" stroke="${C.outline}" stroke-width="1.5"/>
      
      <!-- White Brim -->
      <path d="M25,28 Q50,22 75,28 L75,33 Q50,28 25,33 Z" fill="${C.hatWhite}" stroke="${C.outline}" stroke-width="2"/>

      <!-- Big Eyes (Cute) -->
      <circle cx="40" cy="45" r="5" fill="black"/>
      <circle cx="60" cy="45" r="5" fill="black"/>
      <circle cx="38" cy="43" r="1.5" fill="white"/>
      <circle cx="58" cy="43" r="1.5" fill="white"/>
      
      <!-- Nose/Mouth -->
      <path d="M48,52 Q50,54 52,52" fill="none" stroke="${C.outline}" stroke-width="1.5"/>
      <circle cx="50" cy="50" r="1.5" fill="${C.pink}"/>
    </svg>
  `)
};

export const ROOM_BACKGROUNDS = [
  // 1. Vintage Floral (Sage Green & Pink) - High Contrast
  svgToDataUri(`
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="floral" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="#F1F8E9"/>
          <circle cx="20" cy="20" r="8" fill="#F48FB1"/>
          <circle cx="60" cy="60" r="8" fill="#F48FB1"/>
          <path d="M20 20 L25 10 M20 20 L30 20 M20 20 L15 30" stroke="#7CB342" stroke-width="2"/>
          <path d="M60 60 L65 50 M60 60 L70 60 M60 60 L55 70" stroke="#7CB342" stroke-width="2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#floral)"/>
    </svg>
  `),
  // 2. Cozy Plaid (Browns)
  svgToDataUri(`
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="plaid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#FFF3E0"/>
          <rect x="0" y="0" width="50" height="50" fill="#D7CCC8" opacity="0.5"/>
          <rect x="50" y="50" width="50" height="50" fill="#D7CCC8" opacity="0.5"/>
          <line x1="0" y1="25" x2="100" y2="25" stroke="#8D6E63" stroke-width="2"/>
          <line x1="0" y1="75" x2="100" y2="75" stroke="#8D6E63" stroke-width="2"/>
          <line x1="25" y1="0" x2="25" y2="100" stroke="#8D6E63" stroke-width="2"/>
          <line x1="75" y1="0" x2="75" y2="100" stroke="#8D6E63" stroke-width="2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#plaid)"/>
    </svg>
  `),
  // 3. Night Sky (Blue)
  svgToDataUri(`
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#37474F"/>
      <defs>
        <pattern id="stars" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
           <circle cx="10" cy="10" r="2" fill="#FFF59D"/>
           <circle cx="50" cy="60" r="1.5" fill="#FFF59D" opacity="0.8"/>
           <circle cx="80" cy="20" r="1" fill="#FFF59D" opacity="0.6"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#stars)"/>
    </svg>
  `),
  // 4. Polka Paws (Peach)
  svgToDataUri(`
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#FFCCBC"/>
      <defs>
        <pattern id="paws" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <g fill="#BF360C" opacity="0.1">
             <circle cx="30" cy="30" r="8"/>
             <circle cx="20" cy="20" r="4"/>
             <circle cx="40" cy="20" r="4"/>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#paws)"/>
    </svg>
  `)
];
export enum CatType {
  STANDARD = 'Gato Padrão',
  ORANGE = 'Gato Laranja',
  VOID = 'Gato do Vazio',
  CALICO = 'Gato Calico',
  ROBOT = 'Robo-Gato',
  ALIEN = 'Gato Alien',
  BUSINESS = 'Gato de Terno',
  PARTY = 'Gato Festeiro',
  NINJA = 'Gato Ninja',
  PIG = 'Gato?',
  TURTLE = 'Gato??',
  CHRISTMAS = 'Gato Natalino'
}

export enum DecorationType {
  YARN = 'Novelo de Lã',
  BOX = 'Caixa de Papelão',
  SCRATCHER = 'Arranhador',
  PLANT = 'Planta (Segura)'
}

export interface Cat {
  id: string;
  type: CatType;
  name: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  animationDelay: number;
  imageUrl?: string; // Base64 image
}

export interface Decoration {
  id: string;
  type: DecorationType;
  x: number;
  y: number;
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'CAT' | 'DECORATION';
  detail: CatType | DecorationType;
  cost: number;
  icon: string;
  description: string;
}

export interface FocusRecord {
  id: string;
  date: string; // ISO String
  durationMinutes: number;
  project: string;
  catEarned?: CatType;
}

export interface UserState {
  coins: number;
  cats: Cat[];
  decorations: Decoration[];
  unlockedCats: CatType[];
  backgroundUrl?: string;
  projects: string[];
  focusHistory: FocusRecord[];
  activeProject?: string;
}

export interface TimerConfig {
  focusTime: number; // in seconds
  shortBreak: number;
  longBreak: number;
}
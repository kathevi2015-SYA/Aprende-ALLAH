import { Prophet } from "./types";

export const PROPHETS: Prophet[] = [
  { id: 1, name: "Adam", imagePrompt: "beautiful garden of eden nature trees flowers paradise no humans" },
  { id: 2, name: "Idris (Enoch)", imagePrompt: "ancient writing pen scroll starry night sky astronomy" },
  { id: 3, name: "Nuh (Noé)", imagePrompt: "big wooden ark ship on ocean waves storm rain animals pairs cartoon" },
  { id: 4, name: "Hud", imagePrompt: "ancient city of Iram with tall pillars desert sand wind" },
  { id: 5, name: "Saleh", imagePrompt: "camel coming out of rock mountain desert thamud" },
  { id: 6, name: "Ibrahim (Abraham)", imagePrompt: "Kaaba mecca ancient construction stars moon night sky" },
  { id: 7, name: "Lut (Lot)", imagePrompt: "dead sea landscape salt crystals ancient path morning" },
  { id: 8, name: "Ismail (Ismael)", imagePrompt: "zamzam well water springing from desert sand mecca valley" },
  { id: 9, name: "Ishaq (Isaac)", imagePrompt: "peaceful ancient tents flocks of sheep green pasture palestine" },
  { id: 10, name: "Yaqub (Jacob)", imagePrompt: "twelve stars sun and moon dream illustration abstract" },
  { id: 11, name: "Yusuf (José)", imagePrompt: "colorful shirt tunic ancient egyptian palace wheat fields" },
  { id: 12, name: "Ayyub (Job)", imagePrompt: "water spring healing fountain nature patience symbol" },
  { id: 13, name: "Shuaib (Jetró)", imagePrompt: "ancient market weighing scales trading fair commerce tree" },
  { id: 14, name: "Musa (Moisés)", imagePrompt: "red sea parting huge waves path staff glowing mountain sinai" },
  { id: 15, name: "Harun (Aarón)", imagePrompt: "ancient staff glowing light mountains desert scene" },
  { id: 16, name: "Dhul-Kifl (Ezequiel)", imagePrompt: "justice scales balance patience symbol peaceful light" },
  { id: 17, name: "Dawud (David)", imagePrompt: "ancient iron armor blacksmith mountains psalms book bird" },
  { id: 18, name: "Sulaiman (Salomón)", imagePrompt: "golden dome jerusalem hoopoe bird ant valley wind throne abstract" },
  { id: 19, name: "Ilyas (Elías)", imagePrompt: "mountains ancient ruins peaceful nature valley landscape" },
  { id: 20, name: "Al-Yasa (Eliseo)", imagePrompt: "flowing river water green nature peaceful path" },
  { id: 21, name: "Yunus (Jonás)", imagePrompt: "big whale swimming in deep blue ocean night storm underwater" },
  { id: 22, name: "Zakariya (Zacarías)", imagePrompt: "ancient sanctuary mihrab prayer room candle light" },
  { id: 23, name: "Yahya (Juan el Bautista)", imagePrompt: "river jordan lush greenery nature wisdom scroll" },
  { id: 24, name: "Isa (Jesús)", imagePrompt: "table spread with food fruits miracles palm tree date" },
  { id: 25, name: "Muhammad (S.A.W)", imagePrompt: "Masjid Nabawi green dome medina minarets cave hira light quran book" },
];

// Simple maze levels representing growth in difficulty
export const MAZE_LEVELS = [
  // Level 1 (Shahada) - Simple
  [
    [1, 1, 1, 1, 1],
    [2, 0, 0, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 0, 0, 0, 3],
    [1, 1, 1, 1, 1],
  ],
  // Level 2 (Salat)
  [
    [1, 1, 1, 1, 1, 1],
    [2, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 3],
    [1, 1, 1, 1, 1, 1],
  ],
  // Level 3 (Zakat)
  [
    [1, 1, 1, 1, 1, 1, 1],
    [2, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 3],
    [1, 1, 1, 1, 1, 1, 1],
  ],
  // Level 4 (Sawm)
  [
    [1, 1, 1, 1, 1, 1, 1],
    [2, 0, 0, 1, 0, 0, 3],
    [1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ],
   // Level 5 (Hajj)
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [2, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 3, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
];

export const DOTS_DATA = [
  { x: 50, y: 10, id: 1 },
  { x: 80, y: 90, id: 2 },
  { x: 10, y: 30, id: 3 },
  { x: 90, y: 30, id: 4 },
  { x: 20, y: 90, id: 5 },
  { x: 50, y: 10, id: 6 }, // Close the loop (Star shape)
];
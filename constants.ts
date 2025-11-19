import { Prophet } from "./types";

export const PROPHETS: Prophet[] = [
  { id: 1, name: "Adam" },
  { id: 2, name: "Idris (Enoch)" },
  { id: 3, name: "Nuh (Noé)" },
  { id: 4, name: "Hud" },
  { id: 5, name: "Saleh" },
  { id: 6, name: "Ibrahim (Abraham)" },
  { id: 7, name: "Lut (Lot)" },
  { id: 8, name: "Ismail (Ismael)" },
  { id: 9, name: "Ishaq (Isaac)" },
  { id: 10, name: "Yaqub (Jacob)" },
  { id: 11, name: "Yusuf (José)" },
  { id: 12, name: "Ayyub (Job)" },
  { id: 13, name: "Shuaib (Jetró)" },
  { id: 14, name: "Musa (Moisés)" },
  { id: 15, name: "Harun (Aarón)" },
  { id: 16, name: "Dhul-Kifl (Ezequiel)" },
  { id: 17, name: "Dawud (David)" },
  { id: 18, name: "Sulaiman (Salomón)" },
  { id: 19, name: "Ilyas (Elías)" },
  { id: 20, name: "Al-Yasa (Eliseo)" },
  { id: 21, name: "Yunus (Jonás)" },
  { id: 22, name: "Zakariya (Zacarías)" },
  { id: 23, name: "Yahya (Juan el Bautista)" },
  { id: 24, name: "Isa (Jesús)" },
  { id: 25, name: "Muhammad (S.A.W)" },
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

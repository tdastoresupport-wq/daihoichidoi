// ============================================================
// 7B V10 QUESTION BANK — APPROVED CONTENT (verbatim, do not alter)
// ============================================================
// Q6 music removed entirely. Q9 nine-dots replaced. Q8 stays lucky.

export type CellKind = 'quiz' | 'lucky';

export type Motif =
  | 'burst' // Q1 fast number burst
  | 'words' // Q2 english word spotlight
  | 'science' // Q3 science particles
  | 'type' // Q4 typography / language motif
  | 'keys' // Q5 keyboard / digital HUD
  | 'peaks' // Q6 vietnam geography / mountain horizon
  | 'kinetic' // Q7 logic sequence / kinetic numbers
  | 'gold' // Q8 lucky reward
  | 'lock'; // Q9 final brain lock

export interface QuizOption {
  label: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface PuzzleCell {
  id: number; // 1..9
  kind: CellKind;
  motif: Motif;
  chip: string; // category label
  promptLabel: string;
  question: string;
  options: QuizOption[]; // empty for lucky
  correctIndex: number; // -1 for lucky
  explanation: string; // shown after reveal, kept short
  checkable: boolean;
  source: string;
}

export const QUESTION_TIME_S = 15;

export const PUZZLE_CELLS: PuzzleCell[] = [
  {
    id: 1,
    kind: 'quiz',
    motif: 'burst',
    chip: 'Toán nhanh',
    promptLabel: 'Chọn đáp án đúng:',
    question: '25% của 80 bằng bao nhiêu?',
    options: [
      { label: 'A', text: '10' },
      { label: 'B', text: '20' },
      { label: 'C', text: '25' },
      { label: 'D', text: '40' }
    ],
    correctIndex: 1,
    explanation: '25% = 1/4, mà 80 : 4 = 20.',
    checkable: true,
    source: 'V10 Question Bank'
  },
  {
    id: 2,
    kind: 'quiz',
    motif: 'words',
    chip: 'English',
    promptLabel: 'Choose the correct answer:',
    question: 'My sister ___ TV every evening.',
    options: [
      { label: 'A', text: 'watch' },
      { label: 'B', text: 'watches' },
      { label: 'C', text: 'watching' },
      { label: 'D', text: 'watched' }
    ],
    correctIndex: 1,
    explanation: "Với chủ ngữ số ít 'My sister', động từ hiện tại đơn thêm -es: watches.",
    checkable: true,
    source: 'V10 Question Bank'
  },
  {
    id: 3,
    kind: 'quiz',
    motif: 'science',
    chip: 'Khoa học',
    promptLabel: 'Chọn đáp án đúng:',
    question: 'Trong quá trình quang hợp, cây xanh hấp thụ khí nào từ không khí?',
    options: [
      { label: 'A', text: 'Oxygen' },
      { label: 'B', text: 'Nitrogen' },
      { label: 'C', text: 'Carbon dioxide' },
      { label: 'D', text: 'Hydrogen' }
    ],
    correctIndex: 2,
    explanation: 'Cây xanh sử dụng khí carbon dioxide cùng nước và ánh sáng để tạo chất hữu cơ trong quá trình quang hợp.',
    checkable: true,
    source: 'V10 Question Bank'
  },
  {
    id: 4,
    kind: 'quiz',
    motif: 'type',
    chip: 'Ngữ văn',
    promptLabel: 'Chọn đáp án đúng:',
    question: 'Từ nào dưới đây là từ láy?',
    options: [
      { label: 'A', text: 'học tập' },
      { label: 'B', text: 'lung linh' },
      { label: 'C', text: 'xe đạp' },
      { label: 'D', text: 'bàn ghế' }
    ],
    correctIndex: 1,
    explanation: "'Lung linh' là từ láy vì có sự lặp lại âm.",
    checkable: true,
    source: 'V10 Question Bank'
  },
  {
    id: 5,
    kind: 'quiz',
    motif: 'keys',
    chip: 'Công nghệ số',
    promptLabel: 'Chọn đáp án đúng:',
    question: 'Trong máy tính, tổ hợp phím Ctrl + Z thường dùng để làm gì?',
    options: [
      { label: 'A', text: 'Lưu tệp' },
      { label: 'B', text: 'Hoàn tác thao tác vừa làm' },
      { label: 'C', text: 'In tài liệu' },
      { label: 'D', text: 'Đóng cửa sổ' }
    ],
    correctIndex: 1,
    explanation: 'Ctrl + Z là lệnh Undo — hoàn tác thao tác gần nhất.',
    checkable: true,
    source: 'V10 Question Bank'
  },
  {
    id: 6,
    kind: 'quiz',
    motif: 'peaks',
    chip: 'Địa lí Việt Nam',
    promptLabel: 'Chọn đáp án đúng:',
    question: 'Đỉnh Fansipan thuộc dãy núi nào?',
    options: [
      { label: 'A', text: 'Trường Sơn' },
      { label: 'B', text: 'Hoàng Liên Sơn' },
      { label: 'C', text: 'Đông Triều' },
      { label: 'D', text: 'Ngân Sơn' }
    ],
    correctIndex: 1,
    explanation: 'Fansipan nằm trong dãy Hoàng Liên Sơn.',
    checkable: true,
    source: 'V10 Question Bank (replaces old music Q6 — no audio)'
  },
  {
    id: 7,
    kind: 'quiz',
    motif: 'kinetic',
    chip: 'Logic',
    promptLabel: 'Dãy số tiếp theo là số nào?',
    question: '2 → 6 → 12 → 20 → ?',
    options: [
      { label: 'A', text: '24' },
      { label: 'B', text: '28' },
      { label: 'C', text: '30' },
      { label: 'D', text: '32' }
    ],
    correctIndex: 2,
    explanation: '1×2 = 2; 2×3 = 6; 3×4 = 12; 4×5 = 20; 5×6 = 30.',
    checkable: true,
    source: 'V10 Question Bank'
  },
  {
    id: 8,
    kind: 'lucky',
    motif: 'gold',
    chip: 'Ô may mắn',
    promptLabel: '',
    question: 'CHÚC MỪNG!\nBẠN ĐÃ CHỌN ĐƯỢC Ô MAY MẮN!',
    options: [],
    correctIndex: -1,
    explanation: '',
    checkable: false, // lucky: instant reward
    source: 'V10 Question Bank'
  },
  {
    id: 9,
    kind: 'quiz',
    motif: 'lock',
    chip: 'Tư duy nhanh',
    promptLabel: 'Chọn đáp án đúng:',
    question:
      'Một số có hai chữ số.\nTổng hai chữ số bằng 9.\nChữ số hàng chục lớn hơn chữ số hàng đơn vị 3 đơn vị.\n\nĐó là số nào?',
    options: [
      { label: 'A', text: '36' },
      { label: 'B', text: '45' },
      { label: 'C', text: '54' },
      { label: 'D', text: '63' }
    ],
    correctIndex: 3,
    explanation: '6 + 3 = 9 và 6 lớn hơn 3 đúng 3 đơn vị.',
    checkable: true,
    source: 'V10 Question Bank (replaces nine-dots)'
  }
];

// ── DIRECTIONS (5 phương hướng) ──────────────────────────
export const DIRECTIONS: string[] = [
  'HỌC TẬP CHỦ ĐỘNG — ỨNG DỤNG AI',
  'TIẾNG ANH — MỖI NGÀY MỘT BƯỚC TIẾN',
  'ĐOÀN KẾT – KỶ LUẬT – TRÁCH NHIỆM',
  'SỐNG XANH – THAM GIA TÍCH CỰC',
  'YÊU THƯƠNG – TRUNG THỰC – TIẾN BỘ'
];

// ── GAME RULES ───────────────────────────────────────────
export const RULES: string[] = [
  'Chọn ô số bất kì để mở thử thách',
  'Trả lời đúng để mở 1 mảnh ghép bức tranh bí mật',
  'Mở đủ 9 mảnh ghép để giải mã Bức tranh Bí Mật Chi đội 7B'
];

// ── SECRET IMAGE 3x3 PIECE MAPPINGS (UNTOUCHED) ──────────
export interface SecretPieceMapping {
  challengeId: number; // 1..9
  pieceIndex: number; // 0..8
  row: number; // 0..2
  col: number; // 0..2
  bgPosition: string; // '0% 0%', '50% 0%', etc.
}

export const SECRET_PIECE_MAPPINGS: SecretPieceMapping[] = [
  { challengeId: 1, pieceIndex: 0, row: 0, col: 0, bgPosition: '0% 0%' },
  { challengeId: 2, pieceIndex: 1, row: 0, col: 1, bgPosition: '50% 0%' },
  { challengeId: 3, pieceIndex: 2, row: 0, col: 2, bgPosition: '100% 0%' },
  { challengeId: 4, pieceIndex: 3, row: 1, col: 0, bgPosition: '0% 50%' },
  { challengeId: 5, pieceIndex: 4, row: 1, col: 1, bgPosition: '50% 50%' },
  { challengeId: 6, pieceIndex: 5, row: 1, col: 2, bgPosition: '100% 50%' },
  { challengeId: 7, pieceIndex: 6, row: 2, col: 0, bgPosition: '0% 100%' },
  { challengeId: 8, pieceIndex: 7, row: 2, col: 1, bgPosition: '50% 100%' },
  { challengeId: 9, pieceIndex: 8, row: 2, col: 2, bgPosition: '100% 100%' }
];

export function getPieceMapping(challengeId: number): SecretPieceMapping {
  return SECRET_PIECE_MAPPINGS[challengeId - 1] ?? SECRET_PIECE_MAPPINGS[0];
}

// ── SCENE 03 GATE ────────────────────────────────────────
export const HAS_7B_DATA = false;

// ============================================================
// 7B V2 QUESTION DATA — FINAL CONTENT LOCK
// ============================================================
// All 9 tiles verified and locked 2026-09-30.
// Q1: 168 giờ
// Q2: B. play
// Q3: 100°C
// Q4: B. Kiểm tra và đối chiếu thông tin
// Q5: A. Bàn phím
// Q6: QA-PENDING (Manual reveal for MC until audio clip verified)
// Q7: BỨT PHÁ (Visual Rebus)
// Q8: +1 PHẦN QUÀ (Lucky Chest)
// Q9: Nine Dots Logic Puzzle (Tư duy vượt giới hạn)
// ============================================================

export type CellKind =
  | 'math'      // Q1: arithmetic / quick calculation
  | 'choice'    // Q2, Q4, Q5: A/B/C multiple choice
  | 'science'   // Q3: science knowledge
  | 'audio'     // Q6: listen and guess
  | 'visual'    // Q7: rebus puzzle (BỨT PHÁ)
  | 'lucky'     // Q8: lucky tile
  | 'dots';     // Q9: classic 9 dots logic challenge

export interface PuzzleCell {
  id: number;           // 1..9
  kind: CellKind;
  chip: string;         // category label shown on tile and question badge
  promptLabel: string;  // instruction line shown above the question
  question: string;     // full question text (preserved verbatim)
  answer: string;       // display answer (verbatim)
  answerNote?: string;  // supplementary note under answer
  checkable: boolean;   // whether auto-grading is active
  accepted?: string[];  // normalized accepted answer strings
  hasAudioClip?: boolean;
  qaNote?: string;      // QA flag — do not auto-resolve
  source: string;       // content origin note
}

// Normalization: strip diacritics + punctuation for loose matching.
export function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const PUZZLE_CELLS: PuzzleCell[] = [
  // ── Q1 ──────────────────────────────────────────────────
  {
    id: 1,
    kind: 'math',
    chip: 'Toán nhanh',
    promptLabel: 'Bạn có biết?',
    question: 'Một tuần có bao nhiêu giờ?',
    answer: '168 giờ',
    answerNote: '(7 ngày × 24 giờ = 168 giờ)',
    checkable: true,
    accepted: ['168', '168 gio', '168 tieng', '168h'],
    source: 'V2 Question Set 2026-09-30'
  },

  // ── Q2 ──────────────────────────────────────────────────
  {
    id: 2,
    kind: 'choice',
    chip: 'Tiếng Anh',
    promptLabel: 'Chọn đáp án đúng:',
    question: 'My friends ___ football after school.\n\nA. plays\nB. play\nC. playing',
    answer: 'B. play',
    answerNote: '(Chủ ngữ số nhiều "friends" → động từ nguyên thể)',
    checkable: true,
    accepted: ['b', 'b play', 'play'],
    source: 'V2 Question Set 2026-09-30'
  },

  // ── Q3 ──────────────────────────────────────────────────
  {
    id: 3,
    kind: 'science',
    chip: 'Khoa học',
    promptLabel: 'Trả lời câu hỏi sau:',
    question: 'Ở điều kiện áp suất khí quyển tiêu chuẩn, nước sôi ở bao nhiêu độ C?',
    answer: '100°C',
    checkable: true,
    accepted: ['100', '100 do c', '100 do', '100c', '100 do c'],
    source: 'V2 Question Set 2026-09-30'
  },

  // ── Q4 ──────────────────────────────────────────────────
  {
    id: 4,
    kind: 'choice',
    chip: 'AI & Học tập',
    promptLabel: 'Chọn đáp án đúng nhất:',
    question: 'Khi dùng AI để học tập, điều nào quan trọng nhất?\n\nA. Tin mọi câu trả lời của AI\nB. Kiểm tra và đối chiếu thông tin\nC. Để AI làm thay toàn bộ bài',
    answer: 'B. Kiểm tra và đối chiếu thông tin',
    answerNote: '(AI có thể sai — luôn đối chiếu với nguồn tin cậy)',
    checkable: true,
    accepted: ['b', 'b kiem tra', 'kiem tra va doi chieu thong tin', 'b kiem tra va doi chieu', 'kiem tra va doi chieu'],
    source: 'V2 Question Set 2026-09-30'
  },

  // ── Q5 ──────────────────────────────────────────────────
  {
    id: 5,
    kind: 'choice',
    chip: 'Công nghệ',
    promptLabel: 'Chọn đáp án đúng:',
    question: 'Thiết bị nào thường dùng để nhập chữ và số vào máy tính?\n\nA. Bàn phím\nB. Loa\nC. Màn hình',
    answer: 'A. Bàn phím',
    checkable: true,
    accepted: ['a', 'a ban phim', 'ban phim'],
    source: 'V2 Question Set 2026-09-30'
  },

  // ── Q6 ──────────────────────────────────────────────────
  {
    id: 6,
    kind: 'audio',
    chip: 'Nghe nhạc',
    promptLabel: 'Nghe đoạn nhạc và chọn đáp án đúng:',
    question: 'NGHE ĐOẠN NHẠC VÀ ĐOÁN TÊN BÀI HÁT.',
    // QA-PENDING: Answer must be entered after audio clip is verified.
    // Do NOT invent or assume a song title.
    answer: '⏳ Đáp án chờ xác nhận sau khi clip được kiểm duyệt.',
    checkable: false, // MANUAL until clip + answer confirmed
    hasAudioClip: true,
    qaNote: 'QA-PENDING: Audio clip and song title not yet verified. MC opens music manually.',
    source: 'V2 Question Set 2026-09-30 (answer TBD)'
  },

  // ── Q7 ──────────────────────────────────────────────────
  {
    id: 7,
    kind: 'visual',
    chip: 'Nhìn hình đoán từ',
    promptLabel: 'Quan sát hình ảnh và giải mã:',
    question: 'NHÌN HÌNH ĐOÁN TỪ — Hình ảnh gợi ý một cụm từ gồm 2 tiếng mang tinh thần bứt phá vươn lên. Đó là từ gì?',
    answer: 'BỨT PHÁ',
    answerNote: '(Hình ảnh biểu trưng cho: BỨT TỐC + PHÁ VỠ GIỚI HẠN = BỨT PHÁ)',
    checkable: true,
    accepted: ['but pha', 'bứt phá', 'butpha'],
    source: 'V2 Question Set 2026-09-30'
  },

  // ── Q8 ──────────────────────────────────────────────────
  {
    id: 8,
    kind: 'lucky',
    chip: 'Ô may mắn',
    promptLabel: '',
    question: 'CHÚC MỪNG!\nBẠN ĐÃ CHỌN ĐƯỢC Ô MAY MẮN!',
    answer: '+1 PHẦN QUÀ',
    checkable: false, // lucky: instant reward
    source: 'V2 Question Set 2026-09-30'
  },

  // ── Q9 ──────────────────────────────────────────────────
  {
    id: 9,
    kind: 'dots',
    chip: 'Tư duy Logic',
    promptLabel: 'Câu đố 9 điểm cổ điển:',
    question: 'Nối tất cả 9 điểm bằng 4 đoạn thẳng mà không nhấc bút.',
    answer: 'Tư duy vượt giới hạn (Think Outside the Box)',
    answerNote: 'Bí quyết: Vẽ 4 đoạn thẳng liên tục kéo dài vượt ra ngoài ranh giới hình vuông của 9 điểm để kết nối toàn bộ 9 điểm mà không nhấc bút.',
    checkable: false, // Type: LOGIC / MANUAL REVEAL
    source: 'V2 Question Set 2026-09-30 — Classic 9 Dots Puzzle'
  }
];

// ── DIRECTIONS (5 phương hướng) ──────────────────────────
// Preserved from V1 — confirmed correct content.
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

// ── SECRET IMAGE 3x3 PIECE MAPPINGS ──────────────────────
export interface SecretPieceMapping {
  challengeId: number;   // 1..9
  pieceIndex: number;    // 0..8
  row: number;           // 0..2
  col: number;           // 0..2
  bgPosition: string;    // '0% 0%', '50% 0%', etc.
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
  { challengeId: 9, pieceIndex: 8, row: 2, col: 2, bgPosition: '100% 100%' },
];

export function getPieceMapping(challengeId: number): SecretPieceMapping {
  return SECRET_PIECE_MAPPINGS[challengeId - 1] ?? SECRET_PIECE_MAPPINGS[0];
}

// ── SCENE 03 GATE ────────────────────────────────────────
// OFF until real official 7B data is provided.
export const HAS_7B_DATA = false;

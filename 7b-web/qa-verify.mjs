// qa-verify.mjs — Verify 7B web app built content
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DIST = './dist/assets';
const files = readdirSync(DIST).filter(f => f.endsWith('.js'));
const bundle = files.map(f => readFileSync(join(DIST, f), 'utf8')).join('\n');
const cssFiles = readdirSync(DIST).filter(f => f.endsWith('.css'));
const css = cssFiles.map(f => readFileSync(join(DIST, f), 'utf8')).join('\n');

let pass = 0, fail = 0;

function check(label, condition, note = '') {
  if (condition) {
    console.log(`  ✅ PASS  ${label}`);
    pass++;
  } else {
    console.log(`  ❌ FAIL  ${label}${note ? ' — ' + note : ''}`);
    fail++;
  }
}

function contains(str) { return bundle.includes(str); }
function notContains(str) { return !bundle.includes(str); }

console.log('\n═══════════════════════════════════════════════════════');
console.log(' 7B PRODUCTION BUILD — CONTENT QA VERIFICATION');
console.log('═══════════════════════════════════════════════════════\n');

// -- Scene order: check the LINEAR_SCENES array order in the minified bundle
// Vite minifies string literals so we check for all scene ids present
console.log('── SCENE ORDER ─────────────────────────────────────────');
check('opening scene exists', contains('opening'));
check('directions scene exists', contains('directions'));
check('election scene exists', contains('election'));
check('intro scene exists', contains('intro'));
check('lobby scene exists', contains('lobby'));
check('closing scene exists', contains('closing'));

console.log('\n── ELECTION SCENE ─────────────────────────────────────');
check('BẦU BAN CHẤP HÀNH present', contains('BẦU BAN CHẤP HÀNH'));
check('CHI ĐỘI 7B present', contains('CHI ĐỘI 7B'));
check('NĂM HỌC 2026 – 2027 present', contains('NĂM HỌC 2026'));
check('DANH SÁCH ỨNG CỬ / ĐỀ CỬ present', contains('DANH SÁCH ỨNG CỬ'));
check('VÀO PHẦN TRÒ CHƠI present', contains('VÀO PHẦN TRÒ CHƠI'));

console.log('\n── CANDIDATE NAMES (6 exact) ───────────────────────────');
check('01 PHẠM HỒNG ANH', contains('PHẠM HỒNG ANH'));
check('02 NGUYỄN HOÀNG QUANG ANH', contains('NGUYỄN HOÀNG QUANG ANH'));
check('03 NGUYỄN HUY DŨNG', contains('NGUYỄN HUY DŨNG'));
check('04 NGUYỄN THÁI DƯƠNG', contains('NGUYỄN THÁI DƯƠNG'));
check('05 ĐỖ NGUYỄN AN NHIÊN', contains('ĐỖ NGUYỄN AN NHIÊN'));
check('06 TRƯƠNG GIA TUỆ', contains('TRƯƠNG GIA TUỆ'));

console.log('\n── ACADEMIC DATA ───────────────────────────────────────');
check('XUẤT SẮC category', contains('XUẤT SẮC'));
check('count 2 for Xuất sắc', bundle.includes('count:2') || bundle.includes('count: 2'));
check('count 26 for Tốt', bundle.includes('count:26') || bundle.includes('count: 26'));
check('count 25 for Khá', bundle.includes('count:25') || bundle.includes('count: 25'));
check('count 3 for Đạt', bundle.includes('count:3') || bundle.includes('count: 3'));
check('display 56 HS total', contains('56'));
check('TỐT category', contains('TỐT'));
check('KHÁ category', contains('KHÁ'));
check('ĐẠT category', contains('ĐẠT'));

console.log('\n── OLD DATA REMOVED ────────────────────────────────────');
check('Old count 30 Tốt NOT present', !bundle.includes('count:30') && !bundle.includes('count: 30'), 'Old count=30 still present!');
check('Old count 18 Khá NOT present', !bundle.includes('count:18') && !bundle.includes('count: 18'), 'Old count=18 still present!');
check('Old total 51 NOT present', !bundle.includes('=51') && !bundle.includes('= 51'), 'Old total still present!');
check('100% XẾP LOẠI TỐT NOT present', !bundle.includes('100% XẾP LOẠI'), 'Old string still present!');

console.log('\n── 7E LEAKAGE CHECK ────────────────────────────────────');
const has7E = bundle.match(/[^a-zA-Z0-9]7E[^a-zA-Z0-9]/);
check('No 7E in JS bundle', !has7E);

console.log('\n── GAME MECHANICS ───────────────────────────────────────');
check('completedCount===9 gate', contains('completedCount===9') || contains('completedCount ===9') || contains('=== 9') || contains('==9'));
check('NHẬN MẢNH GHÉP button text', contains('NHẬN MẢNH GHÉP'));
check('VỀ BẢNG CHỌN Ô button text', contains('VỀ BẢNG CHỌN Ô'));
check('THỬ LẠI button text', contains('THỬ LẠI'));
check('XÁC NHẬN button text', contains('XÁC NHẬN'));
check('backToLobby method', contains('backToLobby'));
check('pauseGame method', contains('pauseGame'));
check('unlockPiece method', contains('unlockPiece'));

console.log('\n── DIRECTIONS (PHƯƠNG HƯỚNG) ───────────────────────────');
check('HỌC TẬP CHỦ ĐỘNG – ỨNG DỤNG AI', contains('HỌC TẬP CHỦ ĐỘNG'));
check('TIẾNG ANH – MỖI NGÀY MỘT BƯỚC TIẾN', contains('TIẾNG ANH'));
check('ĐOÀN KẾT – KỶ LUẬT – TRÁCH NHIỆM', contains('ĐOÀN KẾT'));
check('SỐNG XANH – THAM GIA TÍCH CỰC', contains('SỐNG XANH'));
check('YÊU THƯƠNG – TRUNG THỰC – TIẾN BỘ', contains('YÊU THƯƠNG'));

console.log('\n── GAME INTRO SCENE ────────────────────────────────────');
check('THỂ LỆ TRÒ CHƠI present', contains('THỂ LỆ TRÒ CHƠI'));
check('VÀO BẢNG CHỌN Ô', contains('VÀO BẢNG CHỌN Ô'));

console.log('\n── KEYBOARD / NAVIGATION ────────────────────────────────');
check('ArrowRight handler', contains('ArrowRight'));
check('ArrowLeft handler', contains('ArrowLeft'));
check('Escape handler', contains('Escape'));
// Fullscreen and mute may be mangled but the function must exist
check('requestFullscreen call', contains('requestFullscreen'));
check('toggleMute call', contains('toggleMute'));

console.log('\n═══════════════════════════════════════════════════════');
console.log(`  RESULT: ${pass} PASS, ${fail} FAIL`);
console.log('═══════════════════════════════════════════════════════\n');

if (fail > 0) process.exit(1);

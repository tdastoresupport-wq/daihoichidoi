# BÁO CÁO KIỂM TOÁN THỊ GIÁC V2 (VISUAL AUDIT V2)
## ĐẠI HỘI CHI ĐỘI LỚP 7B — TRƯỜNG THCS NGUYỄN DU
### Năm học 2026 – 2027 | Nền tảng: Interactive Web Stage Presentation (1920×1080)

---

> **QUY TẮC BẮT BUỘC:** Giai đoạn Phase 1 chỉ tiến hành thanh tra, phân tích, lập hồ sơ hiện trạng và thiết lập định hướng thị giác V2. **TUYỆT ĐỐI KHÔNG SỬA CODE ỨNG DỤNG** cho đến khi vượt qua **V2 DESIGN GATE** ở cuối tài liệu này.

---

## MỤC LỤC

1. [A. Hiện trạng & Chẩn đoán thị giác V1](#a-hiện-trạng--chẩn-đoán-thị-giác-v1)
2. [B. Hệ thống Engine V1 tái sử dụng (Reusable Systems)](#b-hệ-thống-engine-v1-tái-sử-dụng-reusable-systems)
3. [C. Phân tích chi tiết các điểm nghẽn thị giác (Visual & Stage Problems)](#c-phân-tích-chi-tiết-các-điểm-nghẽn-thị-giác-visual--stage-problems)
4. [D. Ba hướng nghệ thuật đột phá (3 Art Directions)](#d-ba-hướng-nghệ-thuật-đột-phá-3-art-directions)
5. [E. Kiến trúc thị giác khuyến nghị (Recommended Visual Architecture)](#e-kiến-trúc-thị-giác-khuyến-nghị-recommended-visual-architecture)
6. [F. Hệ thống nhận diện đặc quyền Chi đội 7B (7B Identity System)](#f-hệ-thống-nhận-diện-đặc-quyền-chi-đội-7b-7b-identity-system)
7. [G. Danh mục tác phẩm đồ họa mới (New Artwork Inventory)](#g-danh-mục-tác-phẩm-đồ-họa-mới-new-artwork-inventory)
8. [H. Ngôn ngữ chuyển động sân khấu (Stage Motion Language)](#h-ngôn-ngữ-chuyển-động-sân-khấu-stage-motion-language)
9. [I. Tiêu chuẩn hiển thị màn chiếu & sân khấu lớn (Large-Screen Rules)](#i-tiêu-chuẩn-hiển-thị-màn-chiếu--sân-khấu-lớn-large-screen-rules)
10. [J. Nguyên lý thiết kế V2 (V2 Design Principles)](#j-nguyên-lý-thiết-kế-v2-v2-design-principles)
11. [K. Lộ trình triển khai đề xuất (Implementation Order)](#k-lộ-trình-triển-khai-đề-xuất-implementation-order)
12. [V2 DESIGN GATE — Điều kiện tiên quyết để sang Phase 2](#v2-design-gate--điều-kiện-tiên-quyết-để-sang-phase-2)

---

## A. HIỆN TRẠNG & CHẨN ĐOÁN THỊ GIÁC V1

### 1. Đánh giá tổng quan
Phiên bản V1 của `7b-web` đã giải quyết xuất sắc phần khung kỹ thuật (Functional Skeleton): cấu trúc Svelte 5 runes mượt mà, scale toạ độ chuẩn 1920×1080 không phụ thuộc độ phân giải màn hình, bàn phím điều khiển nhạy bén, âm thanh đồng bộ và logic game hoàn chỉnh.

Tuy nhiên, **về mặt thị giác**, V1 hiện đang mang hình hài của một **website thông tin dạng tối (Dark Dashboard/Web Quiz)** chứ chưa đạt đến tầm vóc của một **MÀN HÌNH SÂN KHẤU SỰ KIỆN TRỰC TIẾP (Cinematic Stage & Game Show LED Screen)**. 

```
[ Hiện trạng V1: Web Quiz UI ]  ───(Nâng cấp V2)───►  [ Mục tiêu V2: Live Stage Experience ]
- Thẻ chữ đơn điệu (Plain text cards)               - Không gian sân khấu điện ảnh (Cinematic 3D Depth)
- Phông nền phẳng tối, gradient yếu                 - Hệ thống ánh sáng sân khấu (Spotlights, God rays)
- Thiếu hình ảnh đại diện (Zero hero artwork)        - Bộ Artwork độc quyền 7B + Mascot đồng hành
- Card câu hỏi màu giấy kem gây gãy nhịp             - Giao diện Game show phát sáng (Luminous Stage UI)
- Không có bản sắc riêng của 7B                      - Bộ nhận diện 7B độc bản, không thể nhầm lẫn
```

---

## B. HỆ THỐNG ENGINE V1 TÁI SỬ DỤNG (REUSABLE SYSTEMS)

> **Mục tiêu cốt lõi:** Giữ nguyên 100% logic điều khiển và state engine đã chạy ổn định, chỉ thay thế và tái cấu trúc toàn diện lớp giao diện (Visual & Presentation Layer).

| Thành phần Engine | File mã nguồn | Tình trạng | Mức độ tái sử dụng | Ghi chú kỹ thuật |
| :--- | :--- | :--- | :--- | :--- |
| **Presentation State Machine** | `src/lib/presentation.svelte.ts` | Hoàn thiện | **100% Tái sử dụng** | Quản lý chuyển cảnh (`opening`, `directions`, `lobby`, `game`, `closing`), trạng thái 9 ô (`available`, `opened`, `completed`). |
| **Data & Content Engine** | `src/lib/data.ts` | Hoàn thiện | **100% Tái sử dụng** | Chuẩn hóa câu trả lời (`norm()`), mapping câu hỏi, cơ chế checkable vs present-only, gắn cờ `HAS_7B_DATA`. |
| **Dual Audio System** | `src/lib/audio.svelte.ts` | Hoàn thiện | **100% Tái sử dụng** | Quản lý nhạc nền lặp vô tận (Media1), WebAudio SFX synth (`click`, `correct`, `wrong`, `fanfare`), probe clip âm thanh Ô 6. |
| **Canvas Particle Burst** | `src/lib/confetti.ts` | Tốt | **Tái sử dụng & Nâng cấp hạt** | Cơ chế bắn hạt canvas nhẹ nhàng, hỗ trợ `prefers-reduced-motion`. Chỉ cần update màu hạt theo palette V2. |
| **1080p Canvas Scaling** | `src/App.svelte` | Hoàn thiện | **100% Tái sử dụng** | Tự động căn giữa `transform: translate(-50%, -50%) scale(scale)` chuẩn 1920×1080. |
| **Stage Hotkeys & Control** | `src/App.svelte` | Hoàn thiện | **100% Tái sử dụng** | Bắt phím Space, Enter, Arrow Left/Right, Esc, F (Fullscreen), M (Mute). |

---

## C. PHÂN TÍCH CHI TIẾT CÁC ĐIỂM NGHẼN THỊ GIÁC (VISUAL & STAGE PROBLEMS)

### 1. Bảng kiểm kê thị giác từng Scene (Visual Inventory)

| Scene | Thành phần thị giác hiện tại | Ưu điểm hiện có | Nhược điểm thị giác V1 | Khả năng tái sử dụng | Nhu cầu Artwork mới |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01. Opening** | Chữ "ĐẠI HỘI CHI ĐỘI", "LỚP 7B" to có gradient vàng, 1 nút Bắt đầu. | Chữ to, có hiệu ứng shimmer chữ CSS. | Quá trống trải (hơn 70% diện tích đen/xanh tối vô nghĩa); không có biểu trưng Chi đội, không có linh vật, thiếu cảm giác hoành tráng mở màn sự kiện. | Tái sử dụng typography & layout căn giữa. | **BẮT BUỘC**: Key visual mở màn (Opening Hero 3D/Digital Art) + Huy hiệu 7B tỏa sáng. |
| **02. Directions** | 1 Card xanh tím ở giữa, icon tròn ở trên, chữ phương hướng ở giữa, 5 chấm tròn. | Chữ to, chuyển bước carousel độc lập mượt. | Card đơn điệu như slide thuyết trình phẳng; icon SVG line mỏng khó thấy từ xa; thiếu bối cảnh hình ảnh minh họa cho 5 tôn chỉ hành động. | Giữ nguyên logic carousel chuyển 5 slide. | **BẮT BUỘC**: 5 Artwork minh họa chuyên biệt hoặc 1 Hero Banner tương tác theo từng chủ đề phương hướng. |
| **03. Objectives** | Tạm thời ẩn (`HAS_7B_DATA = false`). | Không bịa dữ liệu giả. | Chưa có layout visual khi dữ liệu sẵn sàng. | Giữ gate logic. | **CẦN CHUẨN BỊ**: Khung layout vinh danh / chỉ tiêu đồ họa dạng cột mốc 3D. |
| **04. Puzzle Lobby** | Lưới 3×3 (9 ô vuông 200px), 3 viên thuốc quy luật ở trên, thanh tiến độ ở dưới. | Rõ ràng, dễ bấm, phản hồi click nhanh. | Trông như bàn phím máy tính bấm số (numpad/calculator); thiếu chiều sâu vũ trụ bí ẩn; ô số may mắn (Ô 8) chỉ có màu vàng phẳng, chưa kích thích sự tò mò. | Giữ cấu trúc lưới 3×3 & state tracking. | **BẮT BUỘC**: Thiết kế lại 9 Tile như các khối pha lê/hộp năng lượng ma trận 3D, ô Lucky Tile có hiệu ứng hào quang lấp lánh riêng. |
| **05. Gameplay** | Hộp trắng ngà (`--c-paper`), chữ câu hỏi đen, input trắng, nút bấm vàng. | Tương phản chữ đen trên nền sáng dễ đọc. | **Gãy đứt trải nghiệm thị giác**: đang ở nền tối sâu chuyển đột ngột sang một tờ giấy A4 màu kem thô; hình tam giác (Ô 9) và rebus (Ô 7) dạng khung vẽ thô sơ; không có visual hỗ trợ Ô 4 (AI) và Ô 6 (Music). | Giữ cơ chế nhập đáp án, tự chấm & flip card. | **BẮT BUỘC**: Chuyển sang phong cách Hologram/Luminous HUD; vẽ lại bộ Rebus Ô 7, hình tam giác Ô 9, khung phát sóng âm Ô 6, robot/AI đại diện Ô 4. |
| **06. Closing** | Chữ "Cảm ơn đã tham gia!", điểm số `completedCount/9`, 2 nút bấm. | Thông tin cô đọng. | Cực kỳ chống chếnh, kết thúc nguội lạnh, không có cảm giác chiến thắng/vinh quang của một đại hội thành công rực rỡ. | Giữ logic nút chơi lại & về trang đầu. | **BẮT BUỘC**: Hero Artwork tổng kết "Chi đội 7B — Vững bước tương lai" rực rỡ cờ hoa, ánh sáng chiến thắng và linh vật chúc mừng. |

---

### 2. Các vấn đề cốt lõi trên màn chiếu sân khấu lớn (1080p Stage LED)

1. **Vấn đề ánh sáng và độ tương phản sân khấu (Stage Ambient Lighting):**
   * Trong hội trường, ánh sáng đèn sân khấu thường làm nhạt màu đen thuần túy. Màu nền của V1 hiện tại quá tối và thiếu các lớp ven sáng (rim lighting), dẫn đến hình ảnh trên máy chiếu bị chìm.
2. **Khoảng cách thị giác người xem (3m – 15m):**
   * Các chi tiết icon nét đơn (SVG stroke 2-3px) và các dòng phụ chú 20px hoàn toàn biến mất khi nhìn từ hàng ghế khán giả cuối hội trường.
3. **Sự thiếu vắng điểm nhấn thị giác (Focal Point Deficit):**
   * Mọi cảnh hiện tại chỉ toàn là chữ và khung hộp. Mắt người xem không có một nhân vật trung tâm, một biểu tượng vinh danh hay một tác phẩm mỹ thuật để tập trung cảm xúc.
4. **Hiện tượng "Web Form" trong Game Show:**
   * Khung trả lời câu hỏi hiện tại giống form điền khảo sát web hơn là bảng điện tử của chương trình "Đường lên đỉnh Olympia" hay "Ai là triệu phú".

---

## D. BA HƯỚNG NGHỆ THUẬT ĐỘT PHÁ (3 ART DIRECTIONS)

---

### CONCEPT A: CINEMATIC SCHOOL EVENT (Đại Hội Danh Dự & Trang Trọng)

* **Ý tưởng chủ đạo:** Biến màn hình thành một khán phòng hoàng gia hiện đại với ánh sáng sân khấu chuyên nghiệp, dải lụa danh dự, huy hiệu vàng đồng và ánh đèn spotlight xanh thẳm.
* **Bảng màu:**
  * Xanh bóng đêm hoàng gia (`#030B1E`, `#0A1938`)
  * Vàng kim loại đúc nóng (`#FFD13B`, `#D99400`, `#FFF0AA`)
  * Tia sáng Sapphire (`#1A65FF`, `#5794FF`)
  * Bạc viền ngọc trai (`#E2E8F8`)
* **Chất liệu & Ánh sáng:** Kim loại chải xước mạ vàng, thủy tinh hun khói (Smoked Glass), chùm đèn chiếu ven sâu, hạt bụi vàng nổi lơ lửng trong không gian.
* **Cảm xúc mang lại:** **Trang nghiêm, Đẳng cấp, Tự hào, Đầy khát vọng.**

---

### CONCEPT B: FUTURE STUDENT / GAME SHOW (Vũ Trụ Tri Thức & Công Nghệ AI)

* **Ý tưởng chủ đạo:** Một đấu trường tri thức tương lai dành cho học sinh thế hệ mới. Màn hình mô phỏng buồng lái phi thuyền hoặc trạm nghiên cứu trí tuệ nhân tạo thế hệ 2026–2027.
* **Bảng màu:**
  * Xanh vực thẳm Cyber (`#050814`, `#0B132B`)
  * Xanh Laser Neon (`#00F0FF`, `#0077FE`)
  * Vàng Plasma năng lượng (`#FFB800`, `#FFE500`)
  * Tím thạch anh hỗ trợ (`#7928CA`, `#9E00FF`)
* **Chất liệu & Ánh sáng:** Giao diện Hologram phát sáng tự thân (Luminous UI), đường viền phát quang neon, lưới tọa độ không gian số, các khối pha lê phát năng lượng.
* **Cảm xúc mang lại:** **Hiện đại, Bùng nổ năng lượng, Đột phá công nghệ, Tràn đầy hứng khởi.**

---

### CONCEPT C: 7B HERO UNIVERSE (Biệt Đội Phi Hành 7B — Khám Phá Tri Thức)

* **Ý tưởng chủ đạo:** Xây dựng một thế giới nhận diện độc quyền với nhân vật biểu trưng của 7B (Linh vật "Bé 7B - Phi hành gia Tiên phong" hoặc "Búp Măng Tri Thức Số"), kết hợp tinh thần Đội Thiếu niên Tiền phong với phong cách 3D Stylized cao cấp của Pixar/Riot.
* **Bảng màu:**
  * Xanh dương đậm nhận diện 7B (`#081226`, `#0D224A`)
  * Vàng hoa mai rực rỡ (`#FFC01D`, `#FFA000`)
  * Đỏ khăn quàng danh dự (`#E63946`, `#FF4D5A`)
  * Trắng sứ ngọc trai (`#F8F9FA`)
* **Chất liệu & Ánh sáng:** Mô hình 3D Stylized mềm mại, bóng bẩy cao cấp, ánh sáng ấm áp kết hợp hào quang sao băng, phù hiệu Đội cách điệu tinh xảo.
* **Cảm xúc mang lại:** **Độc bản 7B, Trẻ trung, Gần gũi, Truyền cảm hứng gắn kết tập thể.**

---

## E. KIẾN TRÚC THỊ GIÁC KHUYẾN NGHỊ (RECOMMENDED VISUAL ARCHITECTURE)

> **ĐỀ XUẤT TỐI ƯU:** Kết hợp tính **Trang trọng & Đẳng cấp của Concept A** với **Linh hồn nhận diện độc bản của Concept C** và **Năng lượng ánh sáng Hologram của Concept B**.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 KIẾN TRÚC GIAO DIỆN SÂN KHẤU V2 CHI ĐỘI 7B                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ [TẦNG 1: SÂN KHẤU VŨ TRỤ]                                                   │
│ Deep Stage Night Navy Background + Dual Spotlights + Floating Gold Orbs      │
├─────────────────────────────────────────────────────────────────────────────┤
│ [TẦNG 2: HERO ARTWORK & BẢN SẮC 7B]                                         │
│ 3D 7B Crest Emblem / Linh vật Astro-7B / Tranh minh họa chủ đề chất lượng cao │
├─────────────────────────────────────────────────────────────────────────────┤
│ [TẦNG 3: GLASS-HUD CARD INTERFACE]                                          │
│ Card thủy tinh tối viền vàng neon (Backdrop-blur, không dùng giấy trắng)     │
├─────────────────────────────────────────────────────────────────────────────┤
│ [TẦNG 4: NỘI DUNG TYPOGRAPHY KHỔ LỚN]                                       │
│ Tiêu đề Paytone One mạ vàng + Nội dung Bricolage Grotesque tương phản cao   │
├─────────────────────────────────────────────────────────────────────────────┤
│ [TẦNG 5: CONTROLS & STAGE DOCK]                                             │
│ Thanh điều khiển MC nổi phía dưới, tinh gọn, nổi bật trạng thái             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## F. HỆ THỐNG NHẬN DIỆN ĐẶC QUYỀN CHI ĐỘI 7B (7B IDENTITY SYSTEM)

Tuyệt đối không sao chép hình ảnh từ lớp 7E mẫu. Chi đội 7B sở hữu bộ ngôn ngữ nhận diện riêng biệt:

```
          ┌─────────────────────────────────────────────────────────┐
          │               HỆ THỐNG NHẬN DIỆN CHI ĐỘI 7B             │
          └─────────────────────────────────────────────────────────┘
                                       │
     ┌──────────────────┬──────────────┴─────┬──────────────────┐
     ▼                  ▼                    ▼                  ▼
[1. 7B CREST]     [2. MASCOT "BÉ 7B"]   [3. 7B ICON FAMILY]  [4. STAGE LIGHTING]
Huy hiệu mạ vàng  Linh vật Robot nhí     Bộ icon dày 4px      Chùm đèn Sapphire
lồng số 7B & sao  tai nghe phát sóng     phát quang vàng      & Vàng năng lượng
```

1. **Huy hiệu Chi đội 7B (7B Emblem):**
   * Thiết kế khối 3D đúc nổi: Chữ số **"7B"** cách điệu với đường nét vươn lên, lồng trong vành đai ngôi sao tri thức và bông lúa vinh quang. 
2. **Linh vật chính thức (7B Mascot Companion — "Nova-7B"):**
   * Một nhân vật đồng hành kỹ thuật số thông minh: Chú robot học sinh đeo khăn quàng đỏ cách điệu ánh sáng, khuôn mặt màn hình LED biểu cảm linh hoạt (chúc mừng, cổ vũ, suy nghĩ). Đây cũng chính là hình ảnh đại diện trả lời câu hỏi AI (Ô 4) và xuất hiện xuyên suốt hành trình.
3. **Bộ Icon đặc quyền (Custom Iconography):**
   * Chuyển từ vector 2D mảnh dẻ sang Icon 3D / Isometric phát sáng viền:
     * *Học tập & AI:* Não bộ phát sáng kết hợp chip lượng tử.
     * *Tiếng Anh:* Quả địa cầu năng động vây quanh bởi dải băng hội nhập.
     * *Đoàn kết:* Vòng tay kết nối ba màu cờ đội.
     * *Sống xanh:* Mầm cây năng lượng xanh sinh thái.
     * *Yêu thương:* Trái tim pha lê hồng ấm áp.
4. **Họa tiết nền nhận diện (Visual Pattern Motif):**
   * Họa tiết chìm (Watermark Grid) gồm các chòm sao kết nối thành số 7B và các hình đa giác tri thức, mờ 4% ở hậu cảnh.
5. **Thiết kế ô số bí ẩn (Puzzle Matrix Tiles):**
   * Các ô số 1..9 là các khối hộp năng lượng lục giác vát cạnh (Sci-fi Hex/Beveled Tiles) với số hiển thị bằng phông display kim loại nổi, trạng thái hoàn thành sẽ biến thành viên ngọc bích phát sáng kèm dấu tick vàng.

---

## G. DANH MỤC TÁC PHẨM ĐỒ HỌA MỚI (NEW ARTWORK INVENTORY)

Tất cả các tác phẩm đồ họa dưới đây được thiết kế tỉ mỉ cho không gian trình chiếu 16:9 (1920×1080), loại bỏ hoàn toàn các khung ảnh thô và placeholder cũ:

```
┌────┬──────────────────────┬─────────────┬───────────┬──────────────────────────────────────────┐
│ ID │ Tên tác phẩm          │ Tỷ lệ / Vị trí│ Định dạng │ Mô tả thị giác & Ánh sáng                 │
├────┼──────────────────────┼─────────────┼───────────┼──────────────────────────────────────────┤
│ #1 │ Opening Hero Artwork │ 16:9        │ 3D/AI-Gen │ Cổng đại hội vinh quang, logo 7B tỏa sáng│
│ #2 │ Nova-7B Mascot Pack  │ 1:1 / 4:5   │ 3D Render │ Chú robot học sinh khăn quàng công nghệ │
│ #3 │ 5 Directions Banners │ 16:9 / 4:3  │ 3D/Vect   │ 5 bộ tranh minh họa tôn chỉ hành động    │
│ #4 │ 7B AI Nexus Visual   │ 16:9        │ 3D Render │ Trí tuệ nhân tạo đồng hành mọi lứa tuổi  │
│ #5 │ Secret Puzzle Matrix │ 1:1 Canvas  │ Procedural│ 9 ô hộp năng lượng ma trận tri thức      │
│ #6 │ Music Wave Arena     │ 16:9        │ 3D Motion │ Đấu trường âm nhạc, sóng âm neon vàng    │
│ #7 │ Rebus Art "Ảo Giác"  │ 3-Slot Grid │ Custom Ill│ 3 tranh giải đố rebus nghệ thuật cao cấp │
│ #8 │ Triangle Count Hero  │ 1:1 Vector  │ SVG/Vector│ Hình học 25 tam giác phát quang sắc nét  │
│ #9 │ Grand Finale Banner  │ 16:9        │ 3D/AI-Gen │ Đại hội thành công rực rỡ, pháo hoa vàng │
└────┴──────────────────────┴─────────────┴───────────┴──────────────────────────────────────────┘
```

### Chi tiết thông số kỹ thuật từng tác phẩm:

#### 1. Artwork #1 — Opening Key Visual ("Bình Minh Chi Đội 7B")
* **Mục đích:** Tạo ấn tượng choáng ngợp ngay giây đầu tiên khi đại biểu và học sinh bước vào hội trường.
* **Bố cục:** Trung tâm là Huy hiệu 7B đúc vàng 3D lơ lửng giữa cổng vòm ánh sáng tương lai, hai bên là chùm đèn chiếu hội trường, các hạt bụi vàng lấp lánh xung quanh.
* **Tỷ lệ & Vùng an toàn:** 16:9 (1920×1080), vùng an toàn cách lề 120px.
* **Phong cách & Ánh sáng:** Cinematic 3D Realism, ánh sáng vàng kim (`#FFD700`) đối lập với nền xanh đêm hoàng gia (`#0A1938`).
* **Phương thức thực hiện:** AI Image Generation chuyên sâu với prompt cấu trúc chuẩn + hậu kỳ cắt lớp layer.

#### 2. Artwork #2 — 7B Mascot Companion ("Nova-7B")
* **Mục đích:** Linh vật xuyên suốt của Chi đội, xuất hiện chào mừng, biểu cảm khi trả lời câu hỏi và ăn mừng chiến thắng.
* **Bố cục:** Nhân vật đứng góc 3/4, nụ cười màn hình LED, tay giơ chào phong cách Đội viên tương lai.
* **Tỷ lệ & Vị trí:** 1:1 hoặc alpha PNG trong suốt, xuất hiện ở Opening, Ô 4 (AI), Ô 8 (May mắn), Closing.
* **Phong cách:** 3D Stylized Cute Tech (phong cách Pixar/Overwatch), chất liệu men sứ trắng bóng kết hợp chi tiết kim loại vàng.

#### 3. Artwork #3 — Bộ tranh 5 Phương Hướng Hoạt Động (Directions Suite)
* **Mục đích:** Minh họa sinh động 5 tôn chỉ thay vì chỉ đọc chữ đơn điệu.
  1. *Học tập & AI:* Học sinh 7B tương tác với màn hình nổi ba chiều.
  2. *Tiếng Anh:* Chuyến bay kết nối các địa danh văn hóa thế giới.
  3. *Đoàn kết kỷ luật:* Đội hình đồng lòng tiến bước dưới cờ Đội.
  4. *Sống xanh:* Trồng cây thông minh và bảo vệ môi trường trường học.
  5. *Yêu thương trung thực:* Vòng tròn sẻ chia và gắn kết bè bạn.
* **Tỷ lệ:** 16:9 thẻ ngang lồng trong màn hình trình diễn.

#### 4. Artwork #4 — 7B AI Companion Visual (Thay thế hoàn toàn ảnh stock cũ)
* **Mục đích:** Minh họa câu hỏi Ô 4: *"AI được sử dụng bởi những độ tuổi nào?"*
* **Bố cục:** Chú robot Nova-7B đứng giữa một vòng tròn kết nối đa thế hệ (em nhỏ, học sinh, giáo viên, ông bà) thông qua các nhịp cầu ánh sáng tri thức.
* **Chất liệu:** 3D Render đồng nhất phong cách với Mascot #2.

#### 5. Artwork #5 — Puzzle Matrix Background & Lucky Tile
* **Mục đích:** Biến màn chơi thành một chiếc két sắt tri thức khổng lồ.
* **Chi tiết:** Ô số 8 (May mắn) được thiết kế đặc biệt như một rương quà hoàng kim tỏa hào quang rực rỡ và lơ lửng nhẹ nhàng.

#### 6. Artwork #6 — Music Challenge Arena Visual (Ô 6)
* **Mục đích:** Minh họa câu đố nghe nhạc.
* **Bố cục:** Một quả cầu âm thanh pha lê (Crystal Sound Orb) đang rung động với dải sóng âm neon vàng lượn sóng 3D sống động.

#### 7. Artwork #7 — Rebus Puzzle Art Pack ("Ảo Giác" — Ô 7)
* **Mục đích:** Hình ảnh minh họa chất lượng cao cho câu đố nhìn hình đoán chữ (từ khóa: Ảo giác).
* **Bố cục:** 3 khung tranh vẽ tay kỹ thuật số cao cấp đồng bộ màu sắc và nét vẽ, có ký hiệu phép cộng `(+)` phát sáng công nghệ ở giữa.

#### 8. Artwork #8 — Triangle Geometry Puzzle Hero (Ô 9)
* **Mục đích:** Vẽ lại hình học đếm 25 tam giác với phong cách phát quang kỹ thuật số (Neon Blueprint), các đường nét rõ ràng sắc nét từng pixel, tương phản hoàn hảo trên màn chiếu.
* **Định dạng:** Clean SVG đa tầng (Layers riêng biệt để MC có thể bấm làm nổi bật các tam giác khi giải thích đáp án).

#### 9. Artwork #9 — Closing Victory Grand Finale
* **Mục đích:** Màn hình kết thúc đại hội bùng nổ cảm xúc thành công.
* **Bố cục:** Biệt đội 7B và Mascot Nova-7B đứng dưới bầu trời pháo hoa vàng rực rỡ, dòng chữ *"ĐẠI HỘI CHI ĐỘI 7B THÀNH CÔNG RỰC RỠ!"* uy nghi ở trung tâm.

---

## H. NGÔN NGỮ CHUYỂN ĐỘNG SÂN KHẤU (STAGE MOTION LANGUAGE)

> **Nguyên tắc chuyển động:** Cinematic — Quyết đoán — Nhanh gọn (phù hợp nhịp độ dẫn chương trình của MC trực tiếp) — Không rườm rà lặp lại.

```
                  ┌─────────────────────────────────────────┐
                  │    CHOREOGRAPHY CÁC SỰ KIỆN TRỌNG TÂM    │
                  └─────────────────────────────────────────┘

[OPENING]        Huy hiệu 7B zoom từ 0.8 -> 1.0 (0.8s) + Ánh sáng quét qua (Shimmer)
     │
[CHỌN Ô SỐ]      Ô số thu nhẹ 0.94 -> Bùng nổ sóng xung kích viền (Shockwave 0.3s)
     │
[VÀO GAME]       Transition dạng Portal mở từ giữa màn hình (0.45s)
     │
[TRẢ LỜI ĐÚNG]   Flash viền xanh ngọc + Âm Fanfare + Bắn pháo hoa Confetti 3D (1.2s)
     │
[Ô MAY MẮN]      Hộp quà tự mở nắp bung hào quang vàng rực rỡ (0.6s)
     │
[TRỞ VỀ BOARD]   Lật thẻ thu nhỏ mượt mà về lại vị trí ô số trên ma trận (0.35s)
```

* **Thời lượng chuẩn (Timing Tokens):**
  * Micro-action (Hover/Focus): `160ms` (`power2.out`)
  * Tile selection shockwave: `300ms` (`back.out(1.5)`)
  * Question Card Flip: `480ms` (`power3.out`, 3D Perspective `1200px`)
  * Full Scene Transition: `600ms` (Staggered Cross-Fade + Depth Zoom)
* **Giảm tải chuyển động (Reduced-Motion Mode):**
  * Tự động tắt toàn bộ zoom sâu và xoay 3D, chỉ sử dụng hiệu ứng mờ dần (Opacity Cross-Fade `250ms`) khi hệ thống bật chế độ hỗ trợ tiếp cận.

---

## I. TIÊU CHUẨN HIỂN THỊ MÀN CHIẾU & SÂN KHẤU LỚN (LARGE-SCREEN RULES)

Để đảm bảo hiệu quả tuyệt đối khi chiếu thực tế trong hội trường trên màn LED hoặc máy chiếu 1080p:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      QUY CHUẨN HIỂN THỊ SÂN KHẤU 1080P                      │
├────────────────────────────────┬────────────────────────────────────────────┤
│ THÔNG SỐ                       │ TIÊU CHUẨN BẮT BUỘC                        │
├────────────────────────────────┼────────────────────────────────────────────┤
│ Tỷ lệ khung hình (Aspect Ratio) │ Cố định 16:9 (1920 × 1080 px)              │
│ Vùng an toàn viền (Safe Margin)│ Tối thiểu 96px (tránh bị che bởi mép bục)  │
│ Cỡ chữ Tiêu đề (Headings)      │ 72px – 140px (Display Font, Stroke rõ nét) │
│ Cỡ chữ Nội dung chính (Body/Q) │ 44px – 56px (Đọc rõ từ khoảng cách 15m)    │
│ Cỡ chữ Chú thích nhỏ nhất (Min)│ Tuyệt đối không nhỏ hơn 28px               │
│ Độ tương phản màu (Contrast)   │ Đạt chuẩn WCAG AAA trên nền tối (> 7:1)    │
│ Trạng thái ô (Tile States)     │ Phải nhận diện được bằng cả Màu + Icon + Số│
└────────────────────────────────┴────────────────────────────────────────────┘
```

---

## J. NGUYÊN LÝ THIẾT KẾ V2 (V2 DESIGN PRINCIPLES)

1. **STAGE-FIRST IMPACT:** Mọi màn hình phải có sức nặng như một phông nền sân khấu sự kiện thực thụ, không để lại mảng trống thừa thãi.
2. **IMMERSIVE DARK THEME (NO PAPER CUTS):** Tuyệt đối không chuyển đột ngột sang các khung thẻ giấy trắng/vàng nhạt; toàn bộ giao diện sử dụng ngôn ngữ kính phát quang (Smoked Glassmorphism & Luminous HUD).
3. **MC-CENTRIC READABILITY:** Cỡ chữ và nút bấm được tối ưu để MC chỉ cần liếc mắt 0.5s từ khoảng cách 3m là nắm bắt được trạng thái để điều khiển nhịp độ chương trình.
4. **PURE 7B DNA:** Mỗi khung hình đều mang linh hồn, màu cờ sắc áo và biểu tượng tự hào của Chi đội 7B.
5. **ZERO CONTENT INVENTION:** Tuyệt đối giữ đúng dữ liệu thực tế, không bịa tên học sinh, thành tích hay số liệu khi chưa có văn bản chính thức (`CONTENT QA PENDING`).

---

## K. LỘ TRÌNH TRIỂN KHAI ĐỀ XUẤT (IMPLEMENTATION ORDER)

Sau khi tài liệu này được phê duyệt tại **V2 DESIGN GATE**:

* **Giai đoạn 2A: Thiết kế & Tạo tác tài sản đồ họa (Asset Generation & Prep)**
  * Tạo trọn bộ 9 Artwork mới theo bảng kiểm kê mục G.
  * Tinh chỉnh ảnh chất lượng cao 1080p, tối ưu hóa WebP/SVG nhẹ và sắc nét.
* **Giai đoạn 2B: Tái lập hệ thống Tokens & Component Base**
  * Cập nhật `tokens.css` với bảng màu phát quang, bóng đổ sân khấu và kích thước chuẩn.
  * Xây dựng lại `SceneHeader`, `AudioDock`, `ProgressDots`, `LuminousCard`.
* **Giai đoạn 2C: Tái cấu trúc từng Scene (Visual Reskinning)**
  1. *Scene 01: Opening* — Gắn Hero Artwork, Logo 7B 3D và nút Bắt đầu phát sáng.
  2. *Scene 02: Directions* — Tích hợp bộ tranh 5 phương hướng hoạt động dạng card nổi.
  3. *Scene 04: Lobby* — Lột xác ma trận 9 ô pha lê tri thức và ô Lucky Tile.
  4. *Scene 05: Gameplay* — Nâng cấp toàn diện sang Luminous HUD, tích hợp Rebus mới và Tam giác SVG sắc nét.
  5. *Scene 06: Closing* — Thiết lập màn hình kết thúc vinh quang và tổng kết điểm.
* **Giai đoạn 2D: Tinh chỉnh chuyển động & Kiểm thử thực địa**
  * Đồng bộ timeline GSAP cho từng thao tác click của MC.
  * Kiểm thử hiển thị toàn màn hình (F11 / Mode 1920×1080) và độ phản hồi âm thanh.

---

# V2 DESIGN GATE

> ⚠️ **ĐIỀU KIỆN TIÊN QUYẾT TRƯỚC KHI BƯỚC VÀO GIAI ĐOẠN CODE:**
>
> Ứng dụng sẽ **GIỮ NGUYÊN HIỆN TRẠNG MÃ NGUỒN**, không chỉnh sửa bất kỳ file Svelte nào cho đến khi các mục sau đây được người phụ trách xác nhận:

1. [ ] **Phê duyệt Art Direction:** Chọn chính thức giữa *Concept A (Cinematic Ceremonial)*, *Concept B (Future Tech)* hay *Bản phối khuyến nghị (A + C)*.
2. [ ] **Xác nhận Bộ linh vật & Nhận diện 7B:** Đồng ý triển khai hình tượng linh vật "Nova-7B" và biểu trưng 7B độc bản.
3. [ ] **Xác nhận Danh mục 9 Artwork:** Thông qua danh sách và tiêu chí mỹ thuật của 9 tác phẩm đồ họa mới tại Mục G.
4. [ ] **Xác nhận Quy chuẩn nội dung:** Duy trì cờ `HAS_7B_DATA = false` cho Scene 03 cho đến khi có dữ liệu chính thức; giữ nguyên văn bản các câu hỏi QA-pending.

---
*Tài liệu được lập bởi Antigravity Visual Audit Team — Hoàn tất Giai đoạn Phase 1.*

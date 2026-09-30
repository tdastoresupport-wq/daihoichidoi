# BỘ QUY CHUẨN THỊ GIÁC V2 (V2 ART DIRECTION BIBLE)
## ĐẠI HỘI CHI ĐỘI LỚP 7B — TRƯỜNG THCS NGUYỄN DU
### Năm học 2026 – 2027 | Màn hình sân khấu tương tác 16:9 (1920×1080)

---

> **QUY TẮC BẤT DI BẤT DỊCH (ABSOLUTE RULE):**
> Giai đoạn Phase 2 chỉ nhằm xác lập **Quy chuẩn thị giác (Art Direction Bible) & Đặc tả tác phẩm đồ họa**.
> **TUYỆT ĐỐI KHÔNG SỬA MÃ NGUỒN SVELTE, KHÔNG VIẾT LẠI ENGINE, KHÔNG TỰ Ý TÁI CẤU TRÚC ỨNG DỤNG** cho đến khi vượt qua **V2 ART DIRECTION GATE** ở cuối tài liệu này.

---

## MỤC LỤC

1. [A. Master Visual Direction — Hệ phân cấp thị giác chủ đạo](#a-master-visual-direction--hệ-phân-cấp-thị-giác-chủ-đạo)
2. [B. Color System — Hệ thống màu sắc sân khấu tinh chỉnh](#b-color-system--hệ-thống-màu-sắc-sân-khấu-tinh-chỉnh)
3. [C. Lighting System — Hệ thống ánh sáng điện ảnh](#c-lighting-system--hệ-thống-ánh-sáng-điện-ảnh)
4. [D. Material System — Hệ thống chất liệu bề mặt](#d-material-system--hệ-thống-chất-liệu-bề-mặt)
5. [E. Typography Direction — Định hướng phông chữ sân khấu](#e-typography-direction--định-hướng-phông-chữ-sân-khấu)
6. [F. Nova-7B Identity — Đặc tả linh vật trình diễn độc quyền](#f-nova-7b-identity--đặc-tả-linh-vật-trình-diễn-độc-quyền)
7. [G. 7B Visual Motif — Mô-típ nhận diện xuyên suốt](#g-7b-visual-motif--mô-típ-nhận-diện-xuyên-suốt)
8. [H. Artwork System — Đặc tả 9 tác phẩm đồ họa chủ chốt](#h-artwork-system--đặc-tả-9-tác-phẩm-đồ-họa-chủ-chốt)
9. [I. Character Consistency Rules — Bộ quy tắc nhất quán linh vật](#i-character-consistency-rules--bộ-quy-tắc-nhất-quán-linh-vật)
10. [J. Image-Generation Master Prompt — Bộ cấu trúc Prompt sinh ảnh](#j-image-generation-master-prompt--bộ-cấu-trúc-prompt-sinh-ảnh)
11. [K. Negative Prompt — Bộ từ khóa loại trừ nghiêm ngặt](#k-negative-prompt--bộ-từ-khóa-loại-trừ-nghiêm-ngặt)
12. [L. 1920×1080 Composition Rules — Bố cục & Vùng an toàn 16:9](#l-19201080-composition-rules--bố-cục--vùng-an-toàn-169)
13. [M. Puzzle Visual States — Ngôn ngữ 6 trạng thái ma trận đố](#m-puzzle-visual-states--ngôn-ngữ-6-trạng-thái-ma-trận-đố)
14. [N. Question / Answer Visual States — Ngôn ngữ trạng thái câu hỏi](#n-question--answer-visual-states--ngôn-ngữ-trạng-thái-câu-hỏi)
15. [O. Motion Language — Ngôn ngữ chuyển động sân khấu điện ảnh](#o-motion-language--ngôn-ngữ-chuyển-động-sân-khấu-điện-ảnh)
16. [P. Eight Visual Keyframes — Phân tích 8 khung hình chủ chốt](#p-eight-visual-keyframes--phân-tích-8-khung-hình-chủ-chốt)
17. [Q. Asset Naming Convention — Quy chuẩn đặt tên tệp đồ họa](#q-asset-naming-convention--quy-chuẩn-đặt-tên-tệp-đồ-họa)
18. [R. Phase 3 Generation Order — Thứ tự sản xuất đồ họa](#r-phase-3-generation-order--thứ-tự-sản-xuất-đồ-họa)
19. [V2 ART DIRECTION GATE — Tiêu chí nghiệm thu trước khi triển khai](#v2-art-direction-gate--tiêu-chí-nghiệm-thu-trước-khi-triển-khai)

---

## A. MASTER VISUAL DIRECTION — HỆ PHÂN CẤP THỊ GIÁC CHỦ ĐẠO

Để tránh biến giao diện thành một bảng điều khiển cyber lộn xộn hoặc một slide PowerPoint đơn điệu, toàn bộ thiết kế V2 tuân theo cấu trúc phân cấp thị giác 3 tầng chặt chẽ:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. MASTER STYLE: CINEMATIC SCHOOL STAGE (Phong cách chủ đạo - 60%)          │
│ • Không gian sân khấu hội trường hoàng gia hiện đại, nền xanh đêm sâu thẳm  │
│ • Chùm đèn Spotlight Sapphire & Vàng kim, luồng sáng God-rays điện ảnh      │
│ • Bố cục khoáng đạt, sang trọng, mang tầm vóc sự kiện trang nghiêm 7B       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. BRAND IDENTITY: 7B HERO UNIVERSE / NOVA-7B (Bản sắc nhận diện - 25%)    │
│ • Linh vật biểu trưng "Nova-7B" — Chú robot học sinh thông minh             │
│ • Biểu tượng 7B đúc vàng 3D, dải năng lượng cung vòm vươn lên               │
│ • Họa tiết chòm sao tri thức, ngôn ngữ cảm xúc ấm áp, truyền cảm hứng       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. INTERACTION ACCENT: FUTURE GAME SHOW (Điểm nhấn tương tác - 15%)         │
│ • Chỉ áp dụng cho: Ma trận ô đố, hiệu ứng mở khóa, trả lời đúng, ô may mắn  │
│ • Viền phát quang Luminous HUD, hiệu ứng tinh thể năng lượng phát sáng      │
│ • Pháo hoa Confetti 3D, sóng âm nhạc và xung kích phản hồi bấm nút          │
└─────────────────────────────────────────────────────────────────────────────┘
```

> **Tuyên ngôn thẩm mỹ:** *"Một sân khấu đại hội trang trọng, điện ảnh được dẫn dắt bởi bản sắc Chi đội 7B và được kích hoạt bởi năng lượng tương tác của một Game Show tri thức đỉnh cao."*

---

## B. COLOR SYSTEM — HỆ THỐNG MÀU SẮC SÂN KHẤU TINH CHỈNH

Hệ màu V2 được nâng cấp từ bảng màu V1 nhằm tăng cường độ tương phản trên máy chiếu và màn hình LED lớn:

```
[ BẢNG MÀU SÂN KHẤU V2 (STAGE PALETTE TOKENS) ]

--c-stage-void     #030712  (Đen thẳm chiều sâu vô cực, chống rửa màu máy chiếu)
--c-stage-950      #071126  (Nền xanh đêm sân khấu chính)
--c-stage-900      #0D1D45  (Nền gradient tầng 2)
--c-stage-800      #152B68  (Bề mặt Card thủy tinh hun khói)
--c-stage-700      #1E3D8F  (Đường viền phụ / Hover base)

--c-gold-core      #FFC425  (Vàng kim trung tâm - chữ số, điểm sáng chính)
--c-gold-glow      #FFDD66  (Hào quang vàng ấm)
--c-gold-rich      #E09600  (Vàng kim loại đúc sâu)
--c-gold-dark      #8A5900  (Đổ bóng chữ mạ vàng)

--c-spot-sapphire  #1A65FF  (Xanh Sapphire đèn sân khấu)
--c-spot-beam      #5796FF  (Tia sáng xanh rọi từ trần)
--c-spot-cyan      #00E5FF  (Điểm nhấn công nghệ viền ô tương tác)

--c-ink-pure       #FFFFFF  (Chữ tiêu đề chính, siêu sắc nét)
--c-ink-bright     #E6EEFF  (Nội dung câu hỏi, độ tương phản > 12:1)
--c-ink-muted      #9BB1D6  (Chữ phụ chú, nhãn phân loại)

--c-state-success  #10B981  (Xanh lục bảo ngọc — Đáp án chính xác)
--c-state-warn     #F59E0B  (Vàng cam — Cảnh báo / Nhắc nhở)
--c-state-danger   #EF4444  (Đỏ hồng ngọc — Chưa chính xác / Lỗi)
```

---

## C. LIGHTING SYSTEM — HỆ THỐNG ÁNH SÁNG ĐIỆN ẢNH

Ánh sáng là yếu tố cốt lõi biến màn hình phẳng thành không gian 3 chiều:

1. **Top Dual Spotlights (Chùm đèn rọi đôi):** Hai chùm sáng Sapphire rọi chéo từ góc trên trái và phải màn hình, giao nhau tại 1/3 phía trên (nơi đặt Tiêu đề hoặc Linh vật).
2. **Volumetric God-Rays (Luồng sáng thể tích):** Các dải sáng mờ quét chậm qua hậu cảnh, tạo cảm giác không gian hội trường có chiều sâu vô tận.
3. **Rim Lighting (Viền sáng phản chiếu):** Mọi vật thể 3D, Card, Linh vật và Nút bấm đều có viền sáng mỏng 1.5px (màu vàng kim hoặc xanh cyan) để tách biệt hoàn toàn khỏi phông nền tối.
4. **Interactive Emissive Glow (Hào quang tự phát sáng):** Khi một ô số được kích hoạt hoặc đáp án được mở, vật thể sẽ tự phát quang từ bên trong (Bloom Effect).

---

## D. MATERIAL SYSTEM — HỆ THỐNG CHẤT LIỆU BỀ MẶT

Tránh tuyệt đối cảm giác "nhựa rẻ tiền" hoặc "thẻ giấy A4":

* **Brushed Royal Metal (Kim loại chải xước mạ vàng):** Sử dụng cho Huy hiệu 7B, số thứ tự ô, khung viền vinh danh.
* **Smoked Glass HUD (Thủy tinh hun khói tối màu):** `background: rgba(13, 29, 69, 0.75); backdrop-filter: blur(20px);` với viền gradient 1px — Sử dụng cho Card câu hỏi và Bảng điều khiển MC.
* **Polished Ceramic Enamel (Men sứ trắng bóng cao cấp):** Chất liệu thân vỏ của Linh vật Nova-7B, phản chiếu ánh sáng đèn sân khấu mềm mại.
* **Crystal Energy Core (Khối tinh thể phát quang):** Chất liệu của các ô đố Ma trận tri thức.

---

## E. TYPOGRAPHY DIRECTION — ĐỊNH HƯỚNG PHÔNG CHỮ SÂN KHẤU

* **Display / Headings:** `Paytone One` — Phông chữ dày, vững chãi, tạo cảm giác uy quyền và hào hứng của một sự kiện lớn. Sử dụng hiệu ứng mạ vàng đúc khối CSS drop-shadow.
* **Body / Question Text:** `Bricolage Grotesque` (Weight 600–800) — Phông chữ hình học hiện đại, góc cạnh sắc sảo, tối ưu tuyệt đối cho việc đọc nhanh từ khoảng cách xa (3m – 15m).
* **Tỷ lệ hiển thị tối thiểu:**
  * *Tên Đại hội / Tên Scene:* `64px – 120px`
  * *Câu hỏi chính:* `44px – 54px` (Line-height 1.3)
  * *Nhãn phân loại & Nút bấm:* `26px – 32px`
  * *Tuyệt đối không sử dụng cỡ chữ dưới 24px trên toàn bộ hệ thống.*

---

## F. NOVA-7B IDENTITY — ĐẶC TẢ LINH VẬT TRÌNH DIỄN ĐỘC QUYỀN

> ⚠️ **LƯU Ý PHÁP LÝ & TỔ CHỨC:** 
> Nova-7B là **Linh vật nhân vật ảo của chương trình trình chiếu tương tác**, **KHÔNG PHẢI** là logo chính thức của nhà trường hay huy hiệu Đội Thiếu niên Tiền phong. Không vẽ sai lệch hoặc thay thế các biểu trưng chính thống của Đội.

```
                  ┌─────────────────────────────────────────┐
                  │    THÔNG SỐ ĐẶC TẢ LINH VẬT NOVA-7B     │
                  └─────────────────────────────────────────┘

[HÌNH DÁNG & TỶ LỆ]    Thân hình Chibi 3D Stylized (Tỷ lệ đầu/thân 1 : 2.5)
                       Bo tròn thân thiện, năng động, phong cách hoạt hình Pixar
     │
[CHẤT LIỆU THÂN VỎ]   Vỏ men sứ trắng tuyết ngọc trai phối chi tiết kim loại vàng
                       Mặt kính đen bóng tích hợp màn hình biểu cảm LED Cyan/Amber
     │
[CHI TIẾT NHẬN DIỆN]   Tai nghe headphone phát sóng ăng-ten ngôi sao nhỏ
                       Khăn quàng công nghệ phát sáng cam-đỏ viền cổ cách điệu
                       Huy hiệu số "7B" đúc nổi sắc nét trước ngực áo
     │
[BIỂU CẢM GIAO TIẾP]   Mắt LED thay đổi linh hoạt:
                       - Vui mừng: ^^ (Mắt cười cong trăng khuyết)
                       - Suy nghĩ: ? (Mắt chớp nghiêng đầu)
                       - Cổ vũ: ★ ★ (Mắt ngôi sao phát sáng)
```

---

## G. 7B VISUAL MOTIF — MÔ-TÍP NHẬN DIỆN XUYÊN SUỐT

**Mô-típ chủ đạo:** **"CUNG VÒM SAO VƯƠNG TRI THỨC" (The Rising 7B Star Arc)**

* **Hình thái:** Một dải sáng vòng cung vàng óng nâng đỡ chòm sao 7 đỉnh, uốn lượn từ góc dưới bên trái vươn cao lên góc trên bên phải.
* **Ý nghĩa biểu trưng:**
  * *Vươn lên:* Khát vọng chinh phục năm học mới 2026–2027.
  * *Đoàn kết:* Dải cung kết nối 5 phương hướng hoạt động của Chi đội.
  * *Định vị 7B:* Xuất hiện chìm ở background mọi cảnh và nổi bật trên các Card chuyển tiếp.

---

## H. ARTWORK SYSTEM — ĐẶC TẢ 9 TÁC PHẨM ĐỒ HỌA CHỦ CHỐT

Tất cả 9 tác phẩm được thiết kế chuẩn mực cho khung hình 16:9, bảo đảm vùng an toàn tuyệt đối cho chữ của giao diện web:

```
┌────┬──────────────────────┬─────────────┬───────────┬──────────────────────────────────────────┐
│ ID │ Tên tác phẩm          │ Tỷ lệ / Vị trí│ Định dạng │ Chủ thể & Bố cục                          │
├────┼──────────────────────┼─────────────┼───────────┼──────────────────────────────────────────┤
│ 01 │ Opening Hero Artwork │ 16:9        │ 3D Render │ Cổng vòm đại hội, Nova-7B chào mừng      │
│ 02 │ Nova-7B Character Set│ 1:1 Pack    │ Alpha PNG │ 6 tư thế cảm xúc chuẩn nhất quán         │
│ 03 │ 5 Directions Suite   │ 16:9 Cards  │ 3D/Vector │ 5 biểu tượng chủ đề tôn chỉ hành động    │
│ 04 │ 7B AI Nexus Visual   │ 16:9        │ 3D Render │ Nova-7B kết nối đa thế hệ người dùng     │
│ 05 │ Puzzle Matrix / Lucky│ 16:9 Canvas │ 3D Glass  │ Ma trận tinh thể tri thức & Rương vàng   │
│ 06 │ Music Wave Arena     │ 16:9        │ 3D Motion │ Quả cầu sóng âm pha lê phát sáng vàng    │
│ 07 │ Rebus Art Pack (Ô 7) │ 3-Slot Grid │ Dig-Paint │ Bộ 3 tranh giải đố rebus "Ảo Giác"       │
│ 08 │ Triangle Vector (Ô 9)│ 1:1 Vector  │ Clean SVG │ Bản vẽ 25 tam giác Neon Blueprint sắc nét│
│ 09 │ Closing Victory Hero │ 16:9        │ 3D Render │ Đại hội thắng lợi, pháo hoa & cờ hoa     │
└────┴──────────────────────┴─────────────┴───────────┴──────────────────────────────────────────┘
```

### Đặc tả kỹ thuật chi tiết từng Artwork:

#### 1. Artwork 01 — Opening Hero Artwork (`hero-opening.webp`)
* **Tỷ lệ & Kích thước:** `16:9` (1920×1080 px).
* **Bố cục & Góc máy:** Góc rộng ngang tầm mắt nhìn vào sân khấu đại hội; Trung tâm là Cổng vòm ánh sáng mạ vàng; Linh vật Nova-7B đứng bên phải góc 3/4 vẫy tay chào mừng nồng nhiệt; Bên trái là không gian an toàn để hiển thị chữ "ĐẠI HỘI CHI ĐỘI LỚP 7B" bằng HTML.
* **Vùng an toàn (Safe Area):** Dành trọn vẹn 55% diện tích bên trái cho Text Title. Chủ thể Nova-7B nằm trọn trong 45% bên phải.
* **Ánh sáng & Màu sắc:** Đèn chiếu vàng hoàng kim kết hợp chùm sáng xanh Sapphire, bụi sáng vàng bay lơ lửng.

#### 2. Artwork 02 — Nova-7B Character Pack (`nova-7b-poses.webp` / Alpha PNGs)
* **Tỷ lệ & Kích thước:** Bộ 6 ảnh độc lập `1024×1024 px` (Nền trong suốt Alpha).
* **Danh mục tư thế:**
  1. `nova-wave`: Vẫy tay chào đón (Opening / Chào mừng).
  2. `nova-point`: Giơ tay chỉ về phía trước/hướng nội dung (Directions / Giới thiệu).
  3. `nova-think`: Tay chống cằm suy ngẫm, mắt dấu chấm hỏi (Câu hỏi đố).
  4. `nova-cheer`: Nhảy lên hai tay giơ cao ăn mừng, mắt ngôi sao (Đáp án đúng).
  5. `nova-listen`: Đeo tai nghe headphone phát sóng, nhắm mắt phiêu theo nhạc (Ô 6 Âm nhạc).
  6. `nova-gift`: Hai tay ôm rương báu vàng phát sáng lấp lánh (Ô 8 May mắn).

#### 3. Artwork 03 — Directions Visual Suite (`dir-suite-01..05.webp`)
* **Tỷ lệ:** `16:9` hoặc `4:3` lồng trong Card Carousel.
* **Chủ đề minh họa (Dựa trên 5 nội dung gốc):**
  1. *Học tập & AI:* Nova-7B bên bàn học tương lai với quả cầu dữ liệu hologram.
  2. *Tiếng Anh:* Quả địa cầu kết nối cầu vồng chữ cái ABC và các kỳ quan thế giới.
  3. *Đoàn kết kỷ luật:* Đội hình búp măng vươn cao dưới ánh sáng bình minh.
  4. *Sống xanh:* Chú robot tưới mầm cây năng lượng xanh sinh thái.
  5. *Yêu thương trung thực:* Trái tim pha lê đa sắc tỏa ánh hào quang ấm áp.

#### 4. Artwork 04 — 7B AI Companion Visual (`fig-ai-nexus.webp`)
* **Mục đích:** Minh họa câu hỏi Ô 4 (*"AI được sử dụng bởi những độ tuổi nào?"*).
* **Bố cục:** Nova-7B đứng tại tâm điểm một mạng lưới quang học hình cầu, xung quanh là các biểu tượng minh họa: Em nhỏ học vẽ, bạn học sinh làm toán, cô giáo giảng bài, người cao tuổi đọc sách.
* **Tone màu:** Xanh Cyber kết hợp vàng Amber ấm áp, thể hiện sự nhân văn và gần gũi của công nghệ.

#### 5. Artwork 05 — Puzzle Matrix & Lucky Box (`matrix-lucky-box.webp`)
* **Mục đích:** Visual nền cho sảnh Puzzle Lobby và texture đặc biệt cho Ô 8 (May mắn).
* **Chi tiết:** Chiếc rương báu công nghệ 3D viền vàng hoàng gia, nắp hé mở tỏa ra các chùm sáng vàng chói lọi và các ngôi sao năng lượng.

#### 6. Artwork 06 — Music Challenge Visual (`fig-music-wave.webp`)
* **Mục đích:** Visual trung tâm cho Ô 6 (Nghe nhạc đoán tên).
* **Bố cục:** Quả cầu âm thanh pha lê đa giác đang phát sáng, bao quanh bởi dải sóng âm thanh 3D uốn lượn nhịp nhàng màu vàng gold và xanh neon.

#### 7. Artwork 07 — Rebus Art Pack ("Ảo Giác" — Ô 7) (`rebus-slot-1..3.webp`)
* **Mục đích:** Thay thế hoàn toàn các ô placeholder thô sơ.
* **Bộ 3 tranh giải đố tinh xảo:**
  * *Khung 1:* Tranh vẽ cảnh "ẢO" — Cảnh sa mạc có ảo ảnh ốc đảo lung linh (Ảo).
  * *Ký hiệu giữa:* Dấu cộng `(+)` kim loại nổi phát sáng 3D.
  * *Khung 2:* Tranh vẽ biểu tượng "GIÁC" — Bàn tay chạm nhẹ phát ra sóng cảm giác / Tam giác giác quan (Giác).
  * *Khung 3 (Khi giải xong):* Ghép thành bức tranh toàn cảnh "ẢO GIÁC" kỳ ảo.

#### 8. Artwork 08 — Triangle Geometry Puzzle Hero (`fig-tam-giac-v2.svg`)
* **Mục đích:** Bản vẽ hình học chuẩn mực cho Ô 9 (Đếm hình tam giác).
* **Quy chuẩn đồ họa:** Clean Vector SVG, đường nét màu vàng kim phát sáng `stroke-width: 4px` trên nền lưới blueprint xanh sapphire tối; Từng tam giác có `id` riêng biệt để hỗ trợ MC highlight khi giải thích đáp án (đúng 25 hình).

#### 9. Artwork 09 — Closing Victory Finale (`hero-closing.webp`)
* **Mục đích:** Bế mạc đại hội với cảm xúc chiến thắng vang dội.
* **Bố cục:** Toàn cảnh sân khấu rực rỡ với chùm pháo hoa vàng lộng lẫy trên bầu trời xanh thẳm, cờ hoa tung bay, Nova-7B đứng giữa tươi cười giơ tay chữ V chiến thắng.

---

## I. CHARACTER CONSISTENCY RULES — BỘ QUY TẮC NHẤT QUÁN LINH VẬT

Để đảm bảo mọi hình ảnh sinh ra bởi AI đều là **cùng một nhân vật Nova-7B duy nhất**, tất cả các lệnh prompt phải tuân thủ nghiêm ngặt bảng thuộc tính cố định sau:

```
┌────────────────────────┬────────────────────────────────────────────────────┐
│ THUỘC TÍNH             │ QUY CHUẨN CỐ ĐỊNH DUY NHẤT (LOCK PARAMETERS)       │
├────────────────────────┼────────────────────────────────────────────────────┤
│ Tên định danh          │ Nova-7B Mascot                                     │
│ Tỷ lệ cơ thể           │ Chibi 1:2.5 (Đầu to tròn, thân gọn, chân tay tròn) │
│ Chất liệu đầu & thân   │ Men sứ trắng tuyết bóng (Glossy white ceramic)    │
│ Khuôn mặt              │ Kính đen bóng (Tinted black glass screen visor)    │
│ Mắt hiển thị           │ Đèn LED phát quang màu Xanh Cyan sáng rực         │
│ Khăn quàng cổ          │ Dải ruy-băng công nghệ màu đỏ cam phát sáng nhẹ   │
│ Biểu tượng ngực áo     │ Phù hiệu số "7B" đúc kim loại vàng đồng bóng       │
│ Phụ kiện đầu           │ Headphone tai nghe màu xanh navy + ăng-ten ngôi sao│
│ Ánh sáng chiếu rọi     │ Rim lighting vàng ấm kết hợp key light xanh dịu    │
│ Phong cách đồ họa      │ 3D Stylized Pixar/Overwatch Render, Octane 8K      │
└────────────────────────┴────────────────────────────────────────────────────┘
```

---

## J. IMAGE-GENERATION MASTER PROMPT — BỘ CẤU TRÚC PROMPT SINH ẢNH

Tất cả các prompt tạo ảnh cho dự án Chi đội 7B bắt buộc sử dụng cấu trúc chuẩn mực 3 phần:

```
[MASTER PROMPT CỐ ĐỊNH]
"Cinematic 3D render of Nova-7B, a cute friendly stylized school mascot robot for class 7B, glossy polished white ceramic body with golden metallic trims, dark glossy curved visor screen displaying glowing cyan LED expressive eyes, wearing a stylized glowing red-orange tech neckerchief, metallic gold '7B' emblem embossed on the chest, wearing sleek navy blue headphones with mini star antennas. Volumetric cinematic stage lighting, deep royal navy blue atmosphere, warm golden rim lights, soft floating dust particles, Unreal Engine 5 render, Pixar and Overwatch 3D character art style, ultra-high quality, 8k resolution, clean composition --ar 16:9"

[VARIABLE PROMPT BLOCK (Thay đổi theo từng Scene)]
+ Opening: "standing proudly on a grand modern ceremonial stage entrance, raising one hand in a warm welcoming greeting gesture, dynamic composition on the right side of the frame, open clean space on the left."
+ AI Nexus: "interacting with a glowing holographic sphere displaying friendly icons of students, teachers, and elderly people learning together, futuristic classroom background, inspiring and heartwarming mood."
+ Music Challenge: "wearing large luminous headphones, eyes closed enjoying melody, surrounded by vibrant 3D golden musical wave ribbons and glowing audio rings."
+ Lucky Reward: "holding a luxurious glowing golden treasure chest radiating bright golden light rays and floating magic stars, celebration sparkle atmosphere."
+ Victory Finale: "celebrating triumphantly with both arms raised in victory on a festive stage, golden confetti bursts and magnificent fireworks in deep blue night sky."
```

---

## K. NEGATIVE PROMPT — BỘ TỪ KHÓA LOẠI TRỪ NGHIÊM NGẶT

Áp dụng cho mọi lần tạo ảnh để bảo vệ chất lượng thẩm mỹ:

```
[NEGATIVE PROMPT BẮT BUỘC]
"photorealistic human face, real photograph, stock photo, generic 2D cartoon, flat clipart, anime girl, messy cyberpunk, dystopian sci-fi, grime, rust, dark horror, low resolution, blurry, distorted limbs, extra fingers, malformed face, gibberish text, watermark, signature, website logo, fake Vietnamese text, UI elements, ugly, poor lighting, oversaturated neon clutter, cheap mobile game asset."
```

> **QUY TẮC BẤT DI BẤT DỊCH VỀ CHỮ (TEXT RULE):** Tuyệt đối không để AI vẽ chữ tiếng Việt hoặc tiêu đề quan trọng lên tranh. Toàn bộ chữ hiển thị được lập trình bằng HTML/CSS của ứng dụng web để đảm bảo chuẩn chính tả 100% và sắc nét vô cực.

---

## L. 1920×1080 COMPOSITION RULES — BỐ CỤC & VÙNG AN TOÀN 16:9

Mỗi cảnh được phân bổ vùng an toàn nghiêm ngặt để giao diện web hiển thị hoàn hảo:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1920 px (Chiều rộng Canvas)                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ Safe Margin: 96px                                                       │ │
│ │ ┌───────────────────────────────────┬─────────────────────────────────┐ │ │
│ │ │ VÙNG TRÌNH DIỄN CHỮ & GIAO DIỆN   │ VÙNG CHỦ THỂ ARTWORK & MASCOT   │ │ │
│ │ │ (UI & Text Content Area - 55%)    │ (Hero Focal Subject - 45%)      │ │ │
│ │ │                                   │                                 │ │ │
│ │ │ • Tiêu đề chính / Kicker          │ • Nhân vật Nova-7B              │ │ │
│ │ │ • Nội dung câu hỏi khổ lớn        │ • Cổng vòm ánh sáng / Rương báu │ │ │
│ │ │ • Ô nhập đáp án & Nút bấm         │ • Vật thể 3D điểm nhấn          │ │ │
│ │ │                                   │                                 │ │ │
│ │ └───────────────────────────────────┴─────────────────────────────────┘ │ │
│ │                                                                         │ │
│ │ ── VÙNG ĐIỀU KHIỂN SÂN KHẤU CỦA MC (Bottom Stage Dock: 110px) ───────── │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│ 1080 px (Chiều cao Canvas)                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

* **Quy tắc neo chủ thể:**
  * *Opening:* Chủ thể đứng **Bên Phải** (Right-anchored) để chừa 60% bên trái cho Tiêu đề Đại hội.
  * *Directions:* Chủ thể nằm **Trung Tâm** (Center-focused) trong Card lồng nội dung.
  * *Gameplay (Câu hỏi):* Artwork minh họa đặt ở **Nửa Trên** hoặc **Góc Phải**, câu hỏi dàn trải ở **Trung Tâm Dưới**.
  * *Closing:* Chủ thể đứng **Trung Tâm** (Center Stage) với hào quang tỏa đều hai bên.

---

## M. PUZZLE VISUAL STATES — NGÔN NGỮ 6 TRẠNG THÁI MA TRẬN ĐỐ

Thay thế hoàn toàn cảm giác "bàn phím số" của V1 bằng các khối hộp năng lượng tri thức:

```
┌────────────┬────────────────────────────────────────────────────────────────┐
│ TRẠNG THÁI │ ĐẶC TẢ THỊ GIÁC TRÊN MÀN CHIẾU                                │
├────────────┼────────────────────────────────────────────────────────────────┤
│ 1. SEALED  │ Khối tinh thể xanh Sapphire tối vát cạnh 3D, số mạ vàng mờ,    │
│ (Có sẵn)   │ viền phản chiếu ánh sáng nhẹ, sẵn sàng được chọn.              │
├────────────┼────────────────────────────────────────────────────────────────┤
│ 2. HOVER   │ Vệt sáng quét ngang bề mặt (Light sweep), viền phát quang xanh │
│ (Rê chuột) │ Cyan, khối hộp nâng nhẹ lên 6px kèm bóng đổ vàng ấm.           │
├────────────┼────────────────────────────────────────────────────────────────┤
│ 3. SELECTED│ Đèn Spotlight rọi thẳng, sóng xung kích (Shockwave) lan tỏa    │
│ (Được chọn)│ từ tâm ô, ô số nén lại 94% rồi bùng sáng chuyển scene.         │
├────────────┼────────────────────────────────────────────────────────────────┤
│ 4. OPENED  │ Khối hộp xoay mở 180 độ theo trục 3D, hé lộ câu hỏi bên trong, │
│ (Đang mở)  │ viền chuyển sang màu vàng kim rực rỡ.                          │
├────────────┼────────────────────────────────────────────────────────────────┤
│ 5. DONE    │ Khối hộp chuyển sang ngọc lục bảo trong suốt, xuất hiện dấu    │
│ (Đã xong)  │ tích vàng đúc nổi "✓", giảm độ sáng 40% để nhường sự chú ý.    │
├────────────┼────────────────────────────────────────────────────────────────┤
│ 6. LUCKY   │ Ô số 8 rung rinh nhẹ, phát ánh hào quang vàng kim chói lọi,    │
│ (May mắn)  │ hiệu ứng sao bay xung quanh, nhận diện tức thì từ cự ly 15m.   │
└────────────┴────────────────────────────────────────────────────────────────┘
```

---

## N. QUESTION / ANSWER VISUAL STATES — NGÔN NGỮ TRẠNG THÁI CÂU HỎI

Bốn giai đoạn cảm xúc của một lượt chơi được phân định bằng màu sắc và ánh sáng rõ ràng:

1. **Giai đoạn 1: BÍ ẨN (Mystery State — Chưa mở đáp án):**
   * Card câu hỏi bằng thủy tinh hun khói tối (`#0D1D45`), viền xanh Cyan thanh lịch, chữ câu hỏi màu trắng ngọc trai siêu nét. Tạo sự tập trung tuyệt đối cho cả hội trường suy nghĩ.
2. **Giai đoạn 2: BẬT MỞ (Reveal State — MC bấm Mở đáp án):**
   * Card lật 3D 180 độ mượt mà (`transform-perspective: 1200px`), chuyển từ khung câu hỏi sang khung đáp án phát quang.
3. **Giai đoạn 3: VINH QUANG (Celebration State — Trả lời Đúng):**
   * Viền Card bùng sáng màu xanh ngọc lục bảo (`#10B981`), âm thanh Fanfare ngân vang, pháo hoa Confetti 3D nổ bung rực rỡ từ vị trí Card, Nova-7B nhảy múa chúc mừng.
4. **Giai đoạn 4: PHẦN THƯỞNG (Reward State — Ô May Mắn):**
   * Màn hình chuyển sang tone vàng hoàng kim, rương báu mở nắp bung quà, hiệu ứng chùm sáng vàng quét rực rỡ toàn bộ sân khấu.

---

## O. MOTION LANGUAGE — NGÔN NGỮ CHUYỂN ĐỘNG SÂN KHẤU ĐIỆN ẢNH

Tất cả chuyển động được thiết kế theo phong cách **Điện ảnh — Quyết đoán — Không trễ nhịp**:

* **Quy chuẩn thời lượng (Timing Tokens):**
  * *Tương tác nhanh (Micro-interaction):* `160ms` (`ease: "power2.out"`)
  * *Bùng nổ chọn ô (Tile Shockwave):* `320ms` (`ease: "back.out(1.4)"`)
  * *Lật thẻ 3D câu hỏi (Card Flip):* `480ms` (`ease: "power3.out"`)
  * *Chuyển cảnh toàn màn hình (Scene Transition):* `600ms` (`ease: "power2.inOut"`)
* **Chuyển động Camera & Ánh sáng:**
  * Khi vào một Scene mới: Camera zoom nhẹ từ `scale(0.96)` lên `scale(1.0)` trong `600ms` tạo cảm giác tiến vào lễ đài.
  * Hạt bụi vàng hậu cảnh trôi lơ lửng rất chậm (`12s` một chu kỳ) tạo sức sống không gian.
* **Chế độ hỗ trợ tiếp cận (Reduced-Motion):**
  * Khi hệ thống phát hiện `prefers-reduced-motion: reduce`, toàn bộ xoay 3D và zoom sâu lập tức chuyển thành hiệu ứng mờ dần tinh tế (Fade-in `200ms`), đảm bảo an toàn tuyệt đối cho người xem.

---

## P. EIGHT VISUAL KEYFRAMES — PHÂN TÍCH 8 KHUNG HÌNH CHỦ CHỐT

```
┌────┬─────────────────┬────────────────────────────┬────────────────────────────┬─────────────────────────────┐
│ KF │ Màn hình / Cảnh │ 1. Mắt thấy ĐẦU TIÊN (0.2s)│ 2. Mắt thấy TIẾP THEO(0.8s)│ 3. TƯƠNG TÁC BIẾN ĐỔI       │
├────┼─────────────────┼────────────────────────────┼────────────────────────────┼─────────────────────────────┤
│ 01 │ Opening Screen  │ Chữ "ĐẠI HỘI CHI ĐỘI 7B"   │ Linh vật Nova-7B chào đón, │ Bấm Bắt đầu: Logo bùng sáng,│
│    │                 │ mạ vàng khổng lồ tỏa sáng  │ chùm đèn Spotlight rọi sâu │ cảnh mở portal sang Scene 2.│
├────┼─────────────────┼────────────────────────────┼────────────────────────────┼─────────────────────────────┤
│ 02 │ Directions      │ Số thứ tự lớn và Card      │ Tranh minh họa 3D chủ đề,  │ Bấm mũi tên: Card trượt 3D, │
│    │ Screen          │ thủy tinh phương hướng     │ dải sao 7B uốn lượn        │ số nhảy mượt mà kèm âm click│
├────┼─────────────────┼────────────────────────────┼────────────────────────────┼─────────────────────────────┤
│ 03 │ Puzzle Lobby    │ Ma trận 9 khối hộp tinh thể│ 3 viên thuốc quy luật vàng,│ Rê chuột: Ô phát quang;     │
│    │                 │ 3×3 huyền bí ở trung tâm   │ thanh tiến độ đếm ô đã mở  │ Bấm ô: Xung kích nổ chuyển  │
├────┼─────────────────┼────────────────────────────┼────────────────────────────┼─────────────────────────────┤
│ 04 │ Question Card   │ Nhãn phân loại & số ô đố   │ Nội dung câu hỏi trắng sáng│ Gõ đáp án: Chữ hiển thị to; │
│    │ (Mystery)       │ phát quang viền xanh       │ kèm hình minh họa/sóng âm  │ Nhấn Enter: Form rung/chấm  │
├────┼─────────────────┼────────────────────────────┼────────────────────────────┼─────────────────────────────┤
│ 05 │ Answer Reveal   │ Thẻ lật 3D 180 độ sang     │ Dòng đáp án chính xác màu  │ Nút "Về board" nổi bật sáng │
│    │                 │ khung kết quả vinh danh    │ vàng kim đúc khối rõ nét   │ để MC chuyển nhịp tiếp tục  │
├────┼─────────────────┼────────────────────────────┼────────────────────────────┼─────────────────────────────┤
│ 06 │ Correct Win     │ Tia chớp viền xanh lục bảo │ Pháo hoa Confetti 3D nổ    │ Nova-7B nhảy múa ăn mừng,   │
│    │                 │ bừng sáng toàn màn hình    │ bung tỏa, âm Fanfare vang  │ ô trên thanh tiến độ sáng   │
├────┼─────────────────┼────────────────────────────┼────────────────────────────┼─────────────────────────────┤
│ 07 │ Lucky Tile (Ô 8)│ Rương vàng bung nắp tỏa    │ Dòng chữ chúc mừng nhận quà│ Hạt sao vàng bay ngập màn,  │
│    │                 │ hào quang vàng chói lọi    │ nổi bật ở trung tâm        │ tự động ghi nhận hoàn thành │
├────┼─────────────────┼────────────────────────────┼────────────────────────────┼─────────────────────────────┤
│ 08 │ Closing Finale  │ Dòng chữ "ĐẠI HỘI THÀNH    │ Bầu trời pháo hoa rực rỡ,  │ Hai nút "Chơi lại" &        │
│    │                 │ CÔNG RỰC RỠ!" mạ vàng khối │ Nova-7B giơ cờ hoa vinh dự │ "Về đầu" sẵn sàng điều khiển│
└────┴─────────────────┴────────────────────────────┴────────────────────────────┴─────────────────────────────┘
```

---

## Q. ASSET NAMING CONVENTION — QUY CHUẨN ĐẶT TÊN TỆP ĐỒ HỌA

Tất cả tài nguyên đồ họa mới khi sản xuất ở Phase 3 bắt buộc tuân theo quy tắc đặt tên chuẩn mực, lưu trữ tại `src/assets/v2/` và `public/images/v2/`:

```
src/assets/v2/
├── heroes/
│   ├── hero-opening.webp            # Artwork mở màn 16:9
│   └── hero-closing.webp            # Artwork bế mạc vinh quang 16:9
├── mascot/
│   ├── nova-wave.webp               # Nova-7B vẫy tay chào (Alpha PNG/WebP)
│   ├── nova-point.webp              # Nova-7B chỉ tay giới thiệu
│   ├── nova-think.webp              # Nova-7B suy nghĩ câu đố
│   ├── nova-cheer.webp              # Nova-7B ăn mừng chiến thắng
│   ├── nova-listen.webp             # Nova-7B nghe nhạc Ô 6
│   └── nova-gift.webp               # Nova-7B ôm rương quà may mắn Ô 8
├── directions/
│   ├── dir-01-hoc-tap.webp          # Phương hướng 1: Học tập & AI
│   ├── dir-02-tieng-anh.webp        # Phương hướng 2: Tiếng Anh
│   ├── dir-03-doan-ket.webp         # Phương hướng 3: Đoàn kết kỷ luật
│   ├── dir-04-song-xanh.webp        # Phương hướng 4: Sống xanh
│   └── dir-05-yeu-thuong.webp       # Phương hướng 5: Yêu thương trung thực
├── gameplay/
│   ├── fig-ai-nexus.webp            # Minh họa AI Ô 4
│   ├── fig-music-orb.webp           # Quả cầu sóng âm Ô 6
│   ├── rebus-01-ao.webp             # Rebus Khung 1: Ảo (Ô 7)
│   ├── rebus-02-giac.webp           # Rebus Khung 2: Giác (Ô 7)
│   ├── rebus-03-full.webp           # Rebus Khung 3: Toàn cảnh (Ô 7)
│   ├── fig-tam-giac-v2.svg          # Bản vẽ Vector 25 tam giác Ô 9
│   └── lucky-chest-gold.webp        # Rương báu may mắn Ô 8
└── motifs/
    ├── 7b-emblem-gold-3d.webp       # Biểu trưng 7B đúc vàng 3D
    ├── star-arc-trail.svg           # Dải cung vòm sao vươn lên
    └── pattern-constellation.svg    # Họa tiết chòm sao chìm hậu cảnh
```

---

## R. PHASE 3 GENERATION ORDER — THỨ TỰ SẢN XUẤT ĐỒ HỌA

Để đảm bảo tính nhất quán tuyệt đối giữa nhân vật và không gian, Phase 3 phải tạo tài sản theo đúng thứ tự nghiêm ngặt sau:

```
[THỨ TỰ SẢN XUẤT BẮT BUỘC]

Bước 1: SẢN XUẤT NOVA-7B CHARACTER SHEET (Bộ ảnh gốc & 6 tư thế)
        ↳ Khóa diện mạo, chất liệu men sứ, khăn quàng và huy hiệu 7B làm chuẩn đối chiếu.
   │
Bước 2: SẢN XUẤT OPENING HERO ARTWORK
        ↳ Tích hợp Nova-7B vào cổng vòm sân khấu đại hội 16:9.
   │
Bước 3: SẢN XUẤT BỘ GAMEPLAY ARTWORK THEO THỨ TỰ:
        3.1. 7B AI Nexus Visual (Ô 4)
        3.2. Music Wave Arena Visual (Ô 6)
        3.3. Rebus Art Pack 3 khung "Ảo Giác" (Ô 7)
        3.4. Lucky Chest Hoàng Kim (Ô 8)
        3.5. Clean SVG 25 Tam Giác Blueprint (Ô 9)
   │
Bước 4: SẢN XUẤT BỘ 5 TRANH PHƯƠNG HƯỚNG HOẠT ĐỘNG (Directions Suite)
   │
Bước 5: SẢN XUẤT CLOSING FINALE HERO ARTWORK
        ↳ Màn ăn mừng chiến thắng tổng kết đại hội.
```

---

# V2 ART DIRECTION GATE

> 🛑 **ĐIỀU KIỆN TIÊN QUYẾT BẢO VỆ MÃ NGUỒN:**
> 
> Toàn bộ mã nguồn ứng dụng Svelte và Engine hiện tại **VẪN ĐƯỢC GIỮ NGUYÊN 100%**.
> Quá trình chuyển sang **Phase 3 (Tạo tác Asset Đồ Họa & Tái cấu trúc Giao diện)** chỉ được phép bắt đầu khi bạn đã xem xét và đồng thuận với các mục nghiệm thu dưới đây:

1. [ ] **Phê duyệt Hệ phân cấp Master Style:** Đồng ý công thức *60% Sân khấu Điện ảnh + 25% Bản sắc Linh vật Nova-7B + 15% Điểm nhấn Game Show*.
2. [ ] **Phê duyệt Thiết kế Linh vật Nova-7B:** Đồng ý tạo hình chú robot học sinh men sứ trắng, mắt LED Cyan, khăn quàng công nghệ và biểu trưng 7B trước ngực.
3. [ ] **Phê duyệt Mô-típ "Cung vòm sao vươn tri thức 7B".**
4. [ ] **Phê duyệt Bảng màu, Ánh sáng và Chất liệu V2** (Không dùng thẻ giấy trắng, dùng Thủy tinh hun khói và Kim loại mạ vàng).
5. [ ] **Phê duyệt Bộ Master Prompt & Negative Prompt** sinh ảnh AI.
6. [ ] **Phê duyệt 8 Phân tích Khung hình (Visual Keyframes) và Thứ tự sản xuất đồ họa.**

---
*Tài liệu được lập bởi Antigravity Art Direction Team — Hoàn tất Giai đoạn Phase 2.*

# BẢNG KIỂM KÊ TÀI NGUYÊN ĐỒ HỌA V2 (V2 ASSET MANIFEST)
## ĐẠI HỘI CHI ĐỘI LỚP 7B — TRƯỜNG THCS NGUYỄN DU
### Năm học 2026 – 2027 | Bộ Asset Thư viện Thị giác V2 (Production Ready)

---

> **MỤC ĐÍCH TÀI LIỆU:** Ghi nhận toàn bộ thông số kỹ thuật, đường dẫn tệp, kích thước, vùng an toàn và trạng thái kiểm duyệt của tất cả tài nguyên đồ họa V2 đã được tạo tác trong Phase 3, chuẩn bị sẵn sàng cho Phase 4 tích hợp giao diện.

---

## 1. TỔNG QUAN DANH MỤC ASSET ĐÃ SẢN XUẤT

```
src/assets/v2/
├── heroes/
│   └── hero-opening-16x9.jpg        (1920×1080 | Opening Stage Hero + Nova-7B)
├── mascot/
│   └── nova-7b-character-sheet.jpg  (1920×1080 | Multi-angle & Expressive Model Sheet)
└── gameplay/
    ├── scene-ai-companion.jpg       (1920×1080 | Ô 4 AI Nexus Learning Stage)
    ├── scene-music-challenge.jpg    (1920×1080 | Ô 6 Music Arena & Wave Ribbons)
    ├── scene-rebus-puzzle.jpg       (1920×1080 | Ô 7 Rebus Challenge "Ảo Giác")
    ├── puzzle-lucky-chest.jpg       (1920×1080 | Ô 8 Lucky Golden Treasure Chest)
    └── fig-tam-giac-v2.svg          (Vector SVG | Ô 9 Geometry 25 Triangles Neon Blueprint)
```

---

## 2. BẢNG ĐẶC TẢ CHI TIẾT TỪNG ASSET (DETAILED ASSET SPECIFICATIONS)

| Tên tệp (Filename) | Mục đích sử dụng | Kích thước / Tỷ lệ | Vùng chủ thể (Focal Area) | Vùng an toàn chữ (UI Safe Zone) | Định dạng | Trạng thái (Status) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`nova-7b-character-sheet.jpg`** | Master Model Sheet khóa tạo hình & biểu cảm Nova-7B | `1920×1080` (16:9) | Toàn khung hình (7 góc nhìn & biểu cảm) | N/A (Model Sheet chuẩn) | JPG / 3D Render | **APPROVED** (v2.0) |
| **`hero-opening-16x9.jpg`** | Background chính của Scene 01 (Opening) | `1920×1080` (16:9) | 45% Bên phải (Nova-7B & Vòm cổng sân khấu) | **55% Bên trái** (Dành riêng cho Title ĐẠI HỘI CHI ĐỘI 7B) | JPG / 3D Render | **APPROVED** (v2.0) |
| **`scene-ai-companion.jpg`** | Minh họa câu hỏi Ô 4 (*AI dùng cho độ tuổi nào?*) | `1920×1080` (16:9) | Trung tâm (Nova-7B & Quả cầu tri thức) | **Top & Bottom Margin 140px** cho câu hỏi & nút bấm | JPG / 3D Render | **APPROVED** (v2.0) |
| **`scene-music-challenge.jpg`** | Minh họa câu hỏi Ô 6 (*Nghe nhạc đoán tên*) | `1920×1080` (16:9) | Trung tâm (Nova-7B đeo tai nghe & dải sóng âm 3D) | **Top & Bottom Margin 140px** cho nút Play & Input | JPG / 3D Render | **APPROVED** (v2.0) |
| **`scene-rebus-puzzle.jpg`** | Minh họa câu hỏi Ô 7 (*Nhìn hình đoán từ: Ảo giác*) | `1920×1080` (16:9) | 3 Khung tranh ngang (Ảo ảnh + Dấu cộng + Lăng kính) | **Top & Bottom Margin 160px** cho hướng dẫn & ô trả lời | JPG / 3D Render | **APPROVED** (v2.0) |
| **`puzzle-lucky-chest.jpg`** | Visual vinh danh Ô 8 (*Ô số may mắn nhận quà*) | `1920×1080` (16:9) | Trung tâm (Rương báu hoàng kim mở nắp tỏa hào quang) | **Top & Bottom Margin 180px** cho thông báo nhận thưởng | JPG / 3D Render | **APPROVED** (v2.0) |
| **`fig-tam-giac-v2.svg`** | Minh họa câu hỏi Ô 9 (*Đếm 25 hình tam giác*) | Vector `800×600` (Co giãn vô cực) | Trung tâm khung vẽ Blueprint phát quang | **Cố định trong Box 700×500px** tương phản cao | Clean SVG | **APPROVED** (v2.0) |

---

## 3. KIỂM TOÁN AN TOÀN NỘI DUNG (CONTENT & IDENTITY QA AUDIT)

* ✅ **Không rò rỉ hình ảnh 7E:** 100% hình ảnh được tạo mới hoàn toàn với linh vật Nova-7B và nhận diện 7B độc quyền.
* ✅ **Không nhúng chữ chết (No Baked-in Text):** Không có tiêu đề hay đáp án tiếng Việt nào bị ép chết vào ảnh raster; toàn bộ văn bản chính thức được quản lý bởi `src/lib/data.ts` và render qua HTML/CSS.
* ✅ **Không bịa đặt thông tin chính thức:** Không có con dấu trường học tự chế hay số liệu giả tạo nào xuất hiện trong các tác phẩm.
* ✅ **Độ tương phản sân khấu 1080p:** Đã kiểm tra độ sắc nét và tương phản trên nền xanh đêm sâu (`#071126`), viền sáng vàng ấm và đèn rọi Sapphire nổi bật từ khoảng cách 15m.

---
*Tài liệu được lập bởi Antigravity Asset Production Team — Sẵn sàng cho Phase 4.*

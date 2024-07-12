# online learning (ReactJS, React Router)

# Table of Contents
- [LÝ DO CHỌN ĐỀ TÀI](#0)
- [HƯỚNG DẪN CHẠY ĐỒ ÁN](#1)
- [DATABASE](#database)
- [TÍNH NĂNG WEBAPP](#2)
- [CÔNG NGHỆ SỬ DỤNG](#3)
- [GIAO DIỆN](#4)
- [FILE BÁO CÁO](#5)

## LÝ DO CHỌN ĐỀ TÀI <a name="0"></a>
**Cơ chế học tập flashcard**

<img src="image-readme/flashcard.webp"/>

**Khái niệm flashcard:**

Mỗi flashcard thường có một câu hỏi hoặc một từ ở một mặt và câu trả lời hoặc định nghĩa ở mặt kia.

**Cách sử dụng:**
- Nhìn Mặt Trước: Đọc câu hỏi hoặc từ ở mặt trước của flashcard.
- Trả Lời: Tự trả lời câu hỏi hoặc định nghĩa từ.
- Kiểm Tra Mặt Sau: Xem câu trả lời hoặc định nghĩa ở mặt sau của flashcard.

**Định hướng**
- Tạo sự tương tác, kết nối cộng động học tập với bộ thẻ cá nhân, sao chép bộ thẻ, cùng nhau xây dựng bộ thẻ (học phần)
- Cá nhân hóa quát trình học tập
- Linh hoạt thời gian và địa điểm
## HƯỚNG DẪN CHẠY ĐỒ ÁN <a name="1"></a>
**RESTful API online learning**
- Webapp nhận json từ REST API **online learning backend**: **https://github.com/hdnguyen02/tttn-online-learning-spring**


**Clone đồ án**
- Điều hướng cmd hoặc terminal đến folder đã clone đồ án sau đó chạy lệnh để cài đặt dependencies: **npm install**
- Điều hướng cmd hoặc terminal đến folder đã clone đồ án sau đó chạy lệnh để run đồ án: **npm run dev**

## DATABASE <a name="database"></a>

**ERD**

<img src="image-readme/ERD.png"/>
<p style="text-align: center">Sơ đồ quan hệ thực thể</p>

**Mô hình dữ liệu**

<img src="image-readme/mô hình dữ liệu.png"/>

## TÍNH NĂNG WEBAPP <a name="2"></a>
**Học sinh**
- Đăng nhập/đăng ký
- Quên mật khẩu
- CRUD bộ thẻ, thẻ
- Tìm kiếm, lọc bộ thẻ, thẻ
- Sao chép bộ thẻ từ người dùng khác
- Học thẻ
- Xây dựng học phần (bộ thẻ của lớp) trong lớp học
- Nộp bài tập trong lớp học
- Thảo luận trong lớp học
- Hiệu chỉnh thông tin cá nhân

**Giáo viên (kế thừa học sinh)**
- CRUD lớp học
- CRUD học phần (bộ thẻ của lớp)
- CRUD bài tập
- Mời học sinh vào lớp thông qua email


## CÔNG NGHỆ SỬ DỤNG <a name="3"></a>
- **Javascript, HTML, CSS, Tailwind**
- **ReactJS, React Router, React Toastify, React Modal**
- Vite
## GIAO DIỆN <a name="4"></a>

- **Trang chủ khi chưa đăng nhập**

<img src="image-readme/home chưa đăng nhập.PNG"/>

- **Đăng nhập**

<img src="image-readme/đăng nhập.PNG"/>

- **Đăng ký**

<img src="image-readme/đăng ký.PNG"/>

- **Trang chủ sau khi đăng nhập**

<img src="image-readme/trang chủ sau khi đăng nhập.PNG"/>

- **Liên hệ**

<img src="image-readme/liên hệ.PNG"/>

- **Bộ thẻ cá nhân của người dùng**

<img src="image-readme/bộ thẻ cá nhân.PNG"/>

- **Tạo bộ thẻ cá nhân**

<img src="image-readme/tạo bộ thẻ cá nhân.PNG"/>

- **Hiệu chỉnh bộ thẻ cá nhân**

<img src="image-readme/hiệu chỉnh bộ thẻ cá nhân.PNG"/>

- **Thẻ cá nhân**

<img src="image-readme/thẻ cá nhân.PNG"/>

- **Học thẻ**

<img src="image-readme/học thẻ.PNG"/>
<p style="text-align: center">Nhấn vào thẻ để lật thẻ</p>

- **Bộ thẻ chuyên gia**
Bộ thẻ được public bởi các chuyên gia, người dùng có thể sao chép bộ thẻ về tài khoản của mình, sau đó có thể tiến hành hiệu chỉnh, thêm mới hoặc xóa thẻ không cần thiết

<img src="image-readme/bộ thẻ chuyên gia.PNG"/>

- **Lớp học chuyên gia**
Lớp học được public, mọi người dùng có thể thấy được lớp học và tham gia


<img src="image-readme/lớp học chuyên gia.PNG"/>

- **Chi tiết lớp học chuyên gia**

<img src="image-readme/chi tiết lớp học chuyên gia.PNG"/>


- **Lớp học cá nhân**

<img src="image-readme/nhóm của bạn.PNG"/>
<p style="text-align: center">Lớp học do bạn làm chủ (giáo viên)</p>

<img src="image-readme/nhóm bạn tham gia.PNG"/>
<p style="text-align: center">Lớp học bạn tham gia (học sinh)</p>


- **Thao tác ở lớp học do bạn làm chủ**

<img src="image-readme/tạo lớp.PNG"/>
<p style="text-align: center">tạo lớp (giáo viên)</p>

<img src="image-readme/hiệu chỉnh lớp.PNG"/>
<p style="text-align: center">Hiệu chỉnh lớp (giáo viên)</p>

<img src="image-readme/chi tiết lớp học.PNG"/>
<p style="text-align: center">Chi tiết lớp học (giáo viên)</p>

- Với các tab 

Member: Danh sách học sinh và thao tác lên học sinh 

<img src="image-readme/thành viên lớp học (owner).PNG"/>
<p style="text-align: center">Danh sách học sinh</p>
<img src="image-readme/mời học sinh (owner).PNG"/>
<p style="text-align: center">Mời học sinh</p>

Common card set (học phần)

<img src="image-readme/học phần lớp học (owner).PNG"/>
<p style="text-align: center">Danh sách học phần</p>

<img src="image-readme/tạo học phần (owner).PNG"/>
<p style="text-align: center">Tạo học phần</p>

<img src="image-readme/hiệu chỉnh học phần (owner).PNG"/>
<p style="text-align: center">Hiệu chỉnh học phần</p>

<img src="image-readme/chi tiết học phần (owner).PNG"/>
<p style="text-align: center">Chi tiết học phần</p>

<img src="image-readme/tạo thẻ trong chi tiết học phần.PNG"/>
<p style="text-align: center">Tạo thẻ trong chi tiết học phần</p>

<img src="image-readme/tạo thẻ trong chi tiết học phần.PNG"/>
<p style="text-align: center">Hiệu chỉnh thẻ trong chi tiết học phần</p>

<img src="image-readme/xóa thẻ trong chi tiết học phần.PNG"/>
<p style="text-align: center">Xóa thẻ trong chi tiết học phần</p>

<img src="image-readme/học thẻ trong chi tiết học phần.PNG"/>
<p style="text-align: center">Học thẻ trong chi tiết học phần</p>

Comment (thảo luận)

<img src="image-readme/thảo luận lớp học.PNG"/>

Assignment (bài tập)

<img src="image-readme/bài tập lớp học (owner).PNG" />
<p style="text-align: center">Danh sách bài tập</p>

<img src="image-readme/chi tiết bài tập.PNG" />
<p style="text-align: center">Chi tiết bài tập</p>

<img src="image-readme/nộp bài tập (owner).PNG" />
<p style="text-align: center">Chi tiết nộp bài tập</p>

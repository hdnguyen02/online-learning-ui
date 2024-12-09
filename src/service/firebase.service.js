import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';

class FirebaseService { 


    async uploadBlob(blob, folder) { 
        const uniqueFileName = uuidv4() + '.mp3'; 
        const storageRef = ref(storage, `${folder}/${uniqueFileName}`);
        await uploadBytes(storageRef, blob);
        const firebaseUrl = await getDownloadURL(storageRef);
        return firebaseUrl; // Trả về URL đúng
    }
 
    async uploadAvatar(blob) {
        const folder = "avatar"; // Thư mục cố định
        const fileExtension = blob.type.split("/")[1]; // Lấy phần mở rộng từ MIME type (ví dụ 'image/jpeg' => 'jpeg')
        
        if (!["jpeg", "png", "gif", "jpg", "bmp"].includes(fileExtension)) {
            throw new Error("Unsupported file type!");
        }
        
        const uniqueFileName = uuidv4() + `.${fileExtension}`; // Tạo tên file ngẫu nhiên với phần mở rộng phù hợp
        const storageRef = ref(storage, `${folder}/${uniqueFileName}`);
        
        // Upload blob vào Firebase Storage
        await uploadBytes(storageRef, blob);
        
        // Lấy URL tải xuống từ Firebase
        const firebaseUrl = await getDownloadURL(storageRef);
        return firebaseUrl; // Trả về URL của hình ảnh đã upload
    }
 }
export default new FirebaseService();
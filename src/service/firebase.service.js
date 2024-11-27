import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';

class FirebaseService { 


    async uploadBlob(blob, folder) { 
        console.log("uploadBlob")
        const uniqueFileName = uuidv4() + '.mp3'; 
        const storageRef = ref(storage, `${folder}/${uniqueFileName}`);
        await uploadBytes(storageRef, blob);
        const firebaseUrl = await getDownloadURL(storageRef);
        return firebaseUrl; // Trả về URL đúng
    }
}

export default new FirebaseService()
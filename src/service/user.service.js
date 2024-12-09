
import { fetchData } from '../global';


class UserService {

    async getProfileUser() {
        try {
            const subUrl = '/users'
            const { data: rawData } = await fetchData(subUrl, 'GET');
            return rawData;
        }
        catch (error) {
            return null;
        }
    }

    async updateUser(data) {
        const subUrl = '/users';
        try {
            await fetchData(subUrl, 'PUT', data);
            return true;
        }
        catch (error) {
            return false;
        }

    }

    async updateAvatarUser(data) { 
        const subUrl = '/users/avatar'; 
        try { 
            await fetchData(subUrl, 'PUT', data); 
            return true;
        }
        catch(error) { 
            return false; 
        }
    }

    async updatePWUser(data) { 
        const subUrl = '/users/password';
        try { 
            await fetchData(subUrl, 'PUT', data); 
            return true; 
        }
        catch(error) { 
            return false; 
        }
    }
}



export default new UserService();
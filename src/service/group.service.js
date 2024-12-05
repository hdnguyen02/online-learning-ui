
import { fetchData } from '../global';


class GroupService {

    async deleteGroup(id) { 
        console.log("chạy vào");
        try { 
            const subUrl = '/groups/' + id; 
            await fetchData(subUrl, 'DELETE'); 
            return true; 
        }
        catch(error) { 
            return false;
        }
    }
}

export default new GroupService();
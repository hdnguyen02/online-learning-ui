import { fetchData } from '../global';

class GlobalDeckService {




    async getGlobalDecks() {
        try {
            const subUrl = '/global/decks';
            const { data: rawData } = await fetchData(subUrl, 'GET');
            return rawData;

        } catch (error) {
            console.log(error);
            return [];
        }
    }



}

export default new GlobalDeckService();
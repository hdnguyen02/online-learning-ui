import { fetchData } from "../global";
import deckService from "./deck.service";
import firebaseService from "./firebase.service";

class CommonDeckService {


    async getCommonDeck(id) {
        try {
            const subUrl = '/common-decks/' + id;
            const { data: rawData } = await fetchData(subUrl, 'GET');
            return rawData;
        }
        catch (error) {
            return null;
        }
    }

    async update(data) { 

        const { commonDeck, commonCards } = data;
    
        try {
          for (const commonCard of commonCards) {
            // Check và upload audio nếu cần
            if (typeof commonCard.audio === "string" && commonCard.audio?.startsWith("blob:")) {
              const blob = await deckService.convertBlobUrlToBlob(commonCard.audio);
              commonCard.audio = await firebaseService.uploadBlob(blob, '/audio');
            }
    
            // Check và upload image nếu cần
            if (commonCard.image?.startsWith("blob:")) {
              const blob = await deckService.convertBlobUrlToBlob(commonCard.image);
              commonCard.image = await firebaseService.uploadBlob(blob, '/image');
            }
          }
    
    
          const commonCardsToSend = commonCards.map(commonCard => { 
            if (commonCard.isOrigin == true) { 
              return { 
                id: commonCard.id, 
                term: commonCard.term,
                definition: commonCard.definition,
                example: commonCard.example,
                image: commonCard.image,
                audio: commonCard.audio,
              }
            } 
            return { 
                term: commonCard.term,
                definition: commonCard.definition,
                example: commonCard.example,
                image: commonCard.image,
                audio: commonCard.audio,
            } 
          })
      
          const dataToSend = {
            id: commonDeck.id,
            name: commonDeck.name,
            description: commonDeck.description,
            configLanguage: commonDeck.configLanguage,
            cards: commonCardsToSend
          };
    
          await fetchData('/common-decks', 'PUT', dataToSend);
          return true;
        } catch (error) {
          console.error("An error occurred during the creation process:", error);
          return false; 
        }
        
      }

}

export default new CommonDeckService()  
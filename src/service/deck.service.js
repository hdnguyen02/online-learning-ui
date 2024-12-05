
import config from '../config';
import firebaseService from './firebase.service';
import { fetchData } from '../global';

class DeckService {


  async convertBlobUrlToBlob(blobUrl) {
    const response = await fetch(blobUrl);  // Tải dữ liệu từ URL blob
    const blob = await response.blob();     // Tạo Blob object từ response
    return blob;
  }



  async create(data) {
    const { deck, cards } = data;

    try {
      for (const card of cards) {
        // Check và upload audio nếu cần
        if (typeof card.audio === "string" && card.audio?.startsWith("blob:")) {
          const blob = await this.convertBlobUrlToBlob(card.audio);
          card.audio = await firebaseService.uploadBlob(blob, '/audio');
        }

        // Check và upload image nếu cần
        if (card.image?.startsWith("blob:")) {
          const blob = await this.convertBlobUrlToBlob(card.image);
          card.image = await firebaseService.uploadBlob(blob, '/image');
        }
      }

      const dataToSend = {
        name: deck.name,
        description: deck.description,
        isPublic: deck.isPublic,
        configLanguage: deck.configLanguage,
        cards: cards.map(card => ({
          term: card.term,
          definition: card.definition,
          example: card.example,
          image: card.image,
          audio: card.audio,
        })),
      };

      await fetchData('/decks', 'POST', dataToSend);
      return true;
    } catch (error) {
      console.error("An error occurred during the creation process:", error);
      return false; 
    }
  }
  

  async update(data) { 

    const { deck, cards } = data;

    try {
      for (const card of cards) {
        // Check và upload audio nếu cần
        if (typeof card.audio === "string" && card.audio?.startsWith("blob:")) {
          const blob = await this.convertBlobUrlToBlob(card.audio);
          card.audio = await firebaseService.uploadBlob(blob, '/audio');
        }

        // Check và upload image nếu cần
        if (card.image?.startsWith("blob:")) {
          const blob = await this.convertBlobUrlToBlob(card.image);
          card.image = await firebaseService.uploadBlob(blob, '/image');
        }
      }


      const cardsToSend = cards.map(card => { 
        if (card.isOrigin == true) { 
          return { 
            id: card.id, 
            term: card.term,
            definition: card.definition,
            example: card.example,
            image: card.image,
            audio: card.audio,
          }
        } 
        return { 
            term: card.term,
            definition: card.definition,
            example: card.example,
            image: card.image,
            audio: card.audio,
        } 
      })
  
      const dataToSend = {
        id: deck.id,
        name: deck.name,
        description: deck.description,
        isPublic: deck.isPublic,
        configLanguage: deck.configLanguage,
        cards: cardsToSend
      };

      await fetchData('/decks', 'PUT', dataToSend);
      return true;
    } catch (error) {
      console.error("An error occurred during the creation process:", error);
      return false; 
    }
    
  }
  
  async searchImages(query) {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=10`,
        {
          headers: {
            Authorization: `Client-ID ${config.unsplash_access_key}`,
          },
        }
      );
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.log(error);
    }
  };

  // lấy text voice. 


  async getVoice(text, languageCode) {
    const apiKey = config.voicerss_api_key;
    const url = 'https://api.voicerss.org/';

    const params = new URLSearchParams();
    params.append('key', apiKey);  // API key
    params.append('src', text);    // Văn bản cần chuyển thành giọng nói
    params.append('hl', languageCode);  // Mã ngôn ngữ, ví dụ: 'en-us', 'vi-vn'
    params.append('c', 'mp3');  // Định dạng âm thanh (mp3 hoặc wav)


    const response = await fetch(url, {
      method: 'POST',
      body: params,
    });

    if (response.ok) {
      const data = await response.blob();
      const audioUrl = URL.createObjectURL(data);
      return audioUrl;
    } else {
      throw new Error('Failed to fetch data from VoiceRSS');
    }
  };


  // lấy ngôn ngữ
  async getAllLanguage() {
    const subUrl = '/languages';
    const { data: rawData } = await fetchData(subUrl, 'GET');
    return rawData;
  }

  async getDecks() {
    try {
      const subUrl = '/decks';
      const { data: rawData } = await fetchData(subUrl, 'GET');
      return rawData;
    }
    catch (error) {
      return [];
    }
  }


  async getDeck(id) {
    try {
      const subUrl = '/decks/' + id;
      const { data: rawData } = await fetchData(subUrl, 'GET');
      return rawData;
    }
    catch (error) {
      return null;
    }
  }

  async deleteDeck(id) { 
    const subUrl = '/decks/' + id;
    try {
      await fetchData(subUrl, "DELETE");
      return true;
    } catch (error) {
      return false; 
    }
  }
}

export default new DeckService();
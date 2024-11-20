
import config from '../config';
import { fetchData } from '../global';


class DeckService {
  async create(data) {
    console.log(data);
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



}

export default new DeckService();
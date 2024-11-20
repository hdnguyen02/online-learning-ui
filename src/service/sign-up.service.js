
import { fetchDataWithoutAccessToken } from '../global'


class SignUpService {
  async signUp(signUpModel) {
    const subUrl = '/auth/sign-up';
    return await fetchDataWithoutAccessToken(subUrl, 'POST', signUpModel);
  }
}

export default new SignUpService();
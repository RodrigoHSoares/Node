import axios from "axios";

/**
 * Receber code(string)
 * Recuperar o access token no github
 * Recuperar infos do user n github
 * Verificar se o usuário existe no D
 * ---- sim = gera token 
 * ---- não = Cria DB, gera token
 * Retornar token com as infos do user
 */

interface IaccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;

}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: accesTokenResponse } = await axios.post<IaccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json"

      }
    });

    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accesTokenResponse.access_token}`
      }
    })

    return response.data;

  }
}


export { AuthenticateUserService }

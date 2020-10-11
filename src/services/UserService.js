import axios from 'axios'

const USERS_REST_API_URL = "http://aws-haproxy.ddns.net:30010/api/user";

class UserService {

    async getUsers() {
        try {
          return await axios.get(USERS_REST_API_URL);
        } catch (e) {
          console.log(e);
        }
    }

    async deleteUser(username) {
      try {
        return await axios.delete(`${USERS_REST_API_URL}/${username}`)
      } catch (e) {
        console.log(e);
      }
    }

    async updateUser(user) {
      try {
        return await axios.put(`${USERS_REST_API_URL}/${user.username}`, user)
      } catch (e) {
        console.log(e);
      }
    }

    async createUser(user) {
      try {
        return await axios.post(`${USERS_REST_API_URL}`, user)
      } catch (e) {
        console.log(e);
      }
    }

}

export default new UserService();

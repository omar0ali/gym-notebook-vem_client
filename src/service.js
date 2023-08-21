import axios from "axios";

class Service {
    static url = "http://localhost:5001";
    //TODO: User
    // Create User
    static async signUpUser(displayName, userName, email, password) {
        return await fetch(Service.url+"/signup", {
            method: 'POST',
            body: JSON.stringify({ displayName, userName, email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
    }
    //login User
    static async loginUser(userName, password) {
        return await axios.post(`login`, {
            userName, password
        })
    }

    static async deleteUser(id) {
        return await axios.delete(`api/users/${id}`)
    }
}

export default Service;
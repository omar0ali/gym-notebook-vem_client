
import Service from './service';
class UserAPI extends Service {
    static async createUser(displayName, userName, email, password,weight, height, admin, accountType) {
        const res = await fetch(Service.url + "/api/users", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                displayName,
                userName,
                email,
                password,
                height,
                weight,
                admin,
                accountType
            }),
            headers: { "Content-Type": "application/json" },
        });
        return res.json(); //await
    }

    static async getUsers() {
        const res = await fetch(Service.url + "/api/users", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        return res.json();
    }

    static async deleteCurrentUser(id) {
        const res = await fetch(Service.url + "/api/users/currentUser/" + id, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        return await res.json();
    }
}

export default UserAPI;
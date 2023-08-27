

class Service {
    static url = "http://localhost:5001";

    //refresh the page
    static goToPage(location) {
        window.location.href = "/" + location;
    }

    //CheckUser
    static async checkUser() {
        const res = await fetch(Service.url + "/checkUser", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        return res.json();
    }

    //TODO: User
    // Create User
    static async signUpUser(displayName, userName, email, password, weight, height) {
        const res = await fetch(Service.url + "/signup", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                displayName,
                userName,
                email,
                password,
                height,
                weight
            }),
            headers: { "Content-Type": "application/json" },
        });
        return res.json(); //await
    }
    //login User
    static async loginUser(userName, password) {
        const res = await fetch(Service.url + "/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                userName,
                password
            }),
            headers: { "Content-Type": "application/json" },
        });
        return res.json(); //await
    }

    static async deleteCurrentUser(userData) {
        const res = await fetch(Service.url + "/api/users/" + userData._id, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        return await res.json();
    }


    static async logOutUser() {
        const res = await fetch(Service.url + "/logout", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        return await res.json();
    }
}

export default Service;
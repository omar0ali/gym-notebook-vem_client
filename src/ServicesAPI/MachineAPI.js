
import Service from './service';
class MachineAPI extends Service {
    static async createMachine(name, machineType, description, focusedMuscles) {
        const arrfocusedMuscles = focusedMuscles.split(',').map(item => item.trim());
        const res = await fetch(Service.url + "/api/gym_machines", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                name,
                machineType,
                description,
                focusedMuscles: arrfocusedMuscles
            }),
            headers: { "Content-Type": "application/json" },
        });
        return res.json(); //await
    }

    static async getMachines() {
        const res = await fetch(Service.url + "/api/gym_machines", {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        return res.json();
    }

    static async deleteCurrentMachine(id) {
        const res = await fetch(Service.url + "/api/gym_machines/" + id, {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        return await res.json();
    }
}

export default MachineAPI;
import { writable, derived } from "svelte/store"
import cookie from "js-cookie"

export const jwt = createJwt();
export const type = writable("clickbait");
export const article = writable(null);
export const history = createHistory();
export const user = derived(
	jwt,
	$jwt => { 
        if($jwt) return JSON.parse(window.atob($jwt.split(".")[1]));
        else return {};
    }
);

function createJwt() {
    const jwtExist = cookie.get("jwt") !== undefined && cookie.get("jwt");
	const { subscribe, set } = writable(jwtExist ? cookie.get("jwt") : "");

	return {
		subscribe,
		set: (jwt) => {
            set(jwt);
            if(jwt) cookie.set("jwt", jwt);
            else cookie.remove("jwt");
        }
	};
}

function createHistory() {
	const { subscribe, update, set } = writable([]);

	return {
        subscribe,
        set,
		add: (label) => {
            update(history => [...history, label])
        },
        delete: (labelID) => {
            update(history => history.filter(h => h.id !== labelID))
        }
	};
}

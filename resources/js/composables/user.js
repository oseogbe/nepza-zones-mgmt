import { ref } from "vue";
import useAxios from "./axios.js";

const user = ref(null);

export default function useUser() {

    const { state, request } = useAxios();

    const getUser = async () => {
        if (user.value) return user.value;

        await request('get', '/user');
        return state.data;
    };

    const initUser = async () => {
        user.value = await getUser();
    };

    // logout
    // async function logout() {
    //     await axios.post("/logout");
    //     user.value = null;
    //     router.replace({ name: "login" });
    // }

    return {
        getUser,
        initUser,
        user,
    };
}

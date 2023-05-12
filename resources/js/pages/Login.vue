<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const form = reactive({
    email: "",
    password: "",
});

const errors = ref([]);

const submit = () => {
    axios
        .post("/login", form)
        .then((response) => {
            let rData = response.data;
            if (rData.success) {
                localStorage.setItem("nz-token", rData.payload.token);
                const redirectPath = route.query.redirect || { name: "enterprises" };
                router.push(redirectPath);
            } else {
                console.log(rData.err_message);
            }
        })
        .catch((error) => {
            console.error(error);
        });
};
</script>

<template>
    <guest-layout>
        <div class="max-w-[85rem] w-full mx-auto">
            <div
                class="grid md:grid-cols-5 shadow-lg rounded-xl mx-4 my-8 md:my-16"
            >
                <div
                    class="md:col-span-2 flex flex-col justify-center px-6 py-8 md:px-12 leading-[1.2]"
                >
                    <h1 class="text-primary text-2xl md:text-4xl">Zone User</h1>
                    <form
                        class="pt-8"
                        @submit.prevent="submit"
                        autocomplete="off"
                    >
                        <div>
                            <input-label for="email" value="Email" />

                            <text-input
                                id="email"
                                type="text"
                                class="mt-1 block w-full"
                                v-model="form.email"
                                required
                            />

                            <input-error
                                class="mt-2"
                                v-if="errors.email"
                                :message="errors.email"
                            />
                        </div>

                        <div class="mt-4">
                            <input-label for="password" value="Password" />

                            <text-input
                                id="password"
                                type="password"
                                class="mt-1 block w-full"
                                v-model="form.password"
                                required
                            />

                            <input-error
                                class="mt-2"
                                v-if="errors.password"
                                :message="errors.password"
                            />
                        </div>

                        <div class="flex items-center mt-6">
                            <primary-button>Login</primary-button>
                        </div>
                    </form>
                </div>
                <div
                    class="login-img hidden md:block md:col-span-3 h-[500px] bg-center bg-[length:125%]"
                ></div>
            </div>
        </div>
    </guest-layout>
</template>

<style scoped>
.login-img {
    background-image: url('/complex.jpg');
}
</style>

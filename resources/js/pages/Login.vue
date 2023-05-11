<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref('');
const password = ref('');
const errors = ref([]);

const submit = async () => {
    try {
        const response = await axios.post('z1.0/login', {
            email: email.value,
            password: password.value,
        });
        const token = response.data.payload.token;
        localStorage.setItem('nz-token', token);
        router.push('/enterprises');
    } catch (error) {
        console.error(error);
    }
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
                    <h1 class="text-primary text-2xl md:text-4xl">
                        Zone User
                    </h1>
                    <form class="pt-8" @submit.prevent="submit">
                        <div>
                            <input-label for="email" value="Email" />

                            <text-input
                                id="email"
                                type="text"
                                class="mt-1 block w-full"
                                v-model="email"
                                required
                                autocomplete="username"
                            />

                            <input-error
                                class="mt-2"
                                :message="errors.email"
                            />
                        </div>

                        <div class="mt-4">
                            <input-label for="password" value="Password" />

                            <text-input
                                id="password"
                                type="password"
                                class="mt-1 block w-full"
                                v-model="password"
                                required
                                autocomplete="current-password"
                            />

                            <input-error
                                class="mt-2"
                                :message="errors.password"
                            />
                        </div>

                        <div class="flex items-center mt-6">
                            <primary-button>Login</primary-button>
                        </div>
                    </form>
                </div>
                <div
                    class="hidden md:block md:col-span-3 h-[500px] bg-[url('/complex.jpg')] bg-center bg-[length:125%]"
                ></div>
            </div>
        </div>
    </guest-layout>
</template>

<style lang="scss" scoped></style>

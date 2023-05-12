<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import useAxios from "@/composables/axios";

const router = useRouter();

const form = reactive({
    p10020: "",
    p10021: "",
    p10023: "",
    p10022: "",
    p10010: "",
    p10011: "",
    p10030: "NG",
});

const loading = ref(false);
const errors = ref([]);

const selectedCountryCode = ref("+234");

const countries = ref([]);

const { state, request } = useAxios();

const getCountries = async () => {
    await request("get", "/get_countries");
    return state.data;
};

getCountries()
    .then((data) => {
        countries.value = data.payload.countries;
    })
    .catch((err) => console.error(err));

const submit = async () => {
    loading.value = true;
    const enterprise = {
        ...form,
        p10022: `${selectedCountryCode.value} ${form.p10022}`,
    };
    await request("post", "/enterprises/new", enterprise);
    router.push({
        name: "enterprise",
        params: {
            id: state.data.payload.ident,
        },
    });
};
</script>

<template>
    <auth-layout>
        <div class="space-y-6">
            <div>
                <div class="flex items-center gap-x-3">
                    <h2
                        class="text-lg font-medium text-gray-800 dark:text-white"
                    >
                        New Enterprise
                    </h2>
                </div>

                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    Please fill out the following information.
                </p>
            </div>

            <div class="sm:grid sm:grid-cols-3 gap-6">
                <form @submit.prevent="submit" autocomplete="off">
                    <div>
                        <input-label for="firstname" value="Firstname" />

                        <text-input
                            id="firstname"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="form.p10020"
                            required
                        />

                        <input-error class="mt-2" :message="errors.p10020" />
                    </div>

                    <div class="mt-4">
                        <input-label for="lastname" value="Lastname" />

                        <text-input
                            id="lastname"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="form.p10021"
                            required
                        />

                        <input-error class="mt-2" :message="errors.p10021" />
                    </div>

                    <div class="mt-4">
                        <input-label for="email" value="Email" />

                        <text-input
                            id="email"
                            type="email"
                            class="mt-1 block w-full"
                            v-model="form.p10023"
                            required
                        />

                        <input-error class="mt-2" :message="errors.p10023" />
                    </div>

                    <div class="mt-4">
                        <input-label for="phone" value="Phone number" />

                        <div class="relative">
                            <input
                                type="text"
                                id="phone"
                                class="py-3 px-4 pl-20 block w-full shadow-sm rounded-md text-sm text-gray-600 focus:z-10 border-primary focus:border-primary focus:ring-primary/70"
                                v-model="form.p10022"
                                placeholder="(800) 000-0000"
                                required
                            />
                            <div
                                class="absolute inset-y-0 left-0 flex items-center text-gray-500 pl-px"
                            >
                                <label
                                    for="hs-inline-leading-select-country"
                                    class="sr-only"
                                    >Country</label
                                >
                                <select
                                    id="hs-inline-leading-select-country"
                                    name="hs-inline-leading-select-country"
                                    class="block w-full border-transparent rounded-md focus:ring-0 focus:border-none"
                                    v-model="selectedCountryCode"
                                >
                                    <option value="+234" selected>NG</option>
                                    <option value="+1">US</option>
                                    <option value="+44">UK</option>
                                </select>
                            </div>
                        </div>

                        <input-error class="mt-2" :message="errors.p10022" />
                    </div>

                    <div class="mt-4">
                        <input-label
                            for="company_name"
                            value="Enterprise Name"
                        />

                        <text-input
                            id="company_name"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="form.p10010"
                            required
                        />

                        <input-error class="mt-2" :message="errors.p10010" />
                    </div>

                    <div class="mt-4">
                        <input-label
                            for="company_email"
                            value="Enterprise Email"
                        />

                        <text-input
                            id="company_email"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="form.p10011"
                            required
                        />

                        <input-error class="mt-2" :message="errors.p10011" />
                    </div>

                    <div class="mt-4">
                        <input-label
                            for="company_country"
                            value="Enterprise Country"
                        />

                        <select
                            id="company_country"
                            class="mt-1 block w-full text-gray-600 border-primary focus:border-primary focus:ring-primary/70 rounded-md shadow-sm"
                            v-model="form.p10030"
                            required
                        >
                            <option
                                v-for="country in countries"
                                :value="country.code"
                            >
                                {{ country.name }}
                            </option>
                        </select>

                        <input-error class="mt-2" :message="errors.p10030" />
                    </div>

                    <div class="flex items-center mt-6">
                        <PrimaryButton
                            :class="{ 'opacity-75': loading }"
                            :disabled="loading"
                        >
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    </auth-layout>
</template>

<style scoped></style>

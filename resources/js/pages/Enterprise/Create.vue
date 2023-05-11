<script setup>
import { ref } from "vue";

const first_name = ref("");
const last_name = ref("");
const email = ref("");
const phone = ref("");
const company_name = ref("");
const company_email = ref("");
const loading = ref(false);
const errors = ref([]);

const selectedCountryCode = ref("+234");

const submit = () => {
    // phone.value: `${selectedCountryCode.value} ${data.phone}`
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
                            v-model="first_name"
                            required
                        />

                        <input-error
                            class="mt-2"
                            :message="errors.first_name"
                        />
                    </div>

                    <div class="mt-4">
                        <input-label for="lastname" value="Lastname" />

                        <text-input
                            id="lastname"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="last_name"
                            required
                        />

                        <input-error
                            class="mt-2"
                            :message="errors.last_name"
                        />
                    </div>

                    <div class="mt-4">
                        <input-label for="email" value="Email" />

                        <text-input
                            id="email"
                            type="email"
                            class="mt-1 block w-full"
                            v-model="email"
                            required
                        />

                        <input-error
                            class="mt-2"
                            :message="errors.email"
                        />
                    </div>

                    <div class="mt-4">
                        <input-label for="phone" value="Phone number" />

                        <div class="relative">
                            <input
                                type="text"
                                id="phone"
                                class="py-3 px-4 pl-20 block w-full shadow-sm rounded-md text-sm focus:z-10 border-primary focus:border-primary focus:ring-primary/70"
                                v-model="phone"
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
                                    <option value="+234" selected>
                                        NG
                                    </option>
                                    <option value="+1">US</option>
                                    <option value="+44">UK</option>
                                </select>
                            </div>
                        </div>

                        <input-error
                            class="mt-2"
                            :message="errors.phone"
                        />
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
                            v-model="company_name"
                            required
                        />

                        <input-error
                            class="mt-2"
                            :message="errors.company_name"
                        />
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
                            v-model="company_email"
                            required
                        />

                        <input-error
                            class="mt-2"
                            :message="errors.company_email"
                        />
                    </div>

                    <div class="mt-4">
                        <input-label
                            for="company_country"
                            value="Enterprise Country"
                        />

                        <text-input
                            id="company_country"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="company_country"
                            required
                        />

                        <input-error
                            class="mt-2"
                            :message="errors.company_country"
                        />
                    </div>

                    <div class="flex items-center mt-6">
                        <PrimaryButton
                            :class="{ 'opacity-25': loading }"
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

<style lang="scss" scoped>

</style>

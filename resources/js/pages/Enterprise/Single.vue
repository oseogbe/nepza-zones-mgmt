<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import useAxios from "@/composables/axios";

const eID = ref(useRoute().params.id);

const { state, request } = useAxios();

const getEnterprise = async () => {
    await request("get", `enterprises/${eID.value}`);
    return state.data;
};

const enterprise = ref(null);

getEnterprise()
    .then((data) => {
        enterprise.value = data.payload.enterprise;
    })
    .catch((err) => console.error(err));
</script>

<template>
    <auth-layout>
        <div class="mb-8 ">
            <router-link
                :to="{ name: 'enterprises' }"
                class="text-sm text-gray-600 px-4 py-2 border border-gray-500 bg-gray-100 rounded-md"
            >
                <font-awesome-icon icon="fa-solid fa-backward" class="text-gray-500" />
                Back
            </router-link>
        </div>
        <div class="first-letter:sm:grid sm:grid-cols-3 gap-6">
            <div v-if="enterprise" class="col-span-2 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 lg:p-8">
                <h1 class="text-3xl text-gray-600">{{ enterprise.name }}</h1>
                <p class="text-gray-400">{{ enterprise.email }}</p>
            </div>
        </div>
    </auth-layout>
</template>

<style lang="scss" scoped></style>

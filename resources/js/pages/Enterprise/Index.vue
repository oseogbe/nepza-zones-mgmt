<script setup>
import { ref } from "vue";
import useAxios from "@/composables/axios";

const enterprises = ref([]);
const enterprises_count = ref(0);
const search = ref("");
const selectedStatus = ref(null);
const comments = ref("");
const loading = ref(false);

const { state, request } = useAxios();

const getEnterprises = async () => {
    await request("get", "/enterprises");
    return state.data;
};

getEnterprises()
    .then((data) => {
        enterprises.value = data.payload.enterprises;
        enterprises_count.value = data.payload.meta.enterprise_count;
    })
    .catch((err) => console.error(err));

const filterByStatus = (status = "") => {};

const sortCompanies = () => {};

const approveEnterprise = (enterprise_id) => {};

const applicationToDecline = ref(null);

const declineEnterprise = () => {};
</script>

<template>
    <auth-layout>
        <section>
            <div
                class="sm:flex sm:items-center sm:justify-between space-y-6 sm:space-y-0"
            >
                <div>
                    <div class="flex items-center gap-x-3">
                        <h2
                            class="text-lg font-medium text-gray-800 dark:text-white"
                        >
                            Your Enterprises
                        </h2>

                        <span
                            class="px-3 py-1 text-xs text-primary bg-primary/10 rounded-full"
                        >
                            {{ enterprises_count }}
                        </span>
                    </div>

                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        <!-- You have {{ pendingEnterprises }} pending enterprises today. -->
                    </p>
                </div>
                <div>
                    <router-link
                        :to="{ name: 'enterprise.add' }"
                        class="text-sm text-gray-600 px-4 py-2 border border-gray-600 bg-gray-100 rounded-md"
                    >
                        New Enterprise
                        <font-awesome-icon icon="fa-solid fa-plus" />
                    </router-link>
                </div>
            </div>

            <div class="mt-6 md:flex md:items-center md:justify-between">
                <!-- <div
                    class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700"
                >
                    <button
                        @click="filterByStatus()"
                        :class="{ active: !selectedStatus }"
                        class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        View all
                    </button>

                    <button
                        @click="filterByStatus(1)"
                        :class="{ active: selectedStatus === 1 }"
                        class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        Pending
                    </button>

                    <button
                        @click="filterByStatus(2)"
                        :class="{ active: selectedStatus === 2 }"
                        class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        Approved
                    </button>

                    <button
                        @click="filterByStatus(3)"
                        :class="{ active: selectedStatus === 3 }"
                        class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                    >
                        Declined
                    </button>
                </div> -->

                <div class="relative flex items-center mt-4 md:mt-0">
                    <span class="absolute">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </span>

                    <input
                        type="text"
                        v-model="search"
                        placeholder="Search"
                        class="block w-full py-1.5 pr-5 text-gray-500 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-none focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
            </div>

            <div class="flex flex-col mt-6">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div
                        class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
                    >
                        <div
                            v-if="enterprises && enterprises.length > 0"
                            class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg"
                        >
                            <table
                                class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                            >
                                <thead class="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th
                                            scope="col"
                                            class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            <button
                                                @click="sortCompanies()"
                                                class="flex items-center gap-x-3 focus:outline-none"
                                            >
                                                <span>Enterprises</span>

                                                <svg
                                                    class="h-3"
                                                    viewBox="0 0 10 11"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                                        fill="currentColor"
                                                        stroke="currentColor"
                                                        stroke-width="0.1"
                                                    />
                                                    <path
                                                        d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                                        fill="currentColor"
                                                        stroke="currentColor"
                                                        stroke-width="0.1"
                                                    />
                                                    <path
                                                        d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                                        fill="currentColor"
                                                        stroke="currentColor"
                                                        stroke-width="0.3"
                                                    />
                                                </svg>
                                            </button>
                                        </th>

                                        <th
                                            scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Country
                                        </th>

                                        <th
                                            scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Name
                                        </th>

                                        <th
                                            scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Email
                                        </th>

                                        <th
                                            scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            Phone
                                        </th>

                                        <th
                                            scope="col"
                                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            KYC Status
                                        </th>

                                        <th
                                            scope="col"
                                            class="relative py-3.5 px-4"
                                        >
                                            <span class="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
                                >
                                    <tr
                                        v-for="enterprise in enterprises"
                                        :key="enterprise.id"
                                    >
                                        <td
                                            class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                                        >
                                            <div class="hs-tooltip inline-block [--placement:right] ">
                                                <h2
                                                    class="hs-tooltip-toggle font-medium text-gray-800 dark:text-white"
                                                >
                                                    {{ enterprise.name }}
                                                    <span
                                                        class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
                                                        role="tooltip"
                                                    >
                                                        {{ enterprise.name_approved ? 'Approved'  : 'Not Approved'}}
                                                    </span>
                                                </h2>
                                                <p
                                                    class="text-sm font-normal text-gray-600 dark:text-gray-400"
                                                >
                                                    {{ enterprise.email }}
                                                </p>
                                            </div>
                                        </td>
                                        <td
                                            class="px-4 py-4 text-sm whitespace-nowrap"
                                        >
                                            <div>
                                                <p
                                                    class="text-gray-500 dark:text-gray-400"
                                                >
                                                    {{ enterprise.country }}
                                                </p>
                                            </div>
                                        </td>
                                        <td
                                            class="px-4 py-4 text-sm whitespace-nowrap"
                                        >
                                            <div>
                                                <p
                                                    class="text-gray-500 dark:text-gray-400"
                                                >
                                                    {{
                                                        enterprise.promoter.name
                                                    }}
                                                </p>
                                            </div>
                                        </td>
                                        <td
                                            class="px-4 py-4 text-sm whitespace-nowrap"
                                        >
                                            <div>
                                                <p
                                                    class="text-gray-500 dark:text-gray-400"
                                                >
                                                    {{
                                                        enterprise.promoter
                                                            .email
                                                    }}
                                                </p>
                                            </div>
                                        </td>

                                        <td
                                            class="px-4 py-4 text-sm whitespace-nowrap"
                                        >
                                            <div>
                                                <p
                                                    class="text-gray-500 dark:text-gray-400"
                                                >
                                                    {{
                                                        enterprise.promoter
                                                            .phone
                                                    }}
                                                </p>
                                            </div>
                                        </td>

                                        <td
                                            class="px-4 py-4 text-sm font-medium whitespace-nowrap"
                                        >
                                            <div
                                                :class="{
                                                    'text-green-500 gap-x-2 bg-green-100/60':
                                                        enterprise.kyc_completed ===
                                                        true,
                                                    'text-red-500 gap-x-2 bg-red-100/60':
                                                        enterprise.kyc_completed ===
                                                        false,
                                                }"
                                                class="inline px-3 py-1 text-sm font-normal rounded-full"
                                            >
                                                {{
                                                    enterprise.kyc_completed
                                                        ? "Completed"
                                                        : "Pending"
                                                }}
                                            </div>
                                        </td>

                                        <td
                                            class="px-4 py-4 text-sm whitespace-nowrap"
                                        >
                                            <div
                                                @click="
                                                    $router.push({
                                                        name: 'enterprise',
                                                        params: {
                                                            id: enterprise.ident,
                                                        },
                                                    })
                                                "
                                                class="text-gray-500 cursor-pointer text-lg"
                                            >
                                                <font-awesome-icon
                                                    icon="fa-solid fa-eye"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div
                            v-else
                            class="min-h-[28rem] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]"
                        >
                            <div
                                class="flex flex-auto flex-col justify-center items-center p-4 md:p-5"
                            >
                                <svg
                                    class="max-w-[5rem]"
                                    viewBox="0 0 375 428"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M254.509 253.872L226.509 226.872"
                                        class="stroke-gray-400 dark:stroke-white"
                                        stroke="currentColor"
                                        stroke-width="7"
                                        stroke-linecap="round"
                                    />
                                    <path
                                        d="M237.219 54.3721C254.387 76.4666 264.609 104.226 264.609 134.372C264.609 206.445 206.182 264.872 134.109 264.872C62.0355 264.872 3.60864 206.445 3.60864 134.372C3.60864 62.2989 62.0355 3.87207 134.109 3.87207C160.463 3.87207 184.993 11.6844 205.509 25.1196"
                                        class="stroke-gray-400 dark:stroke-white"
                                        stroke="currentColor"
                                        stroke-width="7"
                                        stroke-linecap="round"
                                    />
                                    <rect
                                        x="270.524"
                                        y="221.872"
                                        width="137.404"
                                        height="73.2425"
                                        rx="36.6212"
                                        transform="rotate(40.8596 270.524 221.872)"
                                        class="fill-gray-400 dark:fill-white"
                                        fill="currentColor"
                                    />
                                    <ellipse
                                        cx="133.109"
                                        cy="404.372"
                                        rx="121.5"
                                        ry="23.5"
                                        class="fill-gray-400 dark:fill-white"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M111.608 188.872C120.959 177.043 141.18 171.616 156.608 188.872"
                                        class="stroke-gray-400 dark:stroke-white"
                                        stroke="currentColor"
                                        stroke-width="7"
                                        stroke-linecap="round"
                                    />
                                    <ellipse
                                        cx="96.6084"
                                        cy="116.872"
                                        rx="9"
                                        ry="12"
                                        class="fill-gray-400 dark:fill-white"
                                        fill="currentColor"
                                    />
                                    <ellipse
                                        cx="172.608"
                                        cy="117.872"
                                        rx="9"
                                        ry="12"
                                        class="fill-gray-400 dark:fill-white"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M194.339 147.588C189.547 148.866 189.114 142.999 189.728 138.038C189.918 136.501 191.738 135.958 192.749 137.131C196.12 141.047 199.165 146.301 194.339 147.588Z"
                                        class="fill-gray-400 dark:fill-white"
                                        fill="currentColor"
                                    />
                                </svg>
                                <p
                                    class="mt-5 text-sm text-gray-500 dark:text-gray-500"
                                >
                                    No data to show
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Start of Decline Application Modal -->
            <div
                id="hs-slide-up-animation-modal"
                class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
            >
                <div
                    class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-14 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto"
                >
                    <div
                        class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]"
                    >
                        <div
                            class="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700"
                        >
                            <h3 class="font-bold text-gray-800 dark:text-white">
                                Are you sure you want to decline this
                                application?
                            </h3>
                            <button
                                type="button"
                                id="modalCloseBtn"
                                class="hs-dropup-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                                data-hs-overlay="#hs-slide-up-animation-modal"
                            >
                                <span class="sr-only">Close</span>
                                <svg
                                    class="w-3.5 h-3.5"
                                    width="8"
                                    height="8"
                                    viewBox="0 0 8 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form @submit.prevent="declineEnterprise">
                            <div class="p-4 overflow-y-auto">
                                <p
                                    class="text-sm text-gray-800 dark:text-gray-400"
                                >
                                    Please state the reason for rejecting. This
                                    will be emailed to the applicant.
                                </p>
                                <textarea
                                    v-model="comments"
                                    class="mt-4 block w-full border-gray-200 rounded-md text-sm text-gray-600 focus:border-primary/50 focus:ring-primary/50"
                                    rows="5"
                                    required
                                >
                                </textarea>
                            </div>
                            <div
                                class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700"
                            >
                                <button
                                    type="button"
                                    class="hs-dropup-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary/60 transition-all text-sm"
                                    data-hs-overlay="#hs-slide-up-animation-modal"
                                    @click="comments = ''"
                                >
                                    Close
                                </button>
                                <button
                                    :class="{ 'opacity-25': loading }"
                                    :disabled="loading"
                                    class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary/80 text-white hover:bg-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- End of Decline Application Modal -->

            <div class="mt-6 sm:flex sm:items-center sm:justify-between">
                <div class="text-sm text-gray-500 dark:text-gray-400">
                    Page
                    <span class="font-medium text-gray-700 dark:text-gray-100"
                        >1 of 10</span
                    >
                </div>

                <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
                    <router-link
                        v-if="enterprises.prev_page_url"
                        :to="enterprises.prev_page_url"
                        preserve-scroll
                        class="pagination-link"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5 rtl:-scale-x-100"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>

                        <span> previous </span>
                    </router-link>
                    <span v-else class="pagination-link">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5 rtl:-scale-x-100"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>

                        <span> previous </span>
                    </span>

                    <router-link
                        v-if="enterprises.next_page_url"
                        :to="enterprises.next_page_url"
                        preserve-scroll
                        class="pagination-link"
                    >
                        <span> Next </span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5 rtl:-scale-x-100"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </router-link>
                    <span v-else class="pagination-link">
                        <span> Next </span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5 rtl:-scale-x-100"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </section>
    </auth-layout>
</template>

<style scoped>
.active {
    @apply px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300;
}

.pagination-link {
    @apply flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800;
}
</style>

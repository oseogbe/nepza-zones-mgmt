<script setup>
import useUser from '@/composables/user';
const { user } = useUser();
</script>

<template>
    <div class="container mx-auto selection:bg-primary/40">
        <header
            class="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4"
        >
            <nav
                class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
                aria-label="Global"
            >
                <div class="flex items-center justify-between">
                    <div>
                        <router-link
                            class="flex-none text-3xl lg:text-4xl font-semibold dark:text-white"
                            to="/"
                            ><h1 class="-m-[2px] text-primary uppercase">Nepza</h1>
                        </router-link>
                        <p>Zone Management</p>
                    </div>
                    <div class="sm:hidden">
                        <button
                            type="button"
                            class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none transition-all text-sm"
                            data-hs-collapse="#navbar-collapse-with-animation"
                            aria-controls="navbar-collapse-with-animation"
                            aria-label="Toggle navigation"
                        >
                            <svg
                                class="hs-collapse-open:hidden w-8 h-8"
                                width="16"
                                height="16"
                                fill="#6DA681"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                />
                            </svg>
                            <svg
                                class="hs-collapse-open:block hidden w-8 h-8"
                                width="16"
                                height="16"
                                fill="#6DA681"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="hidden sm:flex sm:items-center sm:ml-6">
                    <!-- Settings Dropdown -->
                    <div class="ml-3 relative">
                        <Dropdown align="right" width="48">
                            <template #trigger>
                                <span class="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        class="inline-flex items-center border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {{ user.user.name }}
                                        <svg
                                            class="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </template>

                            <template #content>
                                <DropdownLink to="enterprises">
                                    Enterprises
                                </DropdownLink>
                                <!-- <DropdownLink to="profile">
                                    Profile
                                </DropdownLink> -->
                                <!-- <DropdownLink to="logout">
                                    Log Out
                                </DropdownLink> -->
                            </template>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        </header>
        <div class="max-w-[85rem] w-full mx-auto">
            <div class="mx-4 my-8 md:my-16">
                <slot />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>

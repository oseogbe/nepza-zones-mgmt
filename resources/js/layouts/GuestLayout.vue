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
                            ><h1 class="text-primary uppercase">Nepza</h1>
                        </router-link>
                        <p class="pl-1">Zone Management</p>
                    </div>
                </div>
            </nav>
        </header>
        <slot />
    </div>
</template>

<style lang="scss" scoped></style>

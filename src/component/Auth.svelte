<div class="fixed top-0 bg-dark-7 w-screen p-4 flex justify-end z-20">
    {#if !$jwt}
        <button class="mr-4 text-dark-2 hover:text-dark-1 focus:outline-none" on:click={() => state = "Login"}>
            Login
        </button>
        <button class="text-dark-2 hover:text-dark-1 focus:outline-none" on:click={() => state = "Register"}>
            Register
        </button>
    {:else}
        <div class="relative" on:mouseover={() => showDropdown = true} on:mouseout={() => showDropdown = false}>
            <span class="text-dark-1 cursor-pointer">{$user.username}</span>
            <div class={showDropdown ? "dropdown-wrapper" : "hidden"}>
                <button 
                    class="w-full text-left px-4 py-2 text-dark-9 hover:text-accent-5" 
                    on:click={signout}
                >
                    Sign out
                </button>
            </div>
        </div>
    {/if}
</div>
{#if state && !$jwt}
<div class="fixed w-screen h-screen flex justify-center items-center bg-dark-9 z-10 font-sans">
    <svg 
        class="fixed bt-close cursor-pointer" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        on:click={() => state = ""}
    >
        <path d="M6 18L18 6M6 6L18 18" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div class="flex flex-col">
        <input class="mb-4 w-64 shadow-md" bind:value={username} type="text" placeholder="username" spellcheck="false"/>
        <input class="mb-6 w-64 shadow-md" bind:value={password} type="password" placeholder="password" spellcheck="false"/>
        <button class="bt w-64" on:click={state === "Login" ? login : register}>
            {state}
        </button>
    </div>
</div>
{/if}

<script>
    import axios from "axios";
    import cookie from "js-cookie";
    import { jwt, user } from "../stores.js";

    let state;
    let showDropdown = false;
    let username = "";
    let password = "";

    const baseUrl = "http://localhost:4040";

    async function login() {
        const url = `${baseUrl}/login`;
        const data = { username, password };
        const { data: token } = await axios.post(url, data)
        $jwt = token;
        showDropdown = false;
    }

    async function register() {
        const url = `${baseUrl}/register`;
        const data = { username, password };
        const { data: token } = await axios.post(url, data)
        $jwt = token;
        showDropdown = false;
    }

    async function signout() {
        $jwt = "";
    }
</script>

<style type="text/postcss">
.bt-close {
    top: 72px;
    right: 30px;
}

.dropdown-wrapper {
    @apply w-32 pt-2 bg-dark-5 absolute right-0 rounded-lg shadow-xl py-2;
}
</style>
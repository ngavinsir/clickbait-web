{#if $jwt}
    <div class="fixed top-0 bg-dark-7 w-screen p-4 flex justify-end z-20 shadow-2xl">
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
    </div>
{:else if state}
    <div class="fixed w-screen h-screen flex justify-center items-center bg-dark-9 z-10 font-sans">
        <div class="flex flex-col">
            <input class="mb-4 w-64 shadow-md" bind:value={username} type="text" placeholder="username" spellcheck="false"/>
            <input class="mb-6 w-64 shadow-md" bind:value={password} type="password" placeholder="password" spellcheck="false"/>
            <button class="bt w-64" on:click={isLogin ? login : register}>
                {state}
            </button>
            <span class="text-center mt-4 text-white font-semibold text-lg" >
                or 
                <span class="text-accent-5 cursor-pointer hover:underline" on:click={() => state = isLogin ? "Register" : "Login"}>
                    {isLogin ? "Register" : "Login"}
                </span>
            </span>
        </div>
    </div>
{/if}

<script>
    import axios from "axios";
    import cookie from "js-cookie";
    import { jwt, user } from "../stores.js";

    let state = "Register";
    let showDropdown = false;
    let username = "";
    let password = "";

    const baseUrl = "http://localhost:4040";

    $: isLogin = state === "Login"

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
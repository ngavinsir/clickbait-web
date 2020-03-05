<div class="fixed top-0 bg-dark-8 w-screen p-4 flex justify-end z-20">
    {#if !$jwt}
        <button class="mr-4 text-dark-2 hover:text-dark-1 outline-none" on:click={() => state = "Login"}>Login</button>
        <button class="text-dark-2 hover:text-dark-1 outline-none" on:click={() => state = "Register"}>Register</button>
    {:else}
        <span class="text-dark-1 cursor-default">{$user.username}</span>
    {/if}
</div>
{#if state && !$jwt}
<div class="fixed w-screen h-screen flex justify-center items-center bg-dark-9 z-10 font-sans">
    <span class="fixed text-white bt-close cursor-pointer font-bold" on:click={() => state = ""}>X</span>
    <div class="flex flex-col">
        <input class="mb-4 w-64 shadow-md" bind:value={username} type="text" placeholder="username" spellcheck="false"/>
        <input class="mb-6 w-64 shadow-md" bind:value={password} type="password" placeholder="password" spellcheck="false"/>
        <button class="bt w-64" on:click={login}>
            {state}
        </button>
    </div>
</div>
{/if}

<script>
    import axios from "axios";
    import cookie from "js-cookie";
    import { jwt, user } from "./stores.js";

    let state;
    let username = "";
    let password = "";

    $: console.log($jwt);
    $: console.log($user);

    const baseUrl = "http://localhost:4040";

    async function login() {
        const url = `${baseUrl}/login`;
        const data = { username, password };
        const { data: token } = await axios.post(url, data)
        $jwt = token;
    }
</script>

<style>
.bt-close {
    top: 72px;
    right: 36px;
}
</style>
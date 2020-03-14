{#if $jwt}
    <div class="fixed top-0 bg-dark-8 border-b-2 border-dark-7 w-screen p-4 px-6 flex items-center z-20 shadow-2xl">
        <span 
            class={$type == "clickbait" ? "menu bg-accent-3 text-dark-9" : "menu"}
            on:click={() => $type = "clickbait"}
        >
            Clickbait
        </span>
        <span 
            class={$type == "summary" ? "menu bg-accent-3 text-dark-9 ml-4" : "menu ml-4"}
            on:click={() => $type = "summary"}
        >
            Summary
        </span>
        <div class="relative ml-auto" on:mouseover={() => showDropdown = true} on:mouseout={() => showDropdown = false}>
            <span class="text-gray-100 cursor-pointer">{$user.username}</span>
            <div class={showDropdown ? "dropdown-wrapper" : "hidden"}>
                <button 
                    class="w-full text-left px-4 py-2 text-dark-9 hover:text-accent-5 flex items-center" 
                    on:click={signout}
                >
                    Sign out
                </button>
            </div>
        </div>
    </div>
{:else if state}
    <div class="fixed inset-0 w-screen h-screen flex justify-center items-center bg-dark-9 z-10 font-sans">
        <div class="flex flex-col items-center justify-center">
            {#if errorMessage}
                <span class="mb-2 text-red-500 text-center max-w-xl">{errorMessage}</span>
            {/if}
            <input 
                class="mb-4 w-64 shadow-md" 
                bind:value={username} type="text" 
                placeholder="username" 
                spellcheck="false"
                on:keydown={handleKeydown}
            />
            <input 
                class="mb-6 w-64 shadow-md" 
                bind:value={password} 
                type="password" 
                placeholder="password"
                spellcheck="false"
                on:keydown={handleKeydown}
            />
            <Bt 
                customClass="w-64" 
                on:click={isLogin ? login : register}
                spinnerColor="#000"
                {loading}
                disabled={loading}
                value={state}
            />
            <span class="text-center mt-4 text-white font-semibold text-lg" >
                or 
                <span 
                    class="text-accent-5 cursor-pointer hover:underline" 
                    on:click={() => state = isLogin ? "Register" : "Login"}
                >
                    {isLogin ? "Register" : "Login"}
                </span>
            </span>
        </div>
    </div>
{/if}

<script>
    import axios from "axios";
    import cookie from "js-cookie";
    import Bt from "./Button.svelte";
    import { jwt, user, type } from "../stores.js";
    import config from "../config.js";

    let state = "Login";
    let showDropdown = false;
    let showTypeDropdown = false;
    let errorMessage = "";
    let loading = false;
    let username = "";
    let password = "";

    $: isLogin = state === "Login"

    async function login() {
        loading = true;
        const url = `${config.baseUrl}/login`;
        const data = { username, password };
        try {
            const { data: token, data: { error } } = await axios.post(url, data)
            if(!error) {
                $jwt = token;
                errorMessage = '';
                showDropdown = false;
            }
            else errorMessage = error;
        } catch (e) {
            console.log(e);
            // handle login error
        } finally {
            loading = false;
        }
    }

    async function register() {
        loading = true;
        const url = `${config.baseUrl}/register`;
        const data = { username, password };
        try {
            const { data: token, data: { error } } = await axios.post(url, data)
            if(!error) {
                $jwt = token;
                errorMessage = '';
                showDropdown = false;
            }
            else errorMessage = error;
        } catch (e) {
            console.log(e);
            // handle register error
        } finally {
            loading = false;
        }
    }

    async function signout() {
        $jwt = "";
    }

    async function handleKeydown(event) {
        if(event.keyCode === 13) {
            if (isLogin) await login();
            else await register();
        }
    }
</script>

<style type="text/postcss">
.dropdown-wrapper {
    @apply w-32 pt-2 bg-dark-5 absolute right-0 rounded-lg shadow-xl py-2;
}
</style>
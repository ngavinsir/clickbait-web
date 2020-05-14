{#if $jwt}
    <div class="fixed top-0 bg-dark-8 border-b-2 border-dark-7 w-screen p-4 px-6 flex items-center z-20 shadow-2xl">
        <span 
            class={$type == "clickbait" ? "menu bg-accent-3 text-dark-9" : "menu"}
            on:click={() => {
                scrollY = 0;
                $type = "clickbait";
            }}
        >
            Clickbait
        </span>
        <span 
            class={$type == "summary" ? "menu bg-accent-3 text-dark-9 ml-4" : "menu ml-4"}
            on:click={() => {
                scrollY = 0;
                $type = "summary"
            }}
        >
            Summary
        </span>
        <div class="relative ml-auto" on:mouseover={() => showDropdown = true} on:mouseout={() => showDropdown = false}>
            <span class="text-gray-100 cursor-pointer">{$user.name}</span>
            <div class={showDropdown ? "dropdown-wrapper" : "hidden"}>
                <button 
                    class="w-full text-left px-4 py-2 text-white hover:underline flex items-center" 
                    on:click={signout}
                >
                    Sign out
                </button>
            </div>
        </div>
    </div>
{:else if state}
    <div class="fixed inset-0 w-screen h-screen flex justify-center items-center bg-dark-9 z-10 font-sans">
        <div class="flex flex-col items-center justify-center w-3/5 max-w-xs">
            {#if errorMessage}
                <span class="mb-2 text-red-500 text-center max-w-xl">{errorMessage}</span>
            {/if}
            <form class="text-white w-full flex flex-col items-center">
                {#if state === "Login"}
                    <label class="flex flex-col w-full">
                        Email
                        <input
                            id="email"
                            class="mb-4 shadow-md" 
                            bind:value={loginForm.email} type="text" 
                            placeholder="email..." 
                            spellcheck="false"
                            on:keydown={handleKeydown}
                        />
                    </label>
                    <label class="flex flex-col w-full">
                        Password
                        <input 
                            class="mb-6 shadow-md" 
                            bind:value={loginForm.password} 
                            type="password" 
                            placeholder="password..."
                            spellcheck="false"
                            on:keydown={handleKeydown}
                        />
                    </label>
                {:else if state === "Register"}
                    <label class="flex flex-col w-full">
                        Name
                        <input
                            class="mb-4 shadow-md" 
                            bind:value={registerForm.name} type="text" 
                            placeholder="name..." 
                            spellcheck="false"
                            on:keydown={handleKeydown}
                        />
                    </label>
                    <label class="flex flex-col w-full">
                        Email
                        <input
                            class="mb-4 shadow-md" 
                            bind:value={registerForm.email} type="text" 
                            placeholder="email..." 
                            spellcheck="false"
                            on:keydown={handleKeydown}
                        />
                    </label>
                    <label class="flex flex-col w-full">
                        Age
                        <input 
                            class="mb-6 shadow-md" 
                            bind:value={registerForm.age} 
                            type="number" 
                            placeholder="age..."
                            spellcheck="false"
                            on:keydown={handleKeydown}
                        />
                    </label>
                    <span class="self-start">Gender</span>
                    <div class="flex flex-row mb-6 w-full">
                        <label class={genderClass(false, registerForm.is_male) + " mr-2"} for="female">
                            <input id="female" hidden type=radio bind:group={registerForm.is_male} value={false}>
                            Female
                        </label>
                        <label class={genderClass(true, registerForm.is_male)} for="male">
                            <input id="male" hidden type=radio bind:group={registerForm.is_male} value={true}>
                            Male
                        </label>
                    </div>
                    <label class="flex flex-col w-full">
                        Password
                        <input 
                            class="mb-6 shadow-md" 
                            bind:value={registerForm.password} 
                            type="password" 
                            placeholder="password..."
                            spellcheck="false"
                            on:keydown={handleKeydown}
                        />
                    </label>
                    <label class="flex flex-col w-full">
                        Confirm Password
                        <input 
                            class="mb-6 shadow-md" 
                            bind:value={registerForm.confirmPassword} 
                            type="password" 
                            placeholder="confirm password..."
                            spellcheck="false"
                            on:keydown={handleKeydown}
                        />
                    </label>
                {/if}
            </form>
            <Bt
                bind:this={bt}
                customClass="w-full font-base" 
                on:click={isLogin ? login : register}
                {loading}
                spinnerColor="#000"
                disabled={loading}
                value={state}
            />
            <span class="text-center mt-4 text-white font-base text-lg w-full" >
                or 
                <span 
                    class="text-accent-3 cursor-pointer hover:underline" 
                    on:click={() => {
                        state = isLogin ? "Register" : "Login"
                        errorMessage = ""
                    }}
                >
                    {isLogin ? "Register" : "Login"}
                </span>
            </span>
        </div>
    </div>
{/if}

<svelte:window bind:scrollY={scrollY}/>

<script>
    import axios from "axios";
    import cookie from "js-cookie";
    import Bt from "./Button.svelte";
    import { jwt, user, type } from "../stores.js";
    import config from "../config.js";

    let loginForm = {
        email: "",
        password: ""
    }
    let registerForm = {
        email: "",
        password: "",
        confirmPassword: "",
        age: null,
        is_male: false,
        name: ""
    }

    let state = "Login";
    let showDropdown = false;
    let errorMessage = "";
    let loading = false;
    let bt;
    let scrollY;

    $: isLogin = state === "Login"

    async function login() {
        loading = true;
        const url = `${config.baseUrl}/login`;
        try {
            const { data: token, data: { error } } = await axios.post(url, loginForm)
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
        if(registerForm.password !== registerForm.confirmPassword) {
            errorMessage = "passwords are not the same"
            return
        }
        loading = true;
        const url = `${config.baseUrl}/register`;
        try {
            const { data: token, data: { error } } = await axios.post(url, registerForm)
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

    function genderClass(male, selected) {
        const bg = male == selected ? "bg-accent-3" : "bg-dark-7";
        const textBg = male == selected ? "text-dark-9" : "text-dark-2";
        return `flex flex-1 justify-center items-center p-2 ${bg} ${textBg} font-semibold text-base leading-tight align-middle rounded-lg cursor-pointer`
    }
</script>

<style type="text/postcss">
.dropdown-wrapper {
    @apply w-32 pt-2 bg-dark-7 absolute right-0 rounded-lg shadow-xl py-2;
}
</style>
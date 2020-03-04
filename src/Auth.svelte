<div class="navbar">
    {#if !$jwt}
        <button on:click={() => state = "Login"}>Login</button>
        <button on:click={() => state = "Register"}>Register</button>
    {:else}
        <span>{$user.user_id}</span>
    {/if}
</div>
{#if state && !{$jwt}}
<div class="auth-wrapper">
    <div class="auth-box">
        <input bind:value={username} type="text" placeholder="username" spellcheck="false"/>
        <input bind:value={password} type="password" placeholder="password" spellcheck="false"/>
        <button on:click={login}>{state}</button>
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

<style lang="scss">
.navbar {
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
    background-color: $background-8;
    display: flex;
    justify-content: flex-end;
    z-index: 2;

    > * {
        margin: 12px;
        background-color: transparent;
        border: none;
        font-family: "Roboto", "Helvetica", sans-serif !important;
        font-size: 16px;
        color: $background-5;
        font-weight: 500;
        cursor: pointer;
        outline: none;

        &:hover {
            color: $background-3;
        }
    }
}

.auth-wrapper {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: $background-9;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    .auth-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px 48px;
        font-family: "Roboto", "Helvetica", sans-serif;

        h1 {
            margin-top: 0;
            color: $background-1;
            font-weight: 400;
        }

        input {
            border: none;
            padding: 12px 6px;
            font-size: 16px;
            width: 60vw;
            max-width: 400px;
            margin-bottom: 24px;
            background-color: $background-7;
            outline: none;
            color: $background-3;
        }

        button {
            width: 100%;
            border: none;
            outline: none;
            background-color: $accent;
            padding: 12px;
            font-size: 16px;
            font-weight: 600;
            color: $background-8;
            cursor: pointer;
        }
    }
}
</style>
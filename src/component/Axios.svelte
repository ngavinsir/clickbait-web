<script>
    import { setContext } from 'svelte';
    import { jwt } from "../stores.js";
    import axios from "axios";
    import config from "../config.js";

    $: instance.defaults.headers.common['Authorization'] = `Bearer ${$jwt}`;

    const instance = axios.create({
            baseURL: config.baseUrl,
            headers: {
                Authorization: `Bearer ${$jwt}`
	    },
	    timeout: 2000
        });
    
    setContext("axios", {
        axios: instance
    });
</script>

<slot></slot>

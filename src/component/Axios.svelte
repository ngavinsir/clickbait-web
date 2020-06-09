<script>
    import { setContext, getContext } from 'svelte';
    import { jwt } from "../stores.js";
    import axios from "axios";
    import config from "../config.js";
    
    const { show: showNotification } = getContext("notification");

    $: instance.defaults.headers['Authorization'] = `Bearer ${$jwt}`;

    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        Authorization: `Bearer ${$jwt}`
	    },
      timeout: 3000
    });
    instance.interceptors.response.use(
      config => {
        return config;
      },
      (error) => {
        if (error.code === 'ECONNABORTED') {
          showNotification("Tidak dapat menghubungi server.", 3000);
        }
        return Promise.reject(error);
      },
    );
    
    setContext("axios", {
        axios: instance
    });
</script>

<slot></slot>

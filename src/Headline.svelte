<script>
    import axios from "axios";
    import { jwt } from "./stores.js";

    let headline = {};

    $: getHeadline($jwt);

    const baseUrl = "http://localhost:4040";

    async function getHeadline(jwt) {
        if(!jwt) return;
        const url = `${baseUrl}/headline/random`;
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        headline = data;
    }

</script>

<span>{headline.value}</span>

<style>
span {
    position: fixed;
    top: 100px;
    color: white;
    font-size: 36px;
}
</style>
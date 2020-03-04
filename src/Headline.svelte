<script>
    import axios from "axios";

    const baseUrl = "http://localhost:4040";

    async function getHeadline() {
        const url = `${baseUrl}/headline/random`;
        const { data: headline } = await axios.get(url)
    }

</script>
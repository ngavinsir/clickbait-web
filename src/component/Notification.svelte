{#if showNotification}
  <div transition:fly={{y:200, duration:500}} class="fixed bottom-0 z-30 p-4 mb-20 rounded-lg notification bg-accent-1">
    <span class="text-center text-black">{notification}</span>
  </div>
{/if}
<slot></slot>

<script>
  import { setContext } from 'svelte';
  import { fly } from "svelte/transition";
  
  let notification = "";
  let showNotification = false;

  const show = (notificationText, duration) => {
    if(showNotification) return;
    notification = notificationText;
    showNotification = true;
    setTimeout(() => {
      showNotification = false;
    }, duration);
  }

  setContext('notification', { show })
</script>

<style type="text/postcss">
  .notification {
    left: 50%;
    transform: translateX(-50%);
  }
</style>


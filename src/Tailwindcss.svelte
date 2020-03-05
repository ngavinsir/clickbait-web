<style type="text/postcss" global>
  @tailwind base;

  input {
    @apply p-2 bg-dark-1 rounded-md text-dark-9 outline-none;
  }

  input::placeholder {
    @apply text-dark-5;
  }

  .bt {
    @apply bg-accent-5 rounded-lg py-2 text-dark-9 font-semibold text-base; 
    @apply leading-tight align-middle shadow-md outline-none h-auto;
  }

  .bt:hover:enabled {
    @apply bg-accent-7;
  }

  .bt:focus {
    @apply outline-none;
  }

  .bt:disabled {
    opacity: .2;
    cursor: default;
  }

  .white {
    @apply bg-white;
  }

  .white:hover:enabled {
    @apply bg-dark-1;
  }

  @screen sm {
    .bt {
      @apply text-lg leading-none;
    }
  }

  @tailwind components;
  @tailwind utilities;
</style>
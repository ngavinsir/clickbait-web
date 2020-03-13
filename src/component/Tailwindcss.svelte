<style type="text/postcss" global>
  @tailwind base;

  input {
    @apply p-2 bg-dark-1 rounded-md text-dark-9 outline-none;
  }

  input::placeholder {
    @apply text-dark-5;
  }

  .bt {
    @apply bg-accent-3 rounded-lg py-2 text-dark-9 font-semibold text-base; 
    @apply leading-tight align-middle outline-none h-auto;
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

  .red {
    @apply bg-red-300 text-red-900;
  }

  .red:hover:enabled {
    @apply bg-red-400;
  }

  .white {
    @apply bg-gray-300;
  }

  .white:hover:enabled {
    @apply bg-dark-1;
  }

  .gray {
    @apply bg-dark-7 text-gray-100;
  }

  .gray:hover:enabled {
    @apply bg-dark-8;
  }

  .menu {
    @apply rounded-lg text-accent-3 font-semibold cursor-pointer py-2 px-4 inline-block leading-none;
  }

  .sentence {
    @apply flex mb-4 rounded-lg bg-dark-7 p-4 w-full cursor-pointer shadow-2xl;
  }
  .sentence:hover {
      @apply bg-dark-8;
  }
  .sentence:last-child {
      @apply mb-0;
  }

  @screen sm {
    .bt {
      @apply text-lg;
    }
  }

  @tailwind components;
  @tailwind utilities;
</style>
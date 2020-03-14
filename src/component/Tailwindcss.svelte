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
    opacity: .7;
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
    @apply bg-dark-6 text-gray-100;
  }

  .gray:hover:enabled {
    @apply bg-dark-7;
  }

  .menu {
    @apply rounded-lg text-accent-3 font-semibold cursor-pointer py-2 px-4 inline-block leading-none;
  }

  .numbering {
    @apply w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full bg-accent-7 text-white flex-shrink-0;
  }

  .sentence {
    @apply flex mb-4 rounded-lg bg-dark-7 p-2 w-full cursor-pointer shadow-2xl;
  }
  .sentence:hover {
      @apply bg-dark-8;
  }
  .sentence:last-child {
      @apply mb-0;
  }

  .footer {
    @apply fixed bottom-0 border-t-2 border-dark-7 bg-dark-8 w-screen py-2 px-4 flex items-center justify-end z-20;
  }

  @screen sm {
    .bt {
      @apply text-lg;
    }
    .sentence {
      @apply p-4;
    }
    .footer {
      @apply py-4 px-6;
    }
  }

  @tailwind components;
  @tailwind utilities;
</style>
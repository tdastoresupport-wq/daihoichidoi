<script lang="ts">
  let { name = 'gift', size = 40 }: { name?: string; size?: number } = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 48 48"
  fill="none"
  stroke="currentColor"
  stroke-width="3"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  {#if name === 'gift'}
    <rect x="8" y="18" width="32" height="24" rx="3" fill="currentColor" opacity="0.25" />
    <rect x="8" y="18" width="32" height="24" rx="3" />
    <line x1="24" y1="18" x2="24" y2="42" />
    <rect x="5" y="10" width="38" height="8" rx="2" />
    <path d="M24 10c-6 0-9-2-9-5 0-2 2-3 4-3 3 0 4 4 5 8zm0 0c6 0 9-2 9-5 0-2-2-3-4-3-3 0-4 4-5 8z" />
  {:else if name === 'ai'}
    <rect x="10" y="10" width="28" height="28" rx="6" />
    <circle cx="19" cy="22" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="29" cy="22" r="2.4" fill="currentColor" stroke="none" />
    <path d="M19 30c2 2 4 2 5 0s3-2 5 0" />
    <line x1="24" y1="2" x2="24" y2="10" />
    <circle cx="24" cy="2" r="1.6" fill="currentColor" stroke="none" />
  {:else if name === 'abc'}
    <path d="M8 36V12a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v14a8 8 0 0 1-8 8H18l-10 6z" />
    <path d="M15 24l6-8 6 8M17 21h8" />
  {:else if name === 'team'}
    <circle cx="17" cy="17" r="5" />
    <circle cx="32" cy="19" r="4" />
    <path d="M6 38c0-6 5-10 11-10s11 4 11 10" />
    <path d="M30 30c1-3 4-5 7-5 4 0 7 3 7 6" />
  {:else if name === 'leaf'}
    <path d="M10 38C10 22 22 10 40 8c-2 18-14 30-30 30z" />
    <path d="M10 38c6-10 14-18 24-24" />
  {:else if name === 'heart'}
    <path
      d="M24 40C14 32 6 25 6 17.5 6 12.5 10 9 14.5 9c4 0 7.5 2.5 9.5 6.5 2-4 5.5-6.5 9.5-6.5C38 9 42 12.5 42 17.5 42 25 34 32 24 40z"
    />
  {:else if name === 'note'}
    <circle cx="15" cy="34" r="5" fill="currentColor" stroke="none" />
    <circle cx="35" cy="30" r="5" fill="currentColor" stroke="none" />
    <path d="M20 34V10l20-4v24" />
  {/if}
</svg>

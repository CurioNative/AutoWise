import type { SVGProps } from 'react';

export function AutoWiseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 8.5v-1" />
      <path d="M12 16.5v-1" />
      <path d="m14.5 10.5-.87.5" />
      <path d="m10.37 14-.87.5" />
      <path d="m14.5 13.5-.87-.5" />
      <path d="m10.37 10-.87-.5" />
    </svg>
  );
}

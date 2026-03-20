# Resources


## What is babel?

[Babel](https://babeljs.io/docs/)

## Tailwind
CSS Framework that speeds up development by writing utility classes directly in code.

## Alternatives to Tailwind

### CSS Modules
Modules allow to scope a component by automatically creating unique class names to not worry about style collisions

## CLSX
CLSX is a library that allows for toggling of classnames to allow conditional styles.

```
import clsx from 'clsx';
 
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```

## Fonts and Images

Optimizing fonts is important since none optimized implementation creates a situation in which the text is loaded with base text first and then the font is added.

[Cumulative Layout Shift](https://vercel.com/blog/how-core-web-vitals-affect-seo)

It's better to load fonts at build time.

When loading an image in basic HTML you would need to add the following optimizations

- Ensure your image is responsive on different screen sizes.
- Specify image sizes for different devices.
- Prevent layout shift as the images load.
- Lazy load images that are outside the user's viewport.

In image
https://nextjs.org/learn/dashboard-app/optimizing-fonts-images

It is reccomended to set the image ratio to avoid shift

## Pages and Layout

The next.js layout router uses folder systems for nested pages.
Each folder requires a base page.tsx to export the component?

## Page navigation
The Link component allows you to do client side navigation

Next js also offers a hook called usePathname()

To use it in nav-links you have to make it client component with the 'use client' directive., since usePathname is a hook.

Next.js loads application data based on routes. Thus if one page fails the rest of the application can keep going.

## What is CLSX

https://www.npmjs.com/package/clsx

In short terms a library to allow things like conditionals in CSS, useful in tandem with Tailwind.

## Fetching Data
Options to fetch data

- API Layer
  - Intermediate layer between app and DB.
  - Normally used if using an external API of fetching data from the client.
  - Running on server
- DB Queries
  - When creating your API endpoints, you need logic to interact with DB.
  - In React components the API can be skipped.

Server components can support promises and the async task of requests

Request waterfalls: A sequence of network requests that depend on previos requests. In the case of data fetching each request can only begin after the previous one has returned data.

## Parallel data fetching

A common way to avoid this is initiate all request at the same time.

A way to do this is Promise.all() in js or Promise.allSettled()


## Static and Dynamic Rendering

### Static Rendering
Data fetching and rendering happens on the server at build time (or deployment) and just once.
Overall static rendering yields faster websites, reduces server load and improves Search Engine visibility.

## Current Tut Page


https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering

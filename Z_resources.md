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
Also benefits SEO since web crawlers can easily index the content of the page.

Static rendering is useful for UI with no data or data that is shared between users. Pages such as blog posts, marketing pages, documentation, etc.
The opposite of a good place to use would be things like dashboards, user profiles, etc.

### Dynamic Rendering
Content is rendered on the server for each request:

This allows for
1. Real time data
2. User specific content
3. Request specific content like cookies, headers, etc.

An important thing to note is that with dynamic rendering the application is only as fast as the slowest request, so if you have a lot of data fetching or a slow API it can lead to a bad user experience.

### Streaming
Streaming is a data transfer technique that allows breaking down a route into smaller "chunks" and progressively stream them to the client as the server gets them ready.

This is useful to prevent slow data requests from blocking the entire page.

React's component model and streaming are a good fit since components can be rendered and streamed independently.

In Next this can be achieved with:
1. At page level with loading.tsx components
2. At component level with Suspense and React's streaming capabilities.

Loading.tsx is a special file that creates a fallback UI to show instead of the page while the server is preparing the page to be sent to the client. This allows to show a loading state while the server is preparing the page.

Static components of the page will still be shown during loading, and the dynamic components will be shown once they are ready. This is called interruptable navigation since the user can interact with the page while it's loading.

#### Loading Skeletons
A loading skeleton is a simplified version of the UI. Any UI added to loading.tsx will be shown as part of the static file.

It is important to note loading skeleton is applied to all pages below the page that has the loading.tsx file. So if you have a loading.tsx file in the root of your pages folder, it will be applied to all pages in the application.

This can be fixed with [Route Groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups). These allow to organize files into logical groups without affecting path structure. The name in parenthesis is ignored in the URL structure, so you can have a loading skeleton for a specific group of pages.

So insteado of /dashboard/(overview)/page.tsx you will have just /dashboard/page.tsx and the loading skeleton will only be applied to the pages in the overview group.

The name overview is just an example, you can name the group whatever you want.

#### Streaming a component
Suspense allows to defer parts of an application until a condition is met. Dynamic components can be wrapped in Suspense and a fallback can be provided to show while the component is being loaded.

Normally you need to have the actual fetch logic inside the component.

#### Grouping Components
To avoid a popping effect when the component is loaded, you can wrap the component in a div and apply styles to it. This way the component will take up space while it's loading and prevent layout shift.

For example a Card components can be grouped using a wrapper component.

Overall, it is a good idea to move data fetches down to the component level to take advantage of streaming , and then wrap the component in Suspense to show a loading state while the component is being loaded.

## Search and Pagination

Search with URL parameters has the following benefits:
1. Bookmarkable and sharable URLs: Users can bookmark or share specific search results by sharing the URL, which includes the search query as a parameter.
2. Server-side rendering: URL parameters can be consumed on the server to render the initial state, making easier to handle server rendering.
3. Analytics and tracking: Easier client tracking without additional client side logic to track search queries.

Hooks used:
- useSearchParams: To read and modify the URL parameters.
- usePathname: Allows reading the current URL's pathname.
- useRouter: Enables navigation between routes within the client components programmatically.

It is important to note that useSearchParams is a hook and thus used in client components. While searchParams can be read in server components, they cannot be modified. This is because server components are rendered on the server and do not have access to the browser's URL.

### Debouncing Search Input
Debouncing is a practice that limits the rate at which a function can fire. In the case of an input field it allows to delay the execution of a function until a certain amount of time has passed since the last time it was invoked. This is useful to prevent excessive API calls while the user is typing.

How it works:
- Trigger event: A timer begins once the trigger event occurs,  like typing in a search input field.
- Wait: If a new event occurs before the timer expires, the timer is reset.
- Execute: If the timer expires without any new events, the function is executed.

Useful library 

```console
  pnpm i use-debounce
```

### Pagination
Adding pagination to a page allows to split content into multiple pages, improving performance and user experience. It is especially useful when dealing with large datasets.

## What are Hooks?

[React Hooks](https://react.dev/reference/react/hooks)
[Hook Examples](https://www.w3schools.com/react/react_hooks.asp)
[Other explanations](https://www.reddit.com/r/react/comments/11ftu0p/what_are_hooks/)

Hooks are functions that let you "hook" or add React features to functional components. They allow you to use state and other React features without writing a class component. They are normally simple functions that start with the word "use" and can be used to manage state, perform side effects, access context, and more.

Some examples are:
- useState: Allows you to add state to a functional component.
- useEffect: Allows you to perform side effects in function components, such as fetching data, updating the DOM and timers. Essentially bring a functional component to life by allowing it to have state and lifecycle methods.
- useContext: Allows you to access the context value from a parent component without having to pass it down through props.
  - This one is specially useful for things like theme, user authentication, etc. where you want to share data across the entire application without having to pass it down through props.
- useRef: Allows persistent values that survive re-renders without causing a re-render when they change. Commonly used to access DOM elements directly or to store mutable values that don't trigger a re-render when updated.

TODO: Make more extensive list of hooks and their use cases.


## Client and Server Components
Client components are rendered on the client side and can use hooks, state, and other React features. They are useful for interactive components that require user input or need to manage state. Components like:
- Forms: Components that require user input, such as a login form or a contact form,
- Interactive UI: Components that require user interaction, such as a dropdown menu or a modal, can be rendered on the client to allow for interactivity and state management.
- Real-time updates: Components that need to update in real-time, such as a chat application
- User-specific content: Components that display user-specific content, such as a user profile or a dashboard, can be rendered on the client to allow for personalized experiences.

Server components are rendered on the server side and cannot use hooks or state. They are useful for components that don't require interactivity and can be rendered on the server for better performance and SEO. Components like:
- Static content: Components that display static content, such as a blog post or a product description, can be rendered on the server to improve performance and SEO.
- Data fetching: Components that fetch data from an API can be rendered on the server to improve performance and reduce the amount of JavaScript sent to the client.
- Layout components: Components that define the layout of a page, such as a header or footer, can be rendered on the server to improve performance and reduce the amount of JavaScript sent to the client.
- Non-interactive UI: Components that don't require user interaction, such as a loading spinner or a placeholder, can be rendered on the server to improve performance and reduce the amount of JavaScript sent to the client.

The basic question would be: Does the component require interactivity or state management? If yes, it should be a client component. If not, it can be a server component.

## Mutating Data

### Server Actions
React Server Actions allow to run asynchronous code on the server. Instead of having a client component that calls an API route, you can have asynchronous functions that execute on the server and can be called from client or server components. This allows to avoid the need for an API layer and can simplify the architecture of the application.

These also have various security features like encrypted closures, input check and error message hashing.

The action attribute in a form component can be used to invoke actions. This will return a [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object that can be used to get the values.

Another benefit is that it allows a user to interact with form elements even if the JavaScript is still loading.

### Type Validation and Coercion
Type validation is the process of ensuring the data is being passed to a function is of the expected type. This can be done with libraries like [Zod](https://zod.dev/) or Yup.

### Revalidating and redirecting
Next.js has a client side router cache that store  the route segments in the users browser for a time.
This cache ensures that users quickly navidate between routes while reducing requests to the server.

revalidatePath helps clear the cache for a specific path, allowing users to see the updated data without having to refresh the page.

### UUIDs or Auto-incrementing Keys
UUIDs are unique identifiers that are generated using a combination of random numbers and the current timestamp. They are useful for ensuring uniqueness across distributed systems and can be generated on the client or server side.

## [Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)
Dynamic routes are a way to create pages that handle dynamic content based on the URL.

You create them by wrapping the page name in brackets. 

## [Breadcrumbs](https://developer.mozilla.org/en-US/docs/Glossary/Breadcrumb)
A breadcrums is a navigational aid that is placed between a header and the site's content, displaying the heirarchy of the current page in relation to the rest of the site. It allows users to easily navigate back to previous pages or sections of the site.

They allow for a user to be aware of their location within a website. Thus, allowing a user to go back to previous pages without having to use the browser's back button. They also provide a way for users to quickly navigate to higher-level pages in the site's hierarchy.

## Current Tut Page


https://nextjs.org/learn/dashboard-app/error-handling
Building a portfolio is something every developer eventually faces. For me, it was more than just a way to showcase my work — it was an opportunity to **apply modern tools, experiment with performance optimizations, and support multiple languages** for a broader audience. I had already built simpler portfolios in the past, but they often felt incomplete, inconsistent, or limited.  

This time, I wanted to create something that wasn’t just a static page, but a **scalable and maintainable project** that I could improve over time. In this post, I’ll share the journey of creating my portfolio with **Next.js**, **Tailwind CSS**, and **i18n**, along with the lessons I learned and the improvements I made over previous attempts.

## Why Next.js?

I chose **Next.js** because it brings together the flexibility of React with a set of built-in features that make development smoother and websites faster. One of the biggest advantages is **file-based routing**, which keeps the project structure clean and intuitive. Instead of manually configuring routes, I could simply create a new file inside the `app` directory and Next.js would handle the rest.  

Another reason was the balance between **Server-Side Rendering (SSR)** and **Static Site Generation (SSG)**. These features allowed me to deliver content that loads quickly and remains SEO-friendly, which is essential for a personal portfolio.  

On top of that, the ability to create **API Routes** without a separate backend gave me the freedom to extend the project if I ever wanted to add features like form handling, authentication, or server-side logic. Together, these tools made Next.js the perfect foundation for a **modern, performant, and scalable portfolio**.

## Styling with Tailwind CSS

When it came to styling, I didn’t want to go back to the days of writing custom CSS that quickly grew unmanageable. That’s where **Tailwind CSS** came in. Its **utility-first approach** meant I could style components directly in my JSX without switching back and forth between markup and CSS files.  

Here’s a simplified version of my **hero section** styled with Tailwind:  

```tsx
export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <h1 className="text-5xl font-bold mb-4">Hello, My name is... 👋</h1>
      <p className="text-lg max-w-xl">
        Welcome to my portfolio! I build modern web applications with Next.js, Tailwind, and more.
      </p>
      <a
        href="#projects"
        className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        View My Work
      </a>
    </section>
  );
}
```

## Multilingual Support with i18n

One of the most important improvements over my previous portfolios was adding internationalization (i18n). In the past, my portfolio was English-only, which limited who could engage with it. This time, I wanted to make it accessible to a wider audience.

I organized translations inside the locales/ directory, with JSON files for each language (e.g., en.json, es.json). Then, I used the `useTranslations` hook to access the translations in my components. Here’s a simplified example:

```json
{
  "greeting": "Hi, I’m Yplam 👋",
  "welcome": "Welcome to my portfolio! I build modern web applications with Next.js, Tailwind, and more.",
  "viewWork": "View My Work"
}
```

## Improvements Over Previous Portfolios

Looking back, my earlier portfolio projects had a lot of issues. **Adding new pages was tedious, styling was inconsistent, and everything was hard to scale**. The code often turned into a mix of quick fixes that didn’t age well, and because the sites were in English only, I wasn’t reaching as many people as I wanted.

This new stack solved all those problems. Adding a new blog post is now as simple as writing a Markdown file inside the markdown/ directory. Styling is consistent and easy to manage with Tailwind’s design system. And with i18n in place, the site is no longer restricted to just one language.

The result is a portfolio that feels modern, is easy to maintain, and will be much easier to expand as I continue to grow as a developer.

## Final Thoughts

This project was more than just a redesign. **It was a chance to apply what I’ve learned about modern frontend development and create something I can be proud of**. Working with Next.js, Tailwind, and i18n gave me not only the technical benefits of performance, scalability, and accessibility, but also a deeper appreciation for how these tools can complement each other.

- If you’re thinking about building or rebuilding your portfolio, I highly recommend this stack:
- Next.js for performance and flexibility
- Tailwind CSS for rapid styling and responsive design
- i18n for multilingual support and inclusivity

You can check out the live version of my portfolio here: 👉🏻 [yplam.netlify.app](https://yplam.netlify.app)

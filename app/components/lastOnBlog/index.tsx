"use client";
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
import { useRouter } from 'next/navigation';
import { use } from 'react';

export const LatestOnBlog = () => {

  const { t, i18n } = useTranslation();

  const router = useRouter();

  type SearchResult = {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    link: string;
    tags: string[];
    image: string;
    technologies: string[];
  };

  let rawPosts = i18next.t("posts", { returnObjects: true }) as Array<SearchResult>;

  rawPosts = Object.values(rawPosts).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <section
        id="2"
        className="flex-col sm:pt-20 pt-8 sm:pb-42! pb-8"
      >
        <h2 className="sm:text-5xl text-4xl font-bold text-white tracking-tighter mb-6">
          {t("blog.title")}
        </h2>
        <div className="grid grid-rows md:grid-cols-2 gap-2">
          {rawPosts?.slice(0, 1).map((post, index) => {
            return (
              <article
                key={post.title}
                className={`md:hidden flex text-black rounded-xl pt-2 flex-col hover:cursor-pointer transition-all duration-300 w-full 
                ${index === 1
                  ? "bg-white [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0)_60%)] [mask-repeat:no-repeat] [mask-size:100%_100%] [mask-position:top]"
                  : "bg-white"}`}
              >
                <div className="flex flex-col w-full justify-between px-4 py-2 h-full">
                  <div>
                    <h3 className="text-xl tracking-tighter font-bold mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm tracking-tight mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex items-center flex-wrap gap-1">
                          {post.tags.map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="bg-blue-700/60 text-xs text-white px-2 h-fit py-0.5 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {post.technologies.map((tag: string, i: number) => (
                            <span
                              key={i}
                              className={`${tag} text-xl text-gray-600 rounded-full`}
                            ></span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between mt-auto">
                    <p className="flex items-center gap-1 text-xs">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "16px" }}
                      >
                        calendar_month
                      </span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <a
                      href={post.link}
                      className="flex items-center gap-1 font-bold rounded-xl text-sm transition-all"
                    >
                      Read More{" "}
                      <span className="material-symbols-outlined">
                        arrow_right_alt
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
          
          {rawPosts?.slice(0, 4).map((post, index) => {
            return (
              <article
                key={`desktop-${post.title}`}
                className={`hidden md:flex text-black rounded-xl md:flex-col pt-2 flex-row hover:cursor-pointer transition-all duration-300 w-full 
                ${index === 2 || index === 3
                  ? "bg-white [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0)_60%)] [mask-repeat:no-repeat] [mask-size:100%_100%] [mask-position:top]"
                  : "bg-white"}`}
              >
                <div className="flex flex-col w-full justify-between px-4 py-2 h-full">
                  <div>
                    <h3 className="text-xl tracking-tighter font-bold mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm tracking-tight mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex items-center flex-wrap gap-1">
                          {post.tags.map((tag: string, i: number) => (
                            <span
                              key={i}
                              className="bg-blue-700/60 text-xs text-white px-2 h-fit py-0.5 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {post.technologies.map((tag: string, i: number) => (
                            <span
                              key={i}
                              className={`${tag} text-xl text-gray-600 rounded-full`}
                            ></span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between mt-auto">
                    <p className="flex items-center gap-1 text-xs">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "16px" }}
                      >
                        calendar_month
                      </span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <a
                      href={post.link}
                      className="flex items-center gap-1 font-bold rounded-xl text-sm transition-all"
                    >
                      Read More{" "}
                      <span className="material-symbols-outlined">
                        arrow_right_alt
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};
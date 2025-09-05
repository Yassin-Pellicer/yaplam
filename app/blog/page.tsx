"use client";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import "../lib/18n";
import "devicon/devicon.min.css";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";

export default function Portfolio() {

  const { t } = useTranslation();
  const router = useRouter();

  const rawPosts = t("posts", { returnObjects: true }) as Record<string, {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    link: string;
    tags: string[];
    image: string;
    technologies: string[];
  }>;

  const posts = Object.values(rawPosts);

  return (
    <div className="flex justify-center flex-col items-center bg-white select-none">
      <section className="flex flex-col h-full items-center min-h-screen">
        <Header style="black" />
        <div className="sm:py-14 h-full py-12 mt-2">
          <div className="w-full bg-white">
            <div className="flex md:flex-row flex-col w-full max-w-[1400px] mx-auto">
              <div className="flex w-full flex-col md:w-1/3  md:border-0 border-b-1 border-gray-300 self-start">
                <div className="flex flex-col w-full overflow-hidden  bg-white mb-4">
                  <img
                    src="/blog/blog.png"
                    alt="Background"
                    className="h-40 w-full object-cover"
                  />
                  <div className="flex flex-col -mt-10 px-4 md:pb-4">
                    <img
                      src="/yo.jpg"
                      alt="Profile"
                      className="w-20 h-20 rounded-full border-white object-cover"
                    />
                    <b className="mt-2 text-lg text-gray-800">Yassin Pellicer Lamla</b>
                    <p className="text-sm text-gray-800">
                      Software Engineer | Especializado en Ciencias de la Computación
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Alzira, Comunitat Valenciana
                    </p>
                    <div className="flex mt-3 space-x-3">
                      <a
                        href="https://github.com/Yassin-Pellicer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-all hover:scale-110"
                      >
                        <Github className="w-4 h-4 text-white" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/yassin-pellicer/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-all hover:scale-110"
                      >
                        <Linkedin className="w-4 h-4 text-white" />
                      </a>
                      <a
                        href="mailto:yassinpellicerlamla@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-all hover:scale-110"
                      >
                        <Mail className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                {/* <div className="p-4 shadow-md bg-white rounded-2xl gap-1 divide-y">
                <div className="bg-white pb-4 rounded-t-lg border-gray-300">
                  <h3 className="text-lg font-bold mb-3 text-gray-800">Search Posts</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full pl-8 rounded-lg pr-2 py-2 border border-gray-300 text-sm"
                    />
                    <span className="material-symbols-outlined absolute left-1.5 top-1.5 text-gray-400 text-sm">search</span>
                  </div>
                </div>
                <div className="bg-white pb-4 border-gray-300">
                  <h3 className="text-lg font-bold mb-1 text-gray-800">Categories</h3>
                  <div className="flex flex-col gap-1 text-sm">
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                        <span className="group-hover:text-blue-600 transition-colors">Next.js</span>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">3</span>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                        <span className="group-hover:text-blue-600 transition-colors">Tailwind</span>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">2</span>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                        <span className="group-hover:text-blue-600 transition-colors">Python</span>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">1</span>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                        <span className="group-hover:text-blue-600 transition-colors">Deployment</span>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">2</span>
                    </label>
                    <label className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="accent-blue-600 w-4 h-4" />
                        <span className="group-hover:text-blue-600 transition-colors">Web Design</span>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">4</span>
                    </label>
                  </div>
                </div>
                <div className="bg-white pb-4 border-gray-300">
                  <h3 className="text-lg font-bold text-gray-800">Sort & Filter</h3>
                  <div className="space-y-4">
                    <div>
                      <select className="w-full border text-xs rounded-lg border-gray-300 p-2 bg-white">
                        <option value="latest">Latest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="popular">Most Popular</option>
                        <option value="az">A → Z</option>
                        <option value="za">Z → A</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-b-lg border-gray-300">
                  <h3 className="text-lg font-bold mb-3 text-gray-800">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs px-3 py-1 rounded-full transition-colors cursor-pointer">
                      #react
                    </button>
                    <button className="bg-green-100 hover:bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full transition-colors cursor-pointer">
                      #javascript
                    </button>
                    <button className="bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs px-3 py-1 rounded-full transition-colors cursor-pointer">
                      #css
                    </button>
                    <button className="bg-orange-100 hover:bg-orange-200 text-orange-800 text-xs px-3 py-1 rounded-full transition-colors cursor-pointer">
                      #tutorial
                    </button>
                    <button className="bg-pink-100 hover:bg-pink-200 text-pink-800 text-xs px-3 py-1 rounded-full transition-colors cursor-pointer">
                      #ui-ux
                    </button>
                    <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-xs px-3 py-1 rounded-full transition-colors cursor-pointer">
                      #performance
                    </button>
                  </div>
                </div>
              </div> */}
              </div>
              <div className="md:border-x-1 md:border-0 border-b-1 border-gray-300 flex flex-col w-full ">
                <div className="grid md:grid-cols-1 divide-y divide-gray-200 grid-cols-1 w-full">
                  <h1 className="md:text-2xl text-xl font-bold tracking-tighter px-4 bg-white py-4">✒️ Publicaciones Destacadas </h1>
                  {posts.map((post, originalIndex) => {
                    const actualIndex = originalIndex * 2;
                    return (
                      <article
                        key={actualIndex}
                        className="flex md:flex-col py-4 flex-row bg-white text-gray-800 hover:cursor-pointer transition-all duration-50"
                        onClick={() => router.push(`/blog/${post.id}`)}
                      >
                        {/* {post.image && <img src={post.image} className="md:block hidden rounded-t-2xl object-cover border-b border-gray-300 max-h-[225px]"></img>} */}
                        <div className="flex flex-col justify-between px-4 py-2 h-full">
                          <div>
                            <h3 className="text-xl tracking-tighter font-bold mb-2">
                              {post.title}
                            </h3>
                            <p className="text-sm tracking-tight mb-4">{post.excerpt}</p>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {post.tags.map((tag: string, i: number) => (
                                <span
                                  key={i}
                                  className="bg-blue-700/60 text-xs text-white px-2 py-0.5 rounded-full"
                                >
                                  #{tag}
                                </span>
                              ))}
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
                              <span className="material-symbols-outlined">arrow_right_alt</span>
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>


              <div className="flex w-full flex-col md:w-1/3 self-start h-fit">
                <div className="bg-white p-4">
                  <h3 className="text-lg font-bold mb-3 text-gray-800">Recent Posts</h3>
                  <div className="space-y-3">
                    {posts.slice(0, 5).map((post, index) => (
                      <div key={index} className="flex gap-3 group cursor-pointer">
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-12 h-12 object-cover border border-gray-300 group-hover:scale-105 transition-transform"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer style={"black"} />
    </div>
  );
}
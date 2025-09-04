"use client";

import "../../lib/18n";
import "devicon/devicon.min.css";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { InViewSection } from "@/app/components/motion";

export default function Portfolio() {
  const { t, i18n } = useTranslation();

  const router = useRouter();
  const params = useParams();

  const id = params.id;

  const [markdown, setMarkdown] = useState("");
  const [post, setPost] = useState<{
    id: string;
    title: string;
    date: string;
    excerpt: string;
    link: string;
    tags: string[];
    image: string;
    technologies: string[];
  } | null>(null);

  useEffect(() => {
    console.log(id);
    if (!id) return;
    const post = t(`posts.${id}`, { returnObjects: true }) as {
      id: string;
      title: string;
      date: string;
      excerpt: string;
      link: string;
      tags: string[];
      image: string;
      technologies: string[];
    };
    setPost(post);
  }, [id, t]);

  useEffect(() => {
    console.log(`fetching /markdown/${i18n.language}/${id}.md`);
    fetch(`/markdown/${i18n.language}/${id}.md`)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, [id, i18n.language]);

  if (!post) {
    return <div className="flex justify-center flex-col items-center bg-gradient-to-br from-[#87ceeb] to-[#87ceeb] select-none"></div>;
  }

  return (
    <div className="flex justify-center flex-col items-center bg-[#f4f2ee] select-none">
      <section className="flex flex-col items-center min-h-screen max-w-[1000px] px-4">
        <Header style="black" />
        <InViewSection>
          <div className="w-full sm:py-24 py-0 mt-2">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col h-fit">
                <h1 className="text-4xl font-bold tracking-tighter mb-2">
                  <span onClick={() => router.push("/blog")}
                    className="material-symbols-outlined text-black hover:bg-black/10 p-2 hover:cursor-pointer rounded-full" style={{ fontSize: "26px" }}>arrow_back
                  </span>
                </h1>
                <article className="flex flex-col bg-white shadow-md text-gray-800 backdrop-blur-md rounded-2xl tracking-tight border border-gray-200 hover:cursor-pointer">
                  {post.image && <img src={post.image} className="rounded-t-2xl object-cover border-b border-gray-200 max-h-[500px]"></img>}
                  <div className="flex flex-col justify-between px-4 py-2 h-full">
                    <div>
                      <h3 className="text-4xl py-2 tracking-tighter font-bold mb-2">
                        {post.title}
                      </h3>
                      <p className="text-md tracking-tight mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag, i) => (
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
                      <p className="flex items-center gap-1 text-xs ">
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
                    </div>
                  </div>

                  {markdown && (
                    <div className="markdown px-4 border-t mt-4 border-gray-200">
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {markdown}
                      </ReactMarkdown>
                    </div>
                  )}
                </article>
              </div>
            </div>
          </div>
        </InViewSection>
      </section>
      <Footer style={"black"} />
    </div>
  );
}
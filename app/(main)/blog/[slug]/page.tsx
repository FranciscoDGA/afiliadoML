import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt
  };
}

function renderContent(content: string) {
  return content.split("\n").map((line, index) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={index} className="mt-6 text-2xl font-bold text-slate-950">
          {line.replace("## ", "")}
        </h2>
      );
    }

    if (!line.trim()) {
      return <div key={index} className="h-3" />;
    }

    return (
      <p key={index} className="text-base leading-8 text-slate-700">
        {line}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [post.featuredImage],
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    description: post.excerpt
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <Script id="blog-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <Card className="overflow-hidden p-0">
        <div className="h-72 bg-gradient-to-br from-ml-blue/20 to-ml-yellow/30" />
        <div className="p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ml-blue">{post.category}</p>
          <h1 className="mt-3 text-4xl font-black text-slate-950">{post.title}</h1>
          <div className="mt-3 text-sm text-slate-500">
            <span>{post.author}</span> · <span>{formatDate(post.publishedAt ?? post.createdAt)}</span>
          </div>
          <article className="mt-8 space-y-4">{renderContent(post.content)}</article>
        </div>
      </Card>
    </div>
  );
}

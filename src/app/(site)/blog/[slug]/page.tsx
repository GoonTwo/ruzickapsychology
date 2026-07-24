import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/config/seo";
import { getOlderPostMeta, getPost, getPostSlugsForBuild } from "@/data/blog";
import { getPublishedServiceDefinitions } from "@/data/cms";
import { POST_SERVICE_LINKS } from "@/config/services";
import { BlogPostPage } from "@/page-modules/blog-post";

export async function generateStaticParams() {
  return (await getPostSlugsForBuild()).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostRoute(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [olderPost, publishedServices] = await Promise.all([
    getOlderPostMeta(slug),
    getPublishedServiceDefinitions(),
  ]);
  const configuredServiceLink = POST_SERVICE_LINKS[post.slug];
  const serviceLink =
    configuredServiceLink &&
    (!configuredServiceLink.serviceSlug ||
      publishedServices.some(
        (service) => service.slug === configuredServiceLink.serviceSlug,
      ))
      ? configuredServiceLink
      : undefined;

  return (
    <BlogPostPage post={post} olderPost={olderPost} serviceLink={serviceLink} />
  );
}

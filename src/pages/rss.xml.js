import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Bassam Adnan',
    description:
      'Writings on systems programming, distributed systems, Go, C++, and PostgreSQL.',
    site: context.site,
    items: sorted.map((post) => ({
      title:       post.data.title,
      pubDate:     post.data.pubDate,
      description: post.data.description,
      link:        `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}

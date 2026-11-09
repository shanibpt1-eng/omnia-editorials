import BlogNewsFeed from '../../components/BlogNewsFeed';

export const metadata = {
  title: '1Fill Live News Feed | GCC & Worldwide Wire',
  description: 'Live business and technology news wire powered by 1Fill and NewsData.io.',
};

export default function NewsFeedPage() {
  return (
    <main className="min-h-screen bg-[#090d16]">
      <BlogNewsFeed />
    </main>
  );
}

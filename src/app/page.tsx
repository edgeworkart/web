import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

const sections = [
  { id: 1, title: 'GALLERY', href: '/gallery', image: `${process.env.NEXT_PUBLIC_API_BASE_URL}/gallery.jpg` },
  { id: 2, title: 'SHOP', href: '/shop', image: `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop.jpg` },
  { id: 3, title: 'IMPRINT', href: '/imprint', image: `${process.env.NEXT_PUBLIC_API_BASE_URL}/imprint.jpg` },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Edgework – Curated Visual Art</title>
        <meta name="description" content="Explore artwork, shop pieces, and learn about Edgework's creative vision." />
      </Head>

      <main className="min-h-screen flex flex-col items-center bg-white text-black">
        {/* Header */}
        <header className="w-full border-b py-6 text-center text-2xl font-bold tracking-widest uppercase">
          EDGEWORK
        </header>

        {/* Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-10 md:p-20 w-full max-w-6xl">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-white text-2xl font-bold">{section.title}</h2>
              </div>
            </Link>
          ))}
        </section>

        {/* Add a link to the admin panel */}
        <a href="/admin" className="mt-10 p-4 bg-blue-500 text-white rounded-lg">
          Admin Panel
        </a>
      </main>
    </>
  );
}
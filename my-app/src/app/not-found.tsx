// app/not-found.tsx
import Link from 'next/link';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Page Not Found – MySite',
  description: 'Sorry, this page does not exist.',
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return (
    <main className="not-found-container">
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-message">
        Oops! The page you’re looking for can’t be found.
      </p>
      <Link href="/" passHref>
        <button className="not-found-button">
          Go Home
        </button>
      </Link>
    </main>
  );
}
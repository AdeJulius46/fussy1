// import localFont from 'next/font/local'

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Header from '@/component/Header';
import "./app.css"
import ViewCanvas from "@/component/ViewCanvas";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className="overflow-x-hidden bg-yellow-300">
      <Header />
      <main>
        {children}
        <ViewCanvas />
      </main>
        </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}

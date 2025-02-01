import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";
import BottomNavigation from "@/components/bottom-navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "共創DAO",
  description: "地域活性化のための機会共創プラットフォーム",
};

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Header />
      <main className="max-w-lg mx-auto pt-16">{children}</main>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ClientLayout>
          <main className="pb-20">{children}</main>
        </ClientLayout>
        <BottomNavigation />
      </body>
    </html>
  );
}

import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/shared/Header";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import BottomNavigation from "@/components/shared/BottomNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NEO88",
  description:
    "「わたしふるえる体験」を巡ることで自分の中の心に気づき、新たな自分を始めていく旅",
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

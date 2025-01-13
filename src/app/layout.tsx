import { Inter } from "next/font/google";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { ApolloWrapper } from "@/utils/apollo_wrapper";
import TopNav from "@/components/top_nav";
import SideNav from "@/components/side_nav";
import BottomNav from "@/components/bottom_nav";
import MaxWidthWrapper from "@/components/max_width_wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UpstrimaAgentStack Visualizer",
  description: "Interactive user interface for UpstrimaAgentStack.",
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#4ADE80',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} flex h-full flex-col bg-zinc-50 dark:bg-zinc-900`}>
        <ApolloWrapper>
          <div className="min-h-screen flex flex-col">
            <TopNav />
            
            <MaxWidthWrapper>
              <div className="flex flex-1 pt-16">
                <SideNav />
                
                <main className="flex-1 px-4 sm:px-6 lg:px-8">
                  <div className="relative flex min-h-full flex-col sm:ml-[120px] md:ml-[250px]">
                    {/* Main content gradient background */}
                    <div className="absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden">
                      <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-blue-500/30 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-green-400/30 dark:to-blue-500/30">
                          <svg
                            aria-hidden="true"
                            className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:fill-white/2.5 dark:stroke-white/5"
                          >
                            <defs>
                              <pattern
                                id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                                width="72"
                                height="56"
                                patternUnits="userSpaceOnUse"
                                x="-12"
                                y="4"
                              >
                                <path d="M.5 56V.5H72" fill="none" />
                              </pattern>
                            </defs>
                            <rect width="100%" height="100%" strokeWidth="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Main content */}
                    <div className="py-6 sm:py-8 lg:py-12">
                      {children}
                    </div>
                  </div>
                </main>
              </div>
            </MaxWidthWrapper>
            
            {/* Bottom navigation for mobile */}
            <div className="sm:hidden">
              <BottomNav />
            </div>
          </div>
        </ApolloWrapper>
        
        {/* Backdrop blur for modals */}
        <div id="modal-root" />
      </body>
    </html>
  );
}
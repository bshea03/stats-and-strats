import Link from "next/link";
import { headers } from "next/headers";
import { ArrowRight, Trophy, TrendingUp, BookOpen } from "lucide-react";

export default async function HomePage() {
  const headersList = headers();
  const host = (await headersList).get("host")!; // e.g. testsite.com | localhost:3000
  const protocol = process.env.NODE_ENV === "development" ? "http://" : "https://";

  const appUrl = `${protocol}app.${host}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tight">Stats & Strats</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your speedrunning progress, analyze your performance, and
            level up your game with comprehensive stats and strategies.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <Trophy className="w-10 h-10 mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Personal Bests</h3>
            <p className="text-sm text-muted-foreground">
              Track and visualize your best times across all categories
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <TrendingUp className="w-10 h-10 mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Performance Stats</h3>
            <p className="text-sm text-muted-foreground">
              Deep dive into your run analytics and identify improvements
            </p>
          </div>

          <div className="p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
            <BookOpen className="w-10 h-10 mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Guides & Resources</h3>
            <p className="text-sm text-muted-foreground">
              Access curated guides, videos, and tools for your game
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link href={appUrl}>
          <button className="mt-10 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}

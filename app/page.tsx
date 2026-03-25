import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export default function Home() {
  return (
    <main
      className={`min-h-screen ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      style={{ background: "var(--background)", color: "var(--text-primary)" }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-6">
          <h1 
            className="text-5xl font-bold"
            style={{ fontFamily: "var(--font-heading)", background: "linear-gradient(to right, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Hikmet Güleşli
          </h1>
          <p 
            className="text-xl"
            style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
          >
            Full-Stack Developer & UI/UX Designer
          </p>
          <div className="flex gap-4 justify-center pt-8">
            <button
              className="px-6 py-3 rounded-md font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--primary)" }}
            >
              Projeleri Gör
            </button>
            <button
              className="px-6 py-3 rounded-md font-semibold border transition-all hover:border-primary"
              style={{ 
                background: "transparent", 
                borderColor: "var(--border)", 
                color: "var(--text-primary)",
                fontFamily: "var(--font-body)"
              }}
            >
              İletişime Geç
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 sm:pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
          Security Researcher & Ethical Hacker
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
          Exploring cybersecurity, penetration testing, and reverse engineering.
          CTF player and passionate about making security understandable and
          accessible.
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <a
            href="#contact"
            className="inline-block px-5 sm:px-6 py-3 bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors duration-200 text-sm sm:text-base"
          >
            Get in Touch
          </a>

          <a
            href="#projects"
            className="inline-block px-5 sm:px-6 py-3 border border-foreground text-foreground hover:bg-foreground/10 transition-colors duration-200 text-sm sm:text-base"
          >
            View Projects
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            className="inline-block px-5 sm:px-6 py-3 border border-foreground text-foreground hover:bg-foreground/10 transition-colors duration-200 text-sm sm:text-base"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}

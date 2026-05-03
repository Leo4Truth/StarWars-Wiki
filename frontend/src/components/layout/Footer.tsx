export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-starwars-blue/50 to-starwars-black/80 border-t border-starwars-gold/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <svg className="w-8 h-8 text-starwars-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-starwars-gold font-bold text-xl tracking-wider">Star Wars Wiki</span>
            </div>
            <p className="text-starwars-gray text-sm">
              Your guide to a galaxy far, far away...
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-starwars-gold font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#" className="text-starwars-white/60 hover:text-starwars-gold transition-colors">Films</a>
              <span className="text-starwars-gold/30">|</span>
              <a href="#" className="text-starwars-white/60 hover:text-starwars-gold transition-colors">Characters</a>
              <span className="text-starwars-gold/30">|</span>
              <a href="#" className="text-starwars-white/60 hover:text-starwars-gold transition-colors">Timeline</a>
              <span className="text-starwars-gold/30">|</span>
              <a href="#" className="text-starwars-white/60 hover:text-starwars-gold transition-colors">About</a>
            </div>
          </div>

          {/* Credits */}
          <div className="text-center md:text-right">
            <p className="text-starwars-gray text-sm">
              Powered by The Force
            </p>
            <p className="text-starwars-white/40 text-xs mt-2">
              {currentYear} Star Wars Wiki. All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-8 pt-6 border-t border-starwars-gold/10">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-starwars-gold/30" />
            <svg className="w-4 h-4 text-starwars-gold/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-starwars-gold/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
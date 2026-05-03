export default function Footer() {
  return (
    <footer className="bg-starwars-blue/50 border-t border-starwars-gold/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🌌</span>
            <span className="text-starwars-gold font-bold">Star Wars Wiki</span>
          </div>
          <p className="text-starwars-gray text-sm">
            Powered by Star Wars API
          </p>
        </div>
      </div>
    </footer>
  );
}
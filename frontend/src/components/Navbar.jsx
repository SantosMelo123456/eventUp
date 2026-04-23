import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="shadow-lg" style={{ backgroundColor: '#380930' }}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        
        <Link to="/" className="text-white text-xl font-bold tracking-tight">
          EventUp
        </Link>

        <Link
          to="/events/new"
          className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          + Criar Evento
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
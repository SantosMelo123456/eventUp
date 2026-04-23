import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

function EventCard({ event }) {
  const spotsLeft = event.maxAttendees - event._count.registrations;
  const isFull = spotsLeft <= 0;

  return (
    <Link to={`/events/${event.id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-slate-100">

        <div className="h-44 bg-gradient-to-br from-indigo-400 to-purple-500 relative overflow-hidden">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white text-5xl">
              🎉
            </div>
          )}

          <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${
            isFull ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}>
            {isFull ? 'Lotado' : `${spotsLeft} vagas`}
          </span>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg text-slate-800 mb-2 truncate">{event.name}</h3>
          <div className="space-y-1 text-sm text-slate-500">
            <p>📅 {formatDate(event.date)}</p>
            <p>📍 {event.location}</p>
          </div>
        </div>

      </div>
    </Link>
  );
}

export default EventCard;
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, registerForEvent } from '../services/api';
import { LoadingSpinner, AlertMessage } from '../components/UI';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await getEventById(id);
        setEvent(response.data);
      } catch (err) {
        setError('Evento não encontrado.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterError(null);
    setRegisterSuccess(null);

    try {
      const response = await registerForEvent(id, formData);
      setRegisterSuccess(response.message);
      setFormData({ name: '', email: '' });

      const updated = await getEventById(id);
      setEvent(updated.data);
    } catch (err) {
      setRegisterError(err.response?.data?.message || 'Erro ao realizar inscrição.');
    } finally {
      setRegisterLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-slate-800 transition";

  if (loading) return <LoadingSpinner message="Carregando evento..." />;

  if (error) return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
      <button
        onClick={() => navigate('/')}
        className="mt-4 text-indigo-600 hover:underline"
      >
        ← Voltar para eventos
      </button>
    </div>
  );

  const spotsLeft = event.maxAttendees - event._count.registrations;
  const isFull = spotsLeft <= 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* Botão voltar */}
      <button
        onClick={() => navigate('/')}
        className="text-indigo-600 hover:underline mb-6 block"
      >
        ← Voltar para eventos
      </button>

      {/* Imagem do evento */}
      <div className="h-64 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl overflow-hidden mb-8">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-white text-7xl">🎉</div>
        )}
      </div>

      {/* Detalhes do evento */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-800">{event.name}</h1>
          <span className={`text-sm font-bold px-3 py-1 rounded-full ${
            isFull ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {isFull ? 'Lotado' : `${spotsLeft} vagas`}
          </span>
        </div>

        <div className="space-y-2 text-slate-600 mb-6">
          <p>📅 {formatDate(event.date)}</p>
          <p>📍 {event.location}</p>
          <p>👥 {event._count.registrations}/{event.maxAttendees} participantes</p>
        </div>

        <p className="text-slate-700 leading-relaxed">{event.description}</p>
      </div>

      {/* Formulário de inscrição */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Inscrever-se no Evento</h2>

        {isFull ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            ❌ Este evento está lotado. Não há mais vagas disponíveis.
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <AlertMessage type="success" message={registerSuccess} />
            <AlertMessage type="error" message={registerError} />

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Seu Nome *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ex: Maria Silva"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Seu E-mail *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Ex: maria@email.com"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={registerLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              {registerLoading ? '⏳ Inscrevendo...' : '✅ Confirmar Inscrição'}
            </button>
          </form>
        )}
      </div>

      {/* Lista de participantes */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Participantes ({event._count.registrations})
        </h2>

        {event.registrations.length === 0 ? (
          <p className="text-slate-400 text-center py-6">
            Nenhum participante inscrito ainda. Seja o primeiro! 🎉
          </p>
        ) : (
          <ul className="space-y-3">
            {event.registrations.map((reg) => (
              <li key={reg.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
                  {reg.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{reg.name}</p>
                  <p className="text-sm text-slate-400">{reg.email}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default EventDetailPage;
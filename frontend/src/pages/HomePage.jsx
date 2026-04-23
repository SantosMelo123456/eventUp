import { useState, useEffect } from 'react';
import { getEvents } from '../services/api';
import EventCard from '../components/EventCard';
import { LoadingSpinner } from '../components/UI';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getEvents();
        setEvents(response.data);
      } catch (err) {
        setError('Não foi possível carregar os eventos. Tente novamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-center mb-8">
        <img
          src="/logo-eventup.webp"
          alt="Event Up - Organização de Eventos"
          className="w-full max-w-xl h-auto"
        />
      </div>

      <section className="px-6 py-8 md:px-10 md:py-10 mb-10">
        <p className="text-center text-sm md:text-base leading-relaxed max-w-4xl mx-auto text-slate-700">
          Podemos transformar suas ideias e a visao do evento dos seus sonhos em realidade. Nossa
          equipe e apaixonada, criativa e dedicada a transformar cada detalhe em uma experiencia
          inesquecivel. Do conceito a execucao, criamos eventos que sao unicos, elegantes e
          realmente com a sua cara.
        </p>

        <div className="my-8 flex justify-center">
          <img
            src="/eventup-party.jpg"
            alt="Ambiente de festa com luzes"
            className="w-full max-w-2xl h-auto object-cover"
          />
        </div>

        <div className="text-center font-semibold uppercase tracking-wide space-y-3 text-slate-800 text-lg md:text-xl">
          <p className="text-lg leading-none">★</p>
          <p>Casamentos • Aniversarios • Eventos Corporativos</p>
          <p className="text-lg leading-none">★</p>
          <p>Criando experiencias inesqueciveis</p>
          <p className="text-lg leading-none">★</p>
          <p>Festas de luxo e eventos privados</p>
        </div>
      </section>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Lista de Eventos</h1>
        <p className="text-slate-500 mt-1">Encontre e inscreva-se nos eventos disponíveis.</p>
      </div>

      {loading && <LoadingSpinner message="Buscando eventos..." />}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {events.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-lg">Nenhum evento encontrado.</p>
              <p className="text-sm mt-1">Que tal criar o primeiro?</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-slate-500">
                Deslize para a direita/esquerda para ver mais eventos.
              </p>
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-6 min-w-max">
                  {events.map((event) => (
                    <div key={event.id} className="w-[320px] shrink-0">
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <section className="mt-14 mb-6 px-4 py-8 md:px-8 md:py-10">
        <p className="text-center font-semibold uppercase tracking-wide text-lg md:text-xl text-slate-800">
          Como nossa agenda e organizada para seu evento
        </p>

        <div className="mt-8 max-w-4xl mx-auto space-y-5">
          <div>
            <p className="font-bold text-slate-800">1º passo - Alinhamento inicial</p>
            <p className="text-sm text-slate-600">
              Entendemos sua ideia, objetivo, publico e estilo para montar a base do evento.
            </p>
          </div>

          <div>
            <p className="font-bold text-slate-800">2º passo - Planejamento completo</p>
            <p className="text-sm text-slate-600">
              Definimos cronograma, estrutura, fornecedores, decoracao e todos os detalhes.
            </p>
          </div>

          <div>
            <p className="font-bold text-slate-800">3º passo - Organizacao operacional</p>
            <p className="text-sm text-slate-600">
              Coordenamos contratos, equipe, prazos, montagem e logistica para tudo fluir.
            </p>
          </div>

          <div>
            <p className="font-bold text-slate-800">4º passo - Execucao do evento</p>
            <p className="text-sm text-slate-600">
              Acompanhamos em tempo real cada momento para garantir qualidade e tranquilidade.
            </p>
          </div>

          <div>
            <p className="font-bold text-slate-800">Passo final - Encerramento com excelencia</p>
            <p className="text-sm text-slate-600">
              Finalizamos a operacao, conferimos entregas e garantimos uma experiencia memoravel.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
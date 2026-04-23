import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreateEventPage from './pages/CreateEventPage';
import EventDetailPage from './pages/EventDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events/new" element={<CreateEventPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
        </Routes>
      </main>
      <section className="bg-slate-50 px-4 pb-10">
        <h2 className="text-center font-semibold uppercase tracking-wide text-lg md:text-xl text-slate-800 mb-12">
          Visite a nossa sede em Sao Paulo, Sao Paulo
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1 items-center justify-items-center">
          <img
            src="/eventup-building.png"
            alt="Sede da Event Up"
            className="w-full max-w-lg h-auto rounded-lg"
          />
          <a
            href="https://www.google.com/maps?q=Rua+Francolino+Borges+de+Oleiro,+Joao+Pessoa,+PB"
            target="_blank"
            rel="noreferrer"
            className="w-full max-w-xs"
          >
            <img
              src="/google-maps-link.svg"
              alt="Abrir localizacao da Event Up no Google Maps"
              className="w-full h-auto rounded-lg border border-slate-200 hover:opacity-95 transition-opacity"
            />
          </a>
        </div>
        <h2 className="text-center font-semibold uppercase tracking-wide text-lg md:text-xl text-slate-800 mt-24">
          Conheca nossos fundadores
        </h2>
        <div className="max-w-3xl mx-auto mt-8 flex flex-col items-center gap-4">
          <img
            src="/founder-1.png"
            alt="Fundador da Event Up"
            className="w-full max-w-[180px] h-auto rounded-lg"
          />
          <h3 className="text-center font-semibold uppercase tracking-wide text-sm md:text-base text-slate-800">
            Rodrigo Mascate
          </h3>
          <p className="max-w-2xl text-center text-slate-700 text-sm md:text-base leading-relaxed px-4">
            O fundador da Event Up, Rodrigo Mascate, possui uma visao estrategica e espirito
            empreendedor marcante. Desde o inicio, focou em estruturar a empresa com eficiencia e
            profissionalismo. Com habilidade em gestao e inovacao, contribuiu para o crescimento
            solido do negocio. Seu compromisso com qualidade e excelencia impulsionou a marca no
            mercado. Ele e peca-chave na construcao de uma empresa moderna, confiavel e em
            constante evolucao.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base mb-6">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-700 underline hover:text-slate-900 transition-colors"
            >
              Instagram: @rodrigomascate.eventup
            </a>
            <a
              href="https://mail.google.com/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-700 underline hover:text-slate-900 transition-colors"
            >
              E-mail: rodrigo.mascate@eventup.com
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-700 underline hover:text-slate-900 transition-colors"
            >
              TikTok: @rodrigomascate.oficial
            </a>
          </div>
          <img
            src="/founder-2.png"
            alt="Fundadora da Event Up"
            className="w-full max-w-[180px] h-auto rounded-lg"
          />
          <h3 className="text-center font-semibold uppercase tracking-wide text-sm md:text-base text-slate-800">
            Mariana Amber
          </h3>
          <p className="max-w-2xl text-center text-slate-700 text-sm md:text-base leading-relaxed px-4">
            A co-fundadora da Event Up, Mariana Amber, sempre foi apaixonada por transformar ideias
            em momentos inesqueciveis. Com olhar sensivel para detalhes e forte criatividade,
            iniciou sua trajetoria organizando pequenos eventos locais. Ao longo do tempo,
            destacou-se pela elegancia e organizacao impecavel. Seu estilo une sofisticacao com
            acolhimento, criando experiencias unicas. Hoje, e reconhecida por dar vida a sonhos
            com autenticidade e dedicacao.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-700 underline hover:text-slate-900 transition-colors"
            >
              Instagram: @marianaamber.eventup
            </a>
            <a
              href="https://mail.google.com/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-700 underline hover:text-slate-900 transition-colors"
            >
              E-mail: mariana.amber@eventup.com
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-700 underline hover:text-slate-900 transition-colors"
            >
              TikTok: @marianaamber.oficial
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
function Footer() {
  return (
    <footer className="bg-[#380930] text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <p className="text-sm uppercase tracking-wide text-purple-200">Endereco</p>
            <p className="mt-2 text-sm leading-relaxed">Rua Francolino Borges de Oleiro</p>
            <a
              href="https://www.google.com/maps?q=Rua+Francolino+Borges+de+Oleiro,+Joao+Pessoa,+PB"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-2 text-sm text-purple-100 underline hover:text-white transition-colors"
            >
              Ver localizacao no Google Maps
            </a>
          </div>

          <div className="flex justify-center">
            <img src="/logo-eventup-white.webp" alt="Logo EventUp" className="w-56 md:w-72 h-auto" />
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm uppercase tracking-wide text-purple-200">Contato</p>
            <p className="mt-2 text-sm leading-relaxed">83 9900888</p>
            <p className="text-sm leading-relaxed">Fixo: 83 105890</p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/20 text-center md:text-right">
          <p className="text-sm text-purple-100">Redes sociais: @instagram, @tiktok</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

Durante o terceiro período do curso de Ciência da Computação, desenvolvi como projeto acadêmico o EventUp, 
um sistema fullstack de registro e gerenciamento de eventos.

No desenvolvimento, atuei como desenvolvedora única, sendo responsável por todas as camadas da aplicação: desde a modelagem do banco de 
dados até a interface visual.

No frontend com React, implementei três páginas principais usando React Router para navegação entre elas. Na página inicial, criei um 
carrossel horizontal de eventos onde o usuário pode rolar para ver todos os próximos eventos disponíveis, cada um exibindo nome, data, 
local e número de vagas disponíveis em tempo real. Utilizei os hooks useState e useEffect para gerenciar os estados de loading, erro e dados vindos da API.

Na página de criação de eventos, implementei um formulário controlado com useState — um único handler genérico atualiza qualquer campo pelo
nome, evitando repetição de código. Após a criação, o usuário é redirecionado automaticamente para a página de detalhes usando o useNavigate.

Na página de detalhes, o usuário pode ver todas as informações do evento, a lista de participantes inscritos e um formulário de inscrição 
com validação de e-mail e feedback visual de sucesso ou erro.

Para a comunicação com o backend, centralizei todas as chamadas HTTP em um arquivo api.js usando Axios, facilitando a manutenção.
O projeto foi implantado com o frontend no Vercel e o backend Node.js com Express e PostgreSQL no Railway, ficando totalmente acessível 
publicamente.

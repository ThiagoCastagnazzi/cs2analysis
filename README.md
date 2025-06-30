# CS2 Player Analysis - Frontend React

Uma aplicação moderna e completa para análise de jogadores e times de Counter-Strike 2, desenvolvida em React com TanStack Query e gráficos interativos.

## 🚀 Funcionalidades Principais

### 📊 **Gráficos e Análise de Dados** ⭐ **NOVO**
- **Gráficos interativos** com Recharts
- **Winrate por mapa** para jogadores e times
- **Performance ao longo do tempo** com gráficos de linha
- **Radar charts** para comparação visual de habilidades
- **Gráficos de barras** para estatísticas detalhadas
- **Pie charts** para distribuição de dados

### 🏠 **Página Inicial**
- Visão geral das estatísticas do CS2
- Cards informativos com dados em tempo real
- Navegação intuitiva para todas as seções

### 👤 **Perfil de Jogadores**
- **6 abas organizadas**: Visão Geral, Partidas Recentes, Estatísticas, **Gráficos**, Configurações, Carreira
- **Aba Gráficos** com:
  - Winrate por mapa (Dust2, Mirage, Inferno, etc.)
  - Performance mensal com evolução do rating
  - Performance por tipo de round (pistol, eco, force-buy)
  - Radar de habilidades para comparação visual
- Informações pessoais completas
- Estatísticas detalhadas com barras de progresso
- Últimas partidas com resultados
- Configurações de equipamentos
- Histórico de carreira e conquistas

### 🏆 **Perfil de Times**
- **5 abas especializadas**: Visão Geral, Jogadores, Partidas Recentes, Estatísticas, **Gráficos**
- **Aba Gráficos** com:
  - Winrate por mapa do time
  - Performance mensal da equipe
  - Distribuição de mapas jogados (pie chart)
  - Radar de performance do time
- Lista completa dos jogadores do time
- Partidas recentes com **rounds coloridos**:
  - 🟢 **Verde**: Vitórias
  - 🔴 **Vermelho**: Derrotas
- Estatísticas avançadas do time
- Links para perfis individuais dos jogadores

### ⚔️ **Comparação VS** ⭐ **MELHORADO**
- **Comparação Jogador vs Jogador**:
  - Estatísticas lado a lado
  - **Gráficos de comparação por mapa**
  - **Radar chart comparativo**
  - Indicadores visuais de melhor performance
- **Comparação Time vs Time**:
  - Estatísticas detalhadas dos times
  - **Winrate por mapa comparativo**
  - **Radar de performance dos times**
  - Análise visual completa
- Interface intuitiva com dropdowns
- Cores diferenciadas (azul vs vermelho)

### 🗂️ **Lista de Jogadores**
- Busca e filtros avançados
- Cards com estatísticas principais
- Links diretos para perfis detalhados
- Ordenação por diferentes critérios

### 🏅 **Lista de Times**
- Rankings atualizados
- Informações dos times
- Estatísticas principais
- Links para perfis completos

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React 19.1.0** - Framework principal
- **React Router** - Navegação entre páginas
- **TanStack Query 5.81.2** - Gerenciamento de estado e cache
- **Recharts** - Biblioteca de gráficos interativos
- **Tailwind CSS** - Estilização moderna
- **shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones modernos
- **Vite** - Build tool otimizado

### **Gerenciamento de Estado**
- **TanStack Query** para cache inteligente
- **Query Keys** hierárquicas organizadas
- **DevTools** para debugging
- **Background refetch** automático
- **Stale time** configurável por tipo de dados

### **Gráficos e Visualização**
- **Recharts** - Biblioteca principal de gráficos
- **Bar Charts** - Gráficos de barras para winrate
- **Line Charts** - Evolução temporal de performance
- **Pie Charts** - Distribuição de dados
- **Radar Charts** - Comparação visual de habilidades
- **Responsive Container** - Gráficos responsivos

## 📊 Tipos de Gráficos Implementados

### **1. Winrate por Mapa**
- **Localização**: Perfil do Jogador, Perfil do Time, Comparação VS
- **Tipo**: Gráfico de Barras
- **Dados**: Porcentagem de vitórias em cada mapa
- **Mapas**: Dust2, Mirage, Inferno, Cache, Overpass, Nuke, Train

### **2. Performance Mensal**
- **Localização**: Perfil do Jogador, Perfil do Time
- **Tipo**: Gráfico de Linha
- **Dados**: Evolução do rating ao longo dos meses
- **Período**: Últimos 6 meses

### **3. Performance por Tipo de Round**
- **Localização**: Perfil do Jogador
- **Tipo**: Gráfico de Barras
- **Dados**: Winrate em pistol rounds, eco rounds, force-buy rounds

### **4. Radar de Habilidades**
- **Localização**: Perfil do Jogador, Perfil do Time, Comparação VS
- **Tipo**: Radar Chart
- **Dados**: Comparação visual de múltiplas estatísticas
- **Jogadores**: Rating, K/D, ADR, HS%, Clutches, MVPs
- **Times**: Rating, Win Rate, Maps Won, Titles, Tournaments, Ranking

### **5. Distribuição de Mapas**
- **Localização**: Perfil do Time
- **Tipo**: Pie Chart
- **Dados**: Quantidade de partidas jogadas por mapa

### **6. Comparação por Mapa**
- **Localização**: Página VS
- **Tipo**: Gráfico de Barras Comparativo
- **Dados**: Winrate lado a lado em cada mapa
- **Cores**: Azul vs Vermelho para diferenciação

## 🎨 Design e UX

### **Tema Light**
- Cores principais: Branco, Cinza e Azul
- Design limpo e profissional
- Inspirado no prosettings.net
- Consistência visual em toda aplicação

### **Responsividade**
- Layout adaptável para desktop e mobile
- Grid responsivo para gráficos
- Navegação otimizada para touch
- Breakpoints bem definidos

### **Estados Visuais**
- **Loading states** com spinners animados
- **Error states** com retry automático
- **Empty states** com call-to-action
- **Progress bars** para estatísticas
- **Badges coloridos** para indicadores

### **Interatividade**
- **Tooltips** informativos nos gráficos
- **Hover effects** em elementos interativos
- **Transições suaves** entre estados
- **Feedback visual** para ações do usuário

## 🔧 Configuração e Instalação

### **Pré-requisitos**
- Node.js 20.18.0+
- pnpm (gerenciador de pacotes)

### **Instalação**
```bash
# Clonar o repositório
git clone <repository-url>
cd cs2-player-analysis

# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm run dev

# Build para produção
pnpm run build
```

### **Scripts Disponíveis**
- `pnpm run dev` - Servidor de desenvolvimento
- `pnpm run build` - Build para produção
- `pnpm run preview` - Preview do build
- `pnpm run lint` - Verificação de código

## 📈 Performance e Otimizações

### **TanStack Query**
- **Cache inteligente** com diferentes stale times
- **Background refetch** para dados sempre atualizados
- **Deduplicação** de requisições automática
- **Prefetch** ao hover para melhor UX
- **Query invalidation** granular

### **Gráficos**
- **Responsive containers** para adaptação automática
- **Lazy loading** de dados pesados
- **Memoização** de cálculos complexos
- **Throttling** de atualizações em tempo real

### **Bundle**
- **Code splitting** por rotas
- **Tree shaking** automático
- **Minificação** otimizada
- **Compressão** de assets

## 🧪 Testes Realizados

### **Funcionalidades Testadas**
- ✅ Navegação entre todas as páginas
- ✅ Gráficos carregando corretamente no perfil do jogador
- ✅ Aba "Gráficos" funcionando em perfis
- ✅ Comparação de jogadores na página VS
- ✅ TanStack Query cache funcionando
- ✅ Estados de loading e error
- ✅ Responsividade em diferentes tamanhos
- ✅ DevTools mostrando queries ativas

### **Gráficos Validados**
- ✅ Winrate por mapa (Bar Chart)
- ✅ Performance mensal (Line Chart)
- ✅ Performance por tipo de round (Bar Chart)
- ✅ Radar de habilidades (Radar Chart)
- ✅ Distribuição de mapas (Pie Chart)
- ✅ Comparação por mapa (Comparative Bar Chart)

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   └── Header.jsx          # Cabeçalho da aplicação
├── pages/
│   ├── Home.jsx           # Página inicial
│   ├── Jogadores.jsx      # Lista de jogadores
│   ├── PlayerProfile.jsx  # Perfil do jogador (com gráficos)
│   ├── Times.jsx          # Lista de times
│   ├── TeamProfile.jsx    # Perfil do time (com gráficos)
│   └── VS.jsx             # Comparação (com gráficos)
├── hooks/
│   └── useQueries.js      # Hooks TanStack Query
├── services/
│   └── api.js             # API simulada com dados
└── App.jsx                # Componente principal
```

## 🔮 Próximos Passos

### **Melhorias Futuras**
- Integração com API real do CS2
- Mais tipos de gráficos (Scatter, Area)
- Filtros avançados por período
- Exportação de gráficos como imagem
- Comparação de múltiplos jogadores/times
- Análise preditiva com IA
- Notificações em tempo real
- Sistema de favoritos

### **Otimizações**
- Service Worker para cache offline
- Lazy loading de componentes pesados
- Virtualização de listas grandes
- Compressão de imagens automática

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia o guia de contribuição antes de submeter pull requests.

---

**Desenvolvido com ❤️ para a comunidade CS2**


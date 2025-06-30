import { Link } from "react-router-dom";
import {
  Users,
  Trophy,
  Zap,
  BarChart3,
  TrendingUp,
  Target,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStatsOverview } from "../hooks/useQueries";

const Home = () => {
  // Usando TanStack Query para buscar estatísticas gerais
  const { data: statsData, isLoading, isError, error } = useStatsOverview();

  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Análise de Jogadores",
      description:
        "Estatísticas detalhadas, histórico de partidas e performance individual de cada jogador profissional.",
      link: "/jogadores",
    },
    {
      icon: <Trophy className="w-8 h-8 text-blue-600" />,
      title: "Times Profissionais",
      description:
        "Informações completas sobre equipes, rankings, conquistas e composição atual dos times.",
      link: "/times",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Comparações VS",
      description:
        "Compare jogadores e times lado a lado com métricas detalhadas e análises comparativas.",
      link: "/vs",
    },
  ];

  // Estatísticas padrão caso não haja dados ou esteja carregando
  const defaultStats = [
    { number: "500+", label: "Jogadores Analisados" },
    { number: "100+", label: "Times Profissionais" },
    { number: "10K+", label: "Partidas Registradas" },
    { number: "50+", label: "Torneios Cobertos" },
  ];

  // Estatísticas dinâmicas do TanStack Query
  const dynamicStats = statsData?.data
    ? [
        {
          number: `${statsData.data.totalPlayers}+`,
          label: "Jogadores Analisados",
        },
        {
          number: `${statsData.data.totalTeams}+`,
          label: "Times Profissionais",
        },
        {
          number: `${(statsData.data.totalMatches / 1000).toFixed(0)}K+`,
          label: "Partidas Registradas",
        },
        {
          number: `${statsData.data.totalTournaments}+`,
          label: "Torneios Cobertos",
        },
      ]
    : defaultStats;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Análise Profissional de
              <span className="text-blue-600"> Counter-Strike 2</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A plataforma mais completa para análise de jogadores e times
              profissionais de CS2. Estatísticas detalhadas, comparações
              avançadas e insights estratégicos em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Link to="/jogadores">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Explorar Jogadores
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/times">
                  <Trophy className="w-5 h-5 mr-2" />
                  Ver Times
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mr-3" />
              <span className="text-lg">Carregando estatísticas...</span>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center py-8">
              <p className="text-red-200 mb-2">Erro ao carregar estatísticas</p>
              <p className="text-blue-100 text-sm">
                {error?.message || "Usando dados padrão"}
              </p>
            </div>
          )}

          {/* Stats Grid */}
          {!isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {dynamicStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2 animate-pulse">
                    {stat.number}
                  </div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recursos Principais
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra todas as ferramentas disponíveis para análise
              profissional de CS2
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow hover-card"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full btn-hover-scale"
                >
                  <Link to={feature.link}>
                    Explorar
                    <TrendingUp className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Analisar?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Comece agora a explorar estatísticas detalhadas e compare seus
            jogadores e times favoritos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 btn-hover-scale"
            >
              <Link to="/vs">
                <Target className="w-5 h-5 mr-2" />
                Fazer Comparação
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              <Link to="/jogadores">Ver Jogadores</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

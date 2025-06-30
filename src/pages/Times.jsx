import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Trophy,
  Users,
  MapPin,
  Calendar,
  TrendingUp,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTeams, usePrefetchTeam } from "../hooks/useQueries";

const Times = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  // Preparar filtros para o TanStack Query
  const filters = useMemo(
    () => ({
      search: searchTerm.trim(),
      region: selectedRegion,
    }),
    [searchTerm, selectedRegion]
  );

  // Usar TanStack Query para buscar times
  const {
    data: teamsResponse,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useTeams(filters);

  // Hook para prefetch de times (otimização)
  const prefetchTeam = usePrefetchTeam();

  const regions = [
    { value: "all", label: "Todas as Regiões" },
    { value: "Europe", label: "Europa" },
    { value: "Americas", label: "Américas" },
    { value: "Asia", label: "Ásia" },
  ];

  const teams = teamsResponse?.data || [];

  const getRankingColor = (ranking) => {
    if (ranking <= 3) return "text-yellow-600 bg-yellow-50";
    if (ranking <= 10) return "text-blue-600 bg-blue-50";
    return "text-gray-600 bg-gray-50";
  };

  // Função para prefetch ao hover
  const handleTeamHover = (teamId) => {
    prefetchTeam(teamId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Times Profissionais
              </h1>
              <p className="text-gray-600">
                Rankings e informações das melhores equipes de Counter-Strike 2
              </p>
            </div>

            {/* Refresh Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Atualizar
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nome do time ou jogadores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent input-focus"
                />
                {isFetching && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-blue-500" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {regions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          {teamsResponse && (
            <div className="mt-4 text-sm text-gray-600">
              {teams.length} time(s) encontrado(s)
              {filters.search && ` para "${filters.search}"`}
              {filters.region !== "all" &&
                ` na região ${
                  regions.find((r) => r.value === filters.region)?.label
                }`}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-3" />
            <span className="text-lg text-gray-600">Carregando times...</span>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="text-red-800 font-semibold">
                  Erro ao carregar times
                </h3>
                <p className="text-red-600 text-sm mt-1">
                  {error?.message || "Ocorreu um erro inesperado"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  className="mt-3 border-red-300 text-red-700 hover:bg-red-50"
                >
                  Tentar novamente
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Teams Grid */}
        {!isLoading && !isError && (
          <div className="grid gap-6">
            {teams.map((team) => (
              <div
                key={team.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow hover-card"
                onMouseEnter={() => handleTeamHover(team.id)}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Team Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">
                        {team.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {team.name}
                        </h3>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getRankingColor(
                            team.ranking
                          )}`}
                        >
                          #{team.ranking}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{team.fullName}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{team.country}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Fundado em {team.founded}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{team.winRate}% de vitórias</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Players */}
                  <div className="lg:w-80">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Lineup Atual
                    </h4>
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                      {team.players.map((player, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 bg-gray-50 rounded stat-card"
                        >
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {player.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {player}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Titles */}
                  <div className="lg:w-64">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Títulos Recentes
                    </h4>
                    <div className="space-y-2">
                      {team.recentTitles.map((title, index) => (
                        <div
                          key={index}
                          className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm"
                        >
                          <span className="font-medium text-yellow-800">
                            {title}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <div className="text-center p-3 bg-blue-50 rounded stat-card">
                        <div className="text-2xl font-bold text-blue-600">
                          {team.rating}
                        </div>
                        <div className="text-xs text-blue-600">Rating HLTV</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="btn-hover-scale"
                    asChild
                  >
                    <Link to={`/times/${team.id}`}>
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Ver Perfil Completo
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    Ver Partidas Recentes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && teams.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum time encontrado
            </h3>
            <p className="text-gray-500 mb-4">
              Tente ajustar os filtros ou termos de busca para encontrar times.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedRegion("all");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Times;

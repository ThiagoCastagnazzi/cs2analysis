import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Star,
  TrendingUp,
  Award,
  MapPin,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayers, usePrefetchPlayer } from "../hooks/useQueries";

const Jogadores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  // Preparar filtros para o TanStack Query
  const filters = useMemo(
    () => ({
      search: searchTerm.trim(),
      role: selectedRole,
    }),
    [searchTerm, selectedRole]
  );

  // Usar TanStack Query para buscar jogadores
  const {
    data: playersResponse,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = usePlayers(filters);

  // Hook para prefetch de jogadores (otimização)
  const prefetchPlayer = usePrefetchPlayer();

  const roles = [
    { value: "all", label: "Todas as Funções" },
    { value: "AWPer", label: "AWPer" },
    { value: "Rifler", label: "Rifler" },
    { value: "Entry", label: "Entry Fragger" },
    { value: "Support", label: "Support" },
    { value: "IGL", label: "IGL" },
  ];

  const players = playersResponse?.data || [];

  const getRatingColor = (rating) => {
    if (rating >= 1.25) return "text-green-600 bg-green-50";
    if (rating >= 1.15) return "text-blue-600 bg-blue-50";
    if (rating >= 1.05) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  // Função para prefetch ao hover
  const handlePlayerHover = (playerId) => {
    prefetchPlayer(playerId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Jogadores Profissionais
              </h1>
              <p className="text-gray-600">
                Análise detalhada dos melhores jogadores de Counter-Strike 2
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
                  placeholder="Buscar por nome, nome real ou time..."
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
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          {playersResponse && (
            <div className="mt-4 text-sm text-gray-600">
              {players.length} jogador(es) encontrado(s)
              {filters.search && ` para "${filters.search}"`}
              {filters.role !== "all" &&
                ` na função ${
                  roles.find((r) => r.value === filters.role)?.label
                }`}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-3" />
            <span className="text-lg text-gray-600">
              Carregando jogadores...
            </span>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="text-red-800 font-semibold">
                  Erro ao carregar jogadores
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

        {/* Players Grid */}
        {!isLoading && !isError && (
          <div className="grid gap-6">
            {players.map((player) => (
              <div
                key={player.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow hover-card"
                onMouseEnter={() => handlePlayerHover(player.id)}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Player Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-600">
                        {player.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {player.name}
                      </h3>
                      <p className="text-gray-600">{player.realName}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-600">
                            {player.team}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {player.country}
                          </span>
                        </div>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full badge-secondary">
                          {player.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full md:w-auto">
                    <div className="text-center stat-card p-2 rounded">
                      <div
                        className={`text-lg font-bold px-2 py-1 rounded ${getRatingColor(
                          player.rating
                        )}`}
                      >
                        {player.rating}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Rating</div>
                    </div>
                    <div className="text-center stat-card p-2 rounded">
                      <div className="text-lg font-bold text-gray-900">
                        {player.kd}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">K/D</div>
                    </div>
                    <div className="text-center stat-card p-2 rounded">
                      <div className="text-lg font-bold text-gray-900">
                        {player.adr}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">ADR</div>
                    </div>
                    <div className="text-center stat-card p-2 rounded">
                      <div className="text-lg font-bold text-gray-900">
                        {player.headshot}%
                      </div>
                      <div className="text-xs text-gray-500 mt-1">HS%</div>
                    </div>
                    <div className="text-center stat-card p-2 rounded">
                      <div className="text-lg font-bold text-gray-900">
                        {player.matches}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Partidas</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="btn-hover-scale"
                      asChild
                    >
                      <Link to={`/jogadores/${player.id}`}>
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Ver Perfil
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="icon-bounce">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && players.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum jogador encontrado
            </h3>
            <p className="text-gray-500 mb-4">
              Tente ajustar os filtros ou termos de busca para encontrar
              jogadores.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedRole("all");
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

export default Jogadores;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { playersApi, teamsApi, statsApi } from "../services/api";

// Query Keys - Centralizadas para facilitar invalidação e cache
export const queryKeys = {
  players: {
    all: ["players"],
    lists: () => [...queryKeys.players.all, "list"],
    list: (filters) => [...queryKeys.players.lists(), filters],
    details: () => [...queryKeys.players.all, "detail"],
    detail: (id) => [...queryKeys.players.details(), id],
    byTeam: (teamName) => [...queryKeys.players.all, "team", teamName],
    recentMatches: (id) => [...queryKeys.players.all, "matches", id],
    detailedStats: (id) => [...queryKeys.players.all, "stats", id],
    mapStats: (id) => [...queryKeys.players.all, "mapStats", id],
    performance: (id) => [...queryKeys.players.all, "performance", id],
  },
  teams: {
    all: ["teams"],
    lists: () => [...queryKeys.teams.all, "list"],
    list: (filters) => [...queryKeys.teams.lists(), filters],
    details: () => [...queryKeys.teams.all, "detail"],
    detail: (id) => [...queryKeys.teams.details(), id],
    rankings: () => [...queryKeys.teams.all, "rankings"],
    recentMatches: (id) => [...queryKeys.teams.all, "matches", id],
    players: (id) => [...queryKeys.teams.all, "players", id],
    mapStats: (id) => [...queryKeys.teams.all, "mapStats", id],
    performance: (id) => [...queryKeys.teams.all, "performance", id],
  },
  stats: {
    all: ["stats"],
    overview: () => [...queryKeys.stats.all, "overview"],
    comparePlayers: (id1, id2) => [
      ...queryKeys.stats.all,
      "compare",
      "players",
      id1,
      id2,
    ],
    compareTeams: (id1, id2) => [
      ...queryKeys.stats.all,
      "compare",
      "teams",
      id1,
      id2,
    ],
  },
};

// ============ HOOKS PARA JOGADORES ============

// Hook para buscar todos os jogadores com filtros
export const usePlayers = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.players.list(filters),
    queryFn: () => playersApi.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 10 * 60 * 1000, // 10 minutos
    keepPreviousData: true, // Mantém dados anteriores durante nova busca
  });
};

// Hook para buscar jogador específico
export const usePlayer = (id) => {
  return useQuery({
    queryKey: queryKeys.players.detail(id),
    queryFn: () => playersApi.getById(id),
    enabled: !!id, // Só executa se ID estiver presente
    staleTime: 10 * 60 * 1000, // 10 minutos para dados específicos
  });
};

// Hook para buscar jogadores por time
export const usePlayersByTeam = (teamName) => {
  return useQuery({
    queryKey: queryKeys.players.byTeam(teamName),
    queryFn: () => playersApi.getByTeam(teamName),
    enabled: !!teamName,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook para buscar partidas recentes do jogador
export const usePlayerRecentMatches = (playerId) => {
  return useQuery({
    queryKey: queryKeys.players.recentMatches(playerId),
    queryFn: () => playersApi.getRecentMatches(playerId),
    enabled: !!playerId,
    staleTime: 2 * 60 * 1000, // 2 minutos - dados mais dinâmicos
    cacheTime: 5 * 60 * 1000,
  });
};

// Hook para buscar estatísticas detalhadas do jogador
export const usePlayerDetailedStats = (playerId) => {
  return useQuery({
    queryKey: queryKeys.players.detailedStats(playerId),
    queryFn: () => playersApi.getDetailedStats(playerId),
    enabled: !!playerId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

// Hook para buscar estatísticas por mapa do jogador
export const usePlayerMapStats = (playerId) => {
  return useQuery({
    queryKey: queryKeys.players.mapStats(playerId),
    queryFn: () => playersApi.getMapStats(playerId),
    enabled: !!playerId,
    staleTime: 10 * 60 * 1000, // Dados de mapa mudam menos frequentemente
    cacheTime: 15 * 60 * 1000,
  });
};

// Hook para buscar dados de performance do jogador
export const usePlayerPerformance = (playerId) => {
  return useQuery({
    queryKey: queryKeys.players.performance(playerId),
    queryFn: () => playersApi.getPerformanceData(playerId),
    enabled: !!playerId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

// ============ HOOKS PARA TIMES ============

// Hook para buscar todos os times com filtros
export const useTeams = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.teams.list(filters),
    queryFn: () => teamsApi.getAll(filters),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    keepPreviousData: true,
  });
};

// Hook para buscar time específico
export const useTeam = (id) => {
  return useQuery({
    queryKey: queryKeys.teams.detail(id),
    queryFn: () => teamsApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

// Hook para buscar rankings de times
export const useTeamRankings = () => {
  return useQuery({
    queryKey: queryKeys.teams.rankings(),
    queryFn: () => teamsApi.getRankings(),
    staleTime: 2 * 60 * 1000, // Rankings mudam mais frequentemente
    cacheTime: 5 * 60 * 1000,
  });
};

// Hook para buscar partidas recentes do time
export const useTeamRecentMatches = (teamId) => {
  return useQuery({
    queryKey: queryKeys.teams.recentMatches(teamId),
    queryFn: () => teamsApi.getRecentMatches(teamId),
    enabled: !!teamId,
    staleTime: 2 * 60 * 1000, // Partidas recentes mudam frequentemente
    cacheTime: 5 * 60 * 1000,
  });
};

// Hook para buscar jogadores do time
export const useTeamPlayers = (teamId) => {
  return useQuery({
    queryKey: queryKeys.teams.players(teamId),
    queryFn: () => teamsApi.getTeamPlayers(teamId),
    enabled: !!teamId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

// Hook para buscar estatísticas por mapa do time
export const useTeamMapStats = (teamId) => {
  return useQuery({
    queryKey: queryKeys.teams.mapStats(teamId),
    queryFn: () => teamsApi.getMapStats(teamId),
    enabled: !!teamId,
    staleTime: 10 * 60 * 1000, // Dados de mapa mudam menos frequentemente
    cacheTime: 15 * 60 * 1000,
  });
};

// Hook para buscar dados de performance do time
export const useTeamPerformance = (teamId) => {
  return useQuery({
    queryKey: queryKeys.teams.performance(teamId),
    queryFn: () => teamsApi.getPerformanceData(teamId),
    enabled: !!teamId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

// ============ HOOKS PARA ESTATÍSTICAS ============

// Hook para estatísticas gerais
export const useStatsOverview = () => {
  return useQuery({
    queryKey: queryKeys.stats.overview(),
    queryFn: () => statsApi.getOverview(),
    staleTime: 15 * 60 * 1000, // Estatísticas gerais mudam menos
    cacheTime: 30 * 60 * 1000,
  });
};

// Hook para comparação de jogadores
export const useComparePlayersQuery = (playerId1, playerId2) => {
  return useQuery({
    queryKey: queryKeys.stats.comparePlayers(playerId1, playerId2),
    queryFn: () => statsApi.comparePlayers(playerId1, playerId2),
    enabled: !!(playerId1 && playerId2 && playerId1 !== playerId2),
    staleTime: 5 * 60 * 1000,
  });
};

// Hook para comparação de times
export const useCompareTeamsQuery = (teamId1, teamId2) => {
  return useQuery({
    queryKey: queryKeys.stats.compareTeams(teamId1, teamId2),
    queryFn: () => statsApi.compareTeams(teamId1, teamId2),
    enabled: !!(teamId1 && teamId2 && teamId1 !== teamId2),
    staleTime: 5 * 60 * 1000,
  });
};

// ============ HOOKS PARA MUTAÇÕES ============

// Hook para invalidar cache de jogadores (útil após atualizações)
export const useInvalidatePlayers = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
  };
};

// Hook para invalidar cache de times
export const useInvalidateTeams = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.teams.all });
  };
};

// Hook para prefetch de dados (útil para otimização)
export const usePrefetchPlayer = () => {
  const queryClient = useQueryClient();

  return (id) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.players.detail(id),
      queryFn: () => playersApi.getById(id),
      staleTime: 10 * 60 * 1000,
    });
  };
};

// Hook para prefetch de time
export const usePrefetchTeam = () => {
  const queryClient = useQueryClient();

  return (id) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.teams.detail(id),
      queryFn: () => teamsApi.getById(id),
      staleTime: 10 * 60 * 1000,
    });
  };
};

// ============ HOOKS UTILITÁRIOS ============

// Hook para verificar se há dados em cache
export const useHasCachedData = (queryKey) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(queryKey);
  return !!data;
};

// Hook para obter dados do cache sem fazer nova requisição
export const useCachedData = (queryKey) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(queryKey);
};

// Hook para limpar cache específico
export const useClearCache = () => {
  const queryClient = useQueryClient();

  return {
    clearPlayers: () =>
      queryClient.removeQueries({ queryKey: queryKeys.players.all }),
    clearTeams: () =>
      queryClient.removeQueries({ queryKey: queryKeys.teams.all }),
    clearStats: () =>
      queryClient.removeQueries({ queryKey: queryKeys.stats.all }),
    clearAll: () => queryClient.clear(),
  };
};

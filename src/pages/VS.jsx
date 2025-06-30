import { useState } from "react";
import {
  Users,
  User,
  Search,
  Zap,
  BarChart3,
  Trophy,
  Target,
  Loader2,
  AlertCircle,
  TrendingUp,
  PieChart,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  usePlayers,
  useTeams,
  useComparePlayersQuery,
  useCompareTeamsQuery,
  usePlayerMapStats,
  useTeamMapStats,
} from "../hooks/useQueries";

const VS = () => {
  const [comparisonType, setComparisonType] = useState("players"); // 'players' or 'teams'
  const [selectedPlayer1, setSelectedPlayer1] = useState("");
  const [selectedPlayer2, setSelectedPlayer2] = useState("");
  const [selectedTeam1, setSelectedTeam1] = useState("");
  const [selectedTeam2, setSelectedTeam2] = useState("");

  // Buscar dados para os dropdowns
  const { data: playersResponse, isLoading: playersLoading } = usePlayers();
  const { data: teamsResponse, isLoading: teamsLoading } = useTeams();

  // Buscar comparações quando ambos estão selecionados
  const {
    data: playerComparison,
    isLoading: playerComparisonLoading,
    isError: playerComparisonError,
    error: playerComparisonErrorMsg,
  } = useComparePlayersQuery(
    selectedPlayer1
      ? playersResponse?.data?.find((p) => p.name === selectedPlayer1)?.id
      : null,
    selectedPlayer2
      ? playersResponse?.data?.find((p) => p.name === selectedPlayer2)?.id
      : null
  );

  const {
    data: teamComparison,
    isLoading: teamComparisonLoading,
    isError: teamComparisonError,
    error: teamComparisonErrorMsg,
  } = useCompareTeamsQuery(
    selectedTeam1
      ? teamsResponse?.data?.find((t) => t.name === selectedTeam1)?.id
      : null,
    selectedTeam2
      ? teamsResponse?.data?.find((t) => t.name === selectedTeam2)?.id
      : null
  );

  // Buscar estatísticas de mapas para comparação
  const { data: player1MapStats } = usePlayerMapStats(
    selectedPlayer1
      ? playersResponse?.data?.find((p) => p.name === selectedPlayer1)?.id
      : null
  );
  const { data: player2MapStats } = usePlayerMapStats(
    selectedPlayer2
      ? playersResponse?.data?.find((p) => p.name === selectedPlayer2)?.id
      : null
  );
  const { data: team1MapStats } = useTeamMapStats(
    selectedTeam1
      ? teamsResponse?.data?.find((t) => t.name === selectedTeam1)?.id
      : null
  );
  const { data: team2MapStats } = useTeamMapStats(
    selectedTeam2
      ? teamsResponse?.data?.find((t) => t.name === selectedTeam2)?.id
      : null
  );

  const players = playersResponse?.data || [];
  const teams = teamsResponse?.data || [];

  const canCompare =
    comparisonType === "players"
      ? selectedPlayer1 &&
        selectedPlayer2 &&
        selectedPlayer1 !== selectedPlayer2
      : selectedTeam1 && selectedTeam2 && selectedTeam1 !== selectedTeam2;

  const isComparisonLoading =
    comparisonType === "players"
      ? playerComparisonLoading
      : teamComparisonLoading;

  const comparisonError =
    comparisonType === "players" ? playerComparisonError : teamComparisonError;

  const comparisonErrorMsg =
    comparisonType === "players"
      ? playerComparisonErrorMsg
      : teamComparisonErrorMsg;

  const getStatComparison = (stat1, stat2) => {
    if (stat1 > stat2) return "text-green-600 bg-green-50";
    if (stat1 < stat2) return "text-red-600 bg-red-50";
    return "text-gray-600 bg-gray-50";
  };

  const formatStatKey = (key) => {
    const keyMap = {
      rating: "Rating",
      kd: "K/D",
      adr: "ADR",
      headshot: "HS%",
      clutches: "Clutches",
      aces: "Aces",
      mvps: "MVPs",
      matches: "Partidas",
      winRate: "Win Rate",
      roundsWon: "Rounds Won",
      mapsWon: "Maps Won",
      avgRating: "Avg Rating",
      tournaments: "Tournaments",
      titles: "Títulos",
    };
    return keyMap[key] || key.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Comparação VS
          </h1>
          <p className="text-gray-600">
            Compare jogadores e times lado a lado com estatísticas detalhadas
          </p>
        </div>

        {/* Comparison Type Selector */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-center mb-6">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setComparisonType("players")}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors ${
                  comparisonType === "players"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <User className="w-5 h-5" />
                Jogador vs Jogador
              </button>
              <button
                onClick={() => setComparisonType("teams")}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors ${
                  comparisonType === "teams"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Users className="w-5 h-5" />
                Time vs Time
              </button>
            </div>
          </div>

          {/* Player Comparison */}
          {comparisonType === "players" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primeiro Jogador
                </label>
                {playersLoading ? (
                  <div className="flex items-center gap-2 p-2 border rounded-lg">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-500">
                      Carregando jogadores...
                    </span>
                  </div>
                ) : (
                  <select
                    value={selectedPlayer1}
                    onChange={(e) => setSelectedPlayer1(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione um jogador</option>
                    {players.map((player) => (
                      <option key={player.id} value={player.name}>
                        {player.name} ({player.team}) - Rating: {player.rating}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Segundo Jogador
                </label>
                {playersLoading ? (
                  <div className="flex items-center gap-2 p-2 border rounded-lg">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-500">
                      Carregando jogadores...
                    </span>
                  </div>
                ) : (
                  <select
                    value={selectedPlayer2}
                    onChange={(e) => setSelectedPlayer2(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione um jogador</option>
                    {players
                      .filter((p) => p.name !== selectedPlayer1)
                      .map((player) => (
                        <option key={player.id} value={player.name}>
                          {player.name} ({player.team}) - Rating:{" "}
                          {player.rating}
                        </option>
                      ))}
                  </select>
                )}
              </div>
            </div>
          )}

          {/* Team Comparison */}
          {comparisonType === "teams" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primeiro Time
                </label>
                {teamsLoading ? (
                  <div className="flex items-center gap-2 p-2 border rounded-lg">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-500">
                      Carregando times...
                    </span>
                  </div>
                ) : (
                  <select
                    value={selectedTeam1}
                    onChange={(e) => setSelectedTeam1(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione um time</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.name}>
                        {team.name} (#{team.ranking}) - Rating: {team.rating}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Segundo Time
                </label>
                {teamsLoading ? (
                  <div className="flex items-center gap-2 p-2 border rounded-lg">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-500">
                      Carregando times...
                    </span>
                  </div>
                ) : (
                  <select
                    value={selectedTeam2}
                    onChange={(e) => setSelectedTeam2(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione um time</option>
                    {teams
                      .filter((t) => t.name !== selectedTeam1)
                      .map((team) => (
                        <option key={team.id} value={team.name}>
                          {team.name} (#{team.ranking}) - Rating: {team.rating}
                        </option>
                      ))}
                  </select>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Loading State for Comparison */}
        {canCompare && isComparisonLoading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-3" />
              <span className="text-lg text-gray-600">
                Carregando comparação...
              </span>
            </div>
          </div>
        )}

        {/* Error State for Comparison */}
        {canCompare && comparisonError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="text-red-800 font-semibold">
                  Erro na comparação
                </h3>
                <p className="text-red-600 text-sm mt-1">
                  {comparisonErrorMsg?.message ||
                    "Não foi possível carregar a comparação"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Results */}
        {canCompare && !isComparisonLoading && !comparisonError && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {comparisonType === "players"
                  ? `${selectedPlayer1} vs ${selectedPlayer2}`
                  : `${selectedTeam1} vs ${selectedTeam2}`}
              </h2>
              <p className="text-gray-600">
                Comparação detalhada de estatísticas
              </p>
            </div>

            {/* Player Stats Comparison */}
            {comparisonType === "players" && playerComparison?.data && (
              <div className="grid md:grid-cols-3 gap-6 vs-comparison">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-blue-600">
                      {playerComparison.data.player1.name
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {playerComparison.data.player1.name}
                  </h3>

                  <div className="space-y-3">
                    {Object.entries(playerComparison.data.player1)
                      .filter(([key]) =>
                        [
                          "rating",
                          "kd",
                          "adr",
                          "headshot",
                          "clutches",
                          "aces",
                          "mvps",
                          "matches",
                        ].includes(key)
                      )
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className={`p-2 rounded stat-card ${getStatComparison(
                            value,
                            playerComparison.data.player2[key]
                          )}`}
                        >
                          <div className="font-bold">
                            {typeof value === "number" && key === "headshot"
                              ? `${value}%`
                              : value}
                          </div>
                          <div className="text-xs capitalize">
                            {formatStatKey(key)}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-gray-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-400">VS</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-red-600">
                      {playerComparison.data.player2.name
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {playerComparison.data.player2.name}
                  </h3>

                  <div className="space-y-3">
                    {Object.entries(playerComparison.data.player2)
                      .filter(([key]) =>
                        [
                          "rating",
                          "kd",
                          "adr",
                          "headshot",
                          "clutches",
                          "aces",
                          "mvps",
                          "matches",
                        ].includes(key)
                      )
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className={`p-2 rounded stat-card ${getStatComparison(
                            value,
                            playerComparison.data.player1[key]
                          )}`}
                        >
                          <div className="font-bold">
                            {typeof value === "number" && key === "headshot"
                              ? `${value}%`
                              : value}
                          </div>
                          <div className="text-xs capitalize">
                            {formatStatKey(key)}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Team Stats Comparison */}
            {comparisonType === "teams" && teamComparison?.data && (
              <div className="grid md:grid-cols-3 gap-6 vs-comparison">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {teamComparison.data.team1.name}
                  </h3>

                  <div className="space-y-3">
                    {Object.entries(teamComparison.data.team1)
                      .filter(([key]) =>
                        [
                          "rating",
                          "winRate",
                          "roundsWon",
                          "mapsWon",
                          "avgRating",
                          "tournaments",
                          "titles",
                        ].includes(key)
                      )
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className={`p-2 rounded stat-card ${getStatComparison(
                            value,
                            teamComparison.data.team2[key]
                          )}`}
                        >
                          <div className="font-bold">
                            {typeof value === "number" && key === "winRate"
                              ? `${value}%`
                              : value}
                          </div>
                          <div className="text-xs capitalize">
                            {formatStatKey(key)}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <BarChart3 className="w-6 h-6 text-gray-600" />
                    </div>
                    <span className="text-2xl font-bold text-gray-400">VS</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {teamComparison.data.team2.name}
                  </h3>

                  <div className="space-y-3">
                    {Object.entries(teamComparison.data.team2)
                      .filter(([key]) =>
                        [
                          "rating",
                          "winRate",
                          "roundsWon",
                          "mapsWon",
                          "avgRating",
                          "tournaments",
                          "titles",
                        ].includes(key)
                      )
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className={`p-2 rounded stat-card ${getStatComparison(
                            value,
                            teamComparison.data.team1[key]
                          )}`}
                        >
                          <div className="font-bold">
                            {typeof value === "number" && key === "winRate"
                              ? `${value}%`
                              : value}
                          </div>
                          <div className="text-xs capitalize">
                            {formatStatKey(key)}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Map Comparison Charts */}
            {canCompare && !isComparisonLoading && !comparisonError && (
              <div className="mt-8 space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Comparação por Mapa
                  </h3>
                  <p className="text-gray-600">
                    Winrate detalhado em cada mapa
                  </p>
                </div>

                {/* Player Map Comparison */}
                {comparisonType === "players" &&
                  player1MapStats?.data &&
                  player2MapStats?.data && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Comparação de Winrate por Mapa
                          </CardTitle>
                          <CardDescription>
                            Performance dos jogadores em diferentes mapas
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                              data={combineMapStats(
                                player1MapStats.data,
                                player2MapStats.data,
                                selectedPlayer1,
                                selectedPlayer2
                              )}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="map" />
                              <YAxis />
                              <Tooltip
                                formatter={(value, name) => [`${value}%`, name]}
                              />
                              <Bar dataKey={selectedPlayer1} fill="#3B82F6" />
                              <Bar dataKey={selectedPlayer2} fill="#EF4444" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Radar de Comparação
                          </CardTitle>
                          <CardDescription>
                            Comparação visual das principais estatísticas
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={300}>
                            <RadarChart
                              data={createPlayerRadarData(
                                playerComparison?.data?.player1,
                                playerComparison?.data?.player2,
                                selectedPlayer1,
                                selectedPlayer2
                              )}
                            >
                              <PolarGrid />
                              <PolarAngleAxis dataKey="skill" />
                              <PolarRadiusAxis angle={90} domain={[0, 150]} />
                              <Radar
                                name={selectedPlayer1}
                                dataKey="player1"
                                stroke="#3B82F6"
                                fill="#3B82F6"
                                fillOpacity={0.3}
                              />
                              <Radar
                                name={selectedPlayer2}
                                dataKey="player2"
                                stroke="#EF4444"
                                fill="#EF4444"
                                fillOpacity={0.3}
                              />
                              <Tooltip />
                            </RadarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                {/* Team Map Comparison */}
                {comparisonType === "teams" &&
                  team1MapStats?.data &&
                  team2MapStats?.data && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Comparação de Winrate por Mapa
                          </CardTitle>
                          <CardDescription>
                            Performance dos times em diferentes mapas
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                              data={combineMapStats(
                                team1MapStats.data,
                                team2MapStats.data,
                                selectedTeam1,
                                selectedTeam2
                              )}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="map" />
                              <YAxis />
                              <Tooltip
                                formatter={(value, name) => [`${value}%`, name]}
                              />
                              <Bar dataKey={selectedTeam1} fill="#3B82F6" />
                              <Bar dataKey={selectedTeam2} fill="#EF4444" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Radar de Comparação
                          </CardTitle>
                          <CardDescription>
                            Comparação visual das principais estatísticas dos
                            times
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={300}>
                            <RadarChart
                              data={createTeamRadarData(
                                teamComparison?.data?.team1,
                                teamComparison?.data?.team2,
                                selectedTeam1,
                                selectedTeam2
                              )}
                            >
                              <PolarGrid />
                              <PolarAngleAxis dataKey="skill" />
                              <PolarRadiusAxis angle={90} domain={[0, 100]} />
                              <Radar
                                name={selectedTeam1}
                                dataKey="team1"
                                stroke="#3B82F6"
                                fill="#3B82F6"
                                fillOpacity={0.3}
                              />
                              <Radar
                                name={selectedTeam2}
                                dataKey="team2"
                                stroke="#EF4444"
                                fill="#EF4444"
                                fillOpacity={0.3}
                              />
                              <Tooltip />
                            </RadarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>
                  )}
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        {!canCompare && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Selecione{" "}
              {comparisonType === "players" ? "dois jogadores" : "dois times"}{" "}
              para comparar
            </h3>
            <p className="text-blue-700">
              Escolha {comparisonType === "players" ? "jogadores" : "times"}{" "}
              diferentes para ver uma comparação detalhada de suas estatísticas.
            </p>
            {(playersLoading || teamsLoading) && (
              <div className="flex justify-center items-center mt-4">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600 mr-2" />
                <span className="text-blue-600 text-sm">
                  Carregando opções...
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Função para combinar estatísticas de mapas para comparação
const combineMapStats = (stats1, stats2, name1, name2) => {
  const maps = [
    "Dust2",
    "Mirage",
    "Inferno",
    "Cache",
    "Overpass",
    "Nuke",
    "Train",
  ];

  return maps.map((map) => {
    const stat1 = stats1.find((s) => s.map === map);
    const stat2 = stats2.find((s) => s.map === map);

    return {
      map,
      [name1]: stat1?.winRate || 0,
      [name2]: stat2?.winRate || 0,
    };
  });
};

// Função para criar dados do radar chart para jogadores
const createPlayerRadarData = (player1, player2) => {
  if (!player1 || !player2) return [];

  return [
    {
      skill: "Rating",
      player1: player1.rating * 100,
      player2: player2.rating * 100,
    },
    {
      skill: "K/D",
      player1: player1.kd * 100,
      player2: player2.kd * 100,
    },
    {
      skill: "ADR",
      player1: player1.adr,
      player2: player2.adr,
    },
    {
      skill: "HS%",
      player1: player1.headshot,
      player2: player2.headshot,
    },
    {
      skill: "Clutches",
      player1: player1.clutches * 10,
      player2: player2.clutches * 10,
    },
    {
      skill: "MVPs",
      player1: player1.mvps / 2,
      player2: player2.mvps / 2,
    },
  ];
};

// Função para criar dados do radar chart para times
const createTeamRadarData = (team1, team2) => {
  if (!team1 || !team2) return [];

  return [
    {
      skill: "Rating",
      team1: team1.rating * 10,
      team2: team2.rating * 10,
    },
    {
      skill: "Win Rate",
      team1: team1.winRate,
      team2: team2.winRate,
    },
    {
      skill: "Maps Won",
      team1: team1.mapsWon / 10,
      team2: team2.mapsWon / 10,
    },
    {
      skill: "Titles",
      team1: team1.titles * 20,
      team2: team2.titles * 20,
    },
    {
      skill: "Tournaments",
      team1: team1.tournaments || 0,
      team2: team2.tournaments || 0,
    },
    {
      skill: "Ranking",
      team1: 100 - team1.ranking * 10,
      team2: 100 - team2.ranking * 10,
    },
  ];
};

export default VS;

import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Trophy,
  Target,
  Zap,
  Award,
  Settings,
  Monitor,
  Mouse,
  Headphones,
  Keyboard,
  Users,
  TrendingUp,
  Clock,
  Star,
  Medal,
  Gamepad2,
  BarChart3,
  Loader2,
  AlertCircle,
  RefreshCw,
  PieChart,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
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
  PieChart as RechartsPieChart,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  usePlayer,
  usePlayerRecentMatches,
  usePlayerDetailedStats,
  usePlayerMapStats,
  usePlayerPerformance,
} from "../hooks/useQueries";

const PlayerProfile = () => {
  const { id } = useParams();

  const {
    data: playerData,
    isLoading: playerLoading,
    isError: playerError,
    error: playerErrorDetails,
    refetch: refetchPlayer,
  } = usePlayer(id);

  const {
    data: matchesData,
    isLoading: matchesLoading,
    isError: matchesError,
    refetch: refetchMatches,
  } = usePlayerRecentMatches(id);

  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats,
  } = usePlayerDetailedStats(id);

  const {
    data: mapStatsData,
    isLoading: mapStatsLoading,
    isError: mapStatsError,
  } = usePlayerMapStats(id);

  const {
    data: performanceData,
    isLoading: performanceLoading,
    isError: performanceError,
  } = usePlayerPerformance(id);

  // Loading state
  if (playerLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            Carregando perfil do jogador...
          </h2>
          <p className="text-gray-500 mt-2">Buscando informações detalhadas</p>
        </div>
      </div>
    );
  }

  // Error state
  if (playerError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Erro ao carregar perfil
              </h2>
              <p className="text-gray-600 mb-4">
                {playerErrorDetails?.message || "Jogador não encontrado"}
              </p>
              <div className="space-y-2">
                <Button onClick={() => refetchPlayer()} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Tentar novamente
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/jogadores">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para jogadores
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const player = playerData?.data;
  const matches = matchesData?.data || [];
  const stats = statsData?.data;

  if (!player) return null;

  // Função para calcular a cor do rating
  const getRatingColor = (rating) => {
    if (rating >= 1.2) return "text-green-600";
    if (rating >= 1.1) return "text-yellow-600";
    if (rating >= 1.0) return "text-orange-600";
    return "text-red-600";
  };

  // Função para formatar data
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link to="/jogadores">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-blue-600">
                Início
              </Link>
              <span>/</span>
              <Link to="/jogadores" className="hover:text-blue-600">
                Jogadores
              </Link>
              <span>/</span>
              <span className="text-gray-900">{player.name}</span>
            </div>
          </div>

          {/* Player Header */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={player.photo}
                  alt={player.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  #{player.id}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {player.name}
                  </h1>
                  <Badge variant="outline" className="text-sm">
                    {player.role}
                  </Badge>
                </div>
                <p className="text-xl text-gray-600">{player.realName}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {player.country}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {player.team}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {player.age} anos
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="lg:ml-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div
                    className={`text-2xl font-bold ${getRatingColor(
                      player.rating
                    )}`}
                  >
                    {player.rating}
                  </div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {player.kd}
                  </div>
                  <div className="text-sm text-gray-500">K/D</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {player.adr}
                  </div>
                  <div className="text-sm text-gray-500">ADR</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {player.headshot}%
                  </div>
                  <div className="text-sm text-gray-500">HS%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="matches">Partidas Recentes</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            <TabsTrigger value="charts">Gráficos</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="career">Carreira</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informações Pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Nome Real:</span>
                      <p className="font-medium">{player.realName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Idade:</span>
                      <p className="font-medium">{player.age} anos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estatísticas Principais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Estatísticas Principais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Rating</span>
                      <span
                        className={`font-bold ${getRatingColor(player.rating)}`}
                      >
                        {player.rating}
                      </span>
                    </div>
                    <Progress value={player.rating * 50} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">K/D Ratio</span>
                      <span className="font-bold">{player.kd}</span>
                    </div>
                    <Progress value={player.kd * 50} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">ADR</span>
                      <span className="font-bold">{player.adr}</span>
                    </div>
                    <Progress value={player.adr} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Headshot %</span>
                      <span className="font-bold">
                        {player.headshotPercentage}%
                      </span>
                    </div>
                    <Progress
                      value={player.headshotPercentage}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Conquistas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Conquistas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <Award className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                      <div className="font-bold text-lg">{player.mvps}</div>
                      <div className="text-xs text-gray-600">MVPs</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <Star className="w-6 h-6 text-red-600 mx-auto mb-1" />
                      <div className="font-bold text-lg">{player.aces}</div>
                      <div className="text-xs text-gray-600">Aces</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Target className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <div className="font-bold text-lg">{player.clutches}</div>
                      <div className="text-xs text-gray-600">Clutches</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <Gamepad2 className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <div className="font-bold text-lg">{player.matches}</div>
                      <div className="text-xs text-gray-600">Partidas</div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <span className="text-sm text-gray-600">
                      Ganhos na Carreira:
                    </span>
                    <p className="font-bold text-lg text-green-600">
                      {player.careerEarnings}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Partidas Recentes</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchMatches()}
                disabled={matchesLoading}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${
                    matchesLoading ? "animate-spin" : ""
                  }`}
                />
                Atualizar
              </Button>
            </div>

            {matchesLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Carregando partidas recentes...</p>
              </div>
            ) : matchesError ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Erro ao carregar partidas recentes
                    </p>
                    <Button onClick={() => refetchMatches()} className="mt-4">
                      Tentar novamente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : matches.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Gamepad2 className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Nenhuma partida recente encontrada
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {matches.map((match) => (
                  <Card
                    key={match.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              match.result === "W"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">
                                {match.tournament}
                              </span>
                              {match.mvp && (
                                <Medal className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              vs {match.opponent} • {match.map} •{" "}
                              {formatDate(match.date)}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className={`font-bold text-lg ${
                              match.result === "W"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {match.score}
                          </div>
                          <div className="text-sm text-gray-600">
                            {match.result === "W" ? "Vitória" : "Derrota"}
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-lg">{match.kills}</div>
                          <div className="text-gray-600">K</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">
                            {match.deaths}
                          </div>
                          <div className="text-gray-600">D</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">
                            {match.assists}
                          </div>
                          <div className="text-gray-600">A</div>
                        </div>
                        <div className="text-center">
                          <div
                            className={`font-bold text-lg ${getRatingColor(
                              match.rating
                            )}`}
                          >
                            {match.rating}
                          </div>
                          <div className="text-gray-600">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">{match.adr}</div>
                          <div className="text-gray-600">ADR</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">{match.kast}%</div>
                          <div className="text-gray-600">KAST</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">
                            {match.headshots}
                          </div>
                          <div className="text-gray-600">HS</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Estatísticas Detalhadas</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchStats()}
                disabled={statsLoading}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${
                    statsLoading ? "animate-spin" : ""
                  }`}
                />
                Atualizar
              </Button>
            </div>

            {statsLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">
                  Carregando estatísticas detalhadas...
                </p>
              </div>
            ) : statsError ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Erro ao carregar estatísticas
                    </p>
                    <Button onClick={() => refetchStats()} className="mt-4">
                      Tentar novamente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : stats ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Estatísticas Recentes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Últimas {stats.recent.matches} Partidas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-bold text-lg">
                          {stats.recent.avgKills}
                        </div>
                        <div className="text-sm text-gray-600">
                          Kills/Partida
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-bold text-lg">
                          {stats.recent.avgDeaths}
                        </div>
                        <div className="text-sm text-gray-600">
                          Deaths/Partida
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-bold text-lg">
                          {stats.recent.avgAssists}
                        </div>
                        <div className="text-sm text-gray-600">
                          Assists/Partida
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div
                          className={`font-bold text-lg ${getRatingColor(
                            parseFloat(stats.recent.avgRating)
                          )}`}
                        >
                          {stats.recent.avgRating}
                        </div>
                        <div className="text-sm text-gray-600">
                          Rating Médio
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="font-bold text-lg text-green-600">
                          {stats.recent.winRate}%
                        </div>
                        <div className="text-sm text-gray-600">
                          Taxa de Vitória
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg text-yellow-600">
                          {stats.recent.mvpRate}%
                        </div>
                        <div className="text-sm text-gray-600">Taxa de MVP</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Estatísticas da Carreira */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Carreira Total
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-bold text-lg">
                          {stats.career.totalMatches}
                        </div>
                        <div className="text-sm text-gray-600">Partidas</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-bold text-lg">
                          {stats.career.totalKills.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Kills</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="font-bold text-lg">
                          {stats.career.totalDeaths.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Deaths</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-bold text-lg">
                          {stats.career.totalAssists.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Assists</div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="font-bold text-lg text-yellow-600">
                          {stats.career.totalMvps}
                        </div>
                        <div className="text-sm text-gray-600">MVPs</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg text-red-600">
                          {stats.career.totalAces}
                        </div>
                        <div className="text-sm text-gray-600">Aces</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg text-blue-600">
                          {stats.career.totalClutches}
                        </div>
                        <div className="text-sm text-gray-600">Clutches</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Estatísticas Avançadas */}
                {player.advancedStats && (
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Estatísticas Avançadas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">KAST</span>
                            <span className="font-medium">
                              {player.advancedStats.kast}%
                            </span>
                          </div>
                          <Progress
                            value={player.advancedStats.kast}
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              First Kills
                            </span>
                            <span className="font-medium">
                              {player.advancedStats.firstKills}
                            </span>
                          </div>
                          <Progress
                            value={player.advancedStats.firstKills * 100}
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Entry Kills
                            </span>
                            <span className="font-medium">
                              {player.advancedStats.entryKills}
                            </span>
                          </div>
                          <Progress
                            value={player.advancedStats.entryKills * 100}
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Clutch Success
                            </span>
                            <span className="font-medium">
                              {(
                                player.advancedStats.clutchSuccess * 100
                              ).toFixed(0)}
                              %
                            </span>
                          </div>
                          <Progress
                            value={player.advancedStats.clutchSuccess * 100}
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Rifle Kills
                            </span>
                            <span className="font-medium">
                              {(player.advancedStats.rifleKills * 100).toFixed(
                                0
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={player.advancedStats.rifleKills * 100}
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Sniper Kills
                            </span>
                            <span className="font-medium">
                              {(player.advancedStats.sniperKills * 100).toFixed(
                                0
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={player.advancedStats.sniperKills * 100}
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Multi-Kill Rounds
                            </span>
                            <span className="font-medium">
                              {(
                                player.advancedStats.multiKillRounds * 100
                              ).toFixed(0)}
                              %
                            </span>
                          </div>
                          <Progress
                            value={player.advancedStats.multiKillRounds * 100}
                            className="h-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Opening Kill Rating
                            </span>
                            <span
                              className={`font-medium ${getRatingColor(
                                player.advancedStats.openingKillRating
                              )}`}
                            >
                              {player.advancedStats.openingKillRating}
                            </span>
                          </div>
                          <Progress
                            value={player.advancedStats.openingKillRating * 50}
                            className="h-2"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : null}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Configurações e Equipamentos</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configurações de Jogo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configurações de Jogo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">
                        Sensibilidade:
                      </span>
                      <p className="font-medium">
                        {player.gameSettings?.sensitivity}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">DPI:</span>
                      <p className="font-medium">{player.gameSettings?.dpi}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">eDPI:</span>
                      <p className="font-medium">{player.gameSettings?.edpi}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Resolução:</span>
                      <p className="font-medium">
                        {player.gameSettings?.resolution}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Aspect Ratio:
                      </span>
                      <p className="font-medium">
                        {player.gameSettings?.aspectRatio}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">
                        Refresh Rate:
                      </span>
                      <p className="font-medium">
                        {player.gameSettings?.refreshRate}
                      </p>
                    </div>
                  </div>

                  {player.gameSettings?.crosshair && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">Crosshair</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Tamanho:</span>
                            <span className="ml-2 font-medium">
                              {player.gameSettings.crosshair.size}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Espessura:</span>
                            <span className="ml-2 font-medium">
                              {player.gameSettings.crosshair.thickness}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Gap:</span>
                            <span className="ml-2 font-medium">
                              {player.gameSettings.crosshair.gap}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Cor:</span>
                            <span className="ml-2 font-medium">
                              {player.gameSettings.crosshair.color}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Equipamentos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    Equipamentos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {player.equipment && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mouse className="w-5 h-5 text-gray-500" />
                        <div>
                          <span className="text-sm text-gray-600">Mouse:</span>
                          <p className="font-medium">
                            {player.equipment.mouse}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Keyboard className="w-5 h-5 text-gray-500" />
                        <div>
                          <span className="text-sm text-gray-600">
                            Teclado:
                          </span>
                          <p className="font-medium">
                            {player.equipment.keyboard}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Headphones className="w-5 h-5 text-gray-500" />
                        <div>
                          <span className="text-sm text-gray-600">
                            Headset:
                          </span>
                          <p className="font-medium">
                            {player.equipment.headset}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Monitor className="w-5 h-5 text-gray-500" />
                        <div>
                          <span className="text-sm text-gray-600">
                            Monitor:
                          </span>
                          <p className="font-medium">
                            {player.equipment.monitor}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-gray-500" />
                        <div>
                          <span className="text-sm text-gray-600">
                            Mousepad:
                          </span>
                          <p className="font-medium">
                            {player.equipment.mousepad}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Career Tab */}
          <TabsContent value="career" className="space-y-6">
            <h2 className="text-2xl font-bold">Histórico da Carreira</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informações do Time Atual */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Time Atual
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-blue-600">
                      {player.team}
                    </h3>
                    <p className="text-gray-600">
                      Desde {formatDate(player.joinedTeamDate)}
                    </p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Função:</span>
                      <p className="font-medium">{player.role}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Steam ID:</span>
                      <p className="font-medium text-xs">{player.steamId}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Histórico de Times */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Histórico de Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {player.teamHistory && (
                    <div className="space-y-4">
                      {player.teamHistory.map((team, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-blue-200 pl-4"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{team.team}</h4>
                              <p className="text-sm text-gray-600">
                                {team.period}
                              </p>
                            </div>
                          </div>
                          {team.achievements &&
                            team.achievements.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">
                                  Conquistas:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {team.achievements.map((achievement, i) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {achievement}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Charts Tab */}
          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Winrate por Mapa */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Winrate por Mapa
                  </CardTitle>
                  <CardDescription>
                    Performance do jogador em diferentes mapas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mapStatsLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                  ) : mapStatsError ? (
                    <div className="flex items-center justify-center h-64 text-red-500">
                      <AlertCircle className="w-8 h-8 mr-2" />
                      Erro ao carregar dados
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={mapStatsData?.data || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="map" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "winRate" ? `${value}%` : value,
                            name === "winRate" ? "Win Rate" : name,
                          ]}
                        />
                        <Bar dataKey="winRate" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Performance ao Longo do Tempo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Performance Mensal
                  </CardTitle>
                  <CardDescription>
                    Evolução do rating ao longo dos meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {performanceLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                  ) : performanceError ? (
                    <div className="flex items-center justify-center h-64 text-red-500">
                      <AlertCircle className="w-8 h-8 mr-2" />
                      Erro ao carregar dados
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart
                        data={performanceData?.data?.performance || []}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="rating"
                          stroke="#3B82F6"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="adr"
                          stroke="#10B981"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Estatísticas por Tipo de Round */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Performance por Tipo de Round
                  </CardTitle>
                  <CardDescription>
                    Winrate em diferentes tipos de rounds
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {performanceLoading ? (
                    <div className="flex items-center justify-center h-64">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                  ) : performanceError ? (
                    <div className="flex items-center justify-center h-64 text-red-500">
                      <AlertCircle className="w-8 h-8 mr-2" />
                      Erro ao carregar dados
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceData?.data?.roundTypes || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "winRate" ? `${value}%` : value,
                            name === "winRate" ? "Win Rate" : name,
                          ]}
                        />
                        <Bar dataKey="winRate" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Radar Chart - Estatísticas Gerais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Radar de Habilidades
                  </CardTitle>
                  <CardDescription>
                    Comparação visual das principais estatísticas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart
                      data={[
                        { skill: "Rating", value: player.rating * 100 },
                        { skill: "K/D", value: player.kd * 100 },
                        { skill: "ADR", value: player.adr },
                        { skill: "HS%", value: player.headshot },
                        { skill: "Clutches", value: player.clutches / 2 },
                        { skill: "MVPs", value: player.mvps },
                      ]}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis angle={90} domain={[0, 150]} />
                      <Radar
                        name="Estatísticas"
                        dataKey="value"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlayerProfile;

import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Trophy,
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
  Globe,
  Twitter,
  Instagram,
  Youtube,
  Award,
  Target,
  Zap,
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
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  useTeam,
  useTeamRecentMatches,
  useTeamPlayers,
  useTeamMapStats,
  useTeamPerformance,
} from "../hooks/useQueries";

const TeamProfile = () => {
  const { id } = useParams();

  const {
    data: teamData,
    isLoading: teamLoading,
    isError: teamError,
    error: teamErrorDetails,
    refetch: refetchTeam,
  } = useTeam(id);

  const {
    data: matchesData,
    isLoading: matchesLoading,
    isError: matchesError,
    refetch: refetchMatches,
  } = useTeamRecentMatches(id);

  const {
    data: playersData,
    isLoading: playersLoading,
    isError: playersError,
    refetch: refetchPlayers,
  } = useTeamPlayers(id);

  const {
    data: mapStatsData,
    isLoading: mapStatsLoading,
    isError: mapStatsError,
  } = useTeamMapStats(id);

  const {
    data: performanceData,
    isLoading: performanceLoading,
    isError: performanceError,
  } = useTeamPerformance(id);

  // Loading state
  if (teamLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            Carregando perfil do time...
          </h2>
          <p className="text-gray-500 mt-2">Buscando informações detalhadas</p>
        </div>
      </div>
    );
  }

  // Error state
  if (teamError) {
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
                {teamErrorDetails?.message || "Time não encontrado"}
              </p>
              <div className="space-y-2">
                <Button onClick={() => refetchTeam()} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Tentar novamente
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/times">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para times
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const team = teamData?.data;
  const matches = matchesData?.data || [];
  const players = playersData?.data || [];

  if (!team) return null;

  // Função para formatar data
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  // Função para renderizar rounds com cores
  const renderRounds = (rounds) => {
    return rounds.map((round, index) => (
      <div
        key={index}
        className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-bold text-white ${
          round.winner === "team" ? "bg-green-500" : "bg-red-500"
        }`}
        title={`Round ${round.round}: ${
          round.winner === "team" ? "Vitória" : "Derrota"
        } (${round.type})`}
      >
        {round.round}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link to="/times">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-blue-600">
                Início
              </Link>
              <span>/</span>
              <Link to="/times" className="hover:text-blue-600">
                Times
              </Link>
              <span>/</span>
              <span className="text-gray-900">{team.name}</span>
            </div>
          </div>

          {/* Team Header */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-24 h-24 rounded-lg border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  #{team.ranking}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {team.name}
                  </h1>
                  <Badge variant="outline" className="text-sm">
                    {team.region}
                  </Badge>
                </div>
                <p className="text-xl text-gray-600">{team.fullName}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {team.players.length} jogadores
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="lg:ml-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {team.points}
                  </div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50%</div>
                  <div className="text-sm text-gray-500">Win Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">3000</div>
                  <div className="text-sm text-gray-500">Maps Won</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10</div>
                  <div className="text-sm text-gray-500">Títulos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="players">Jogadores</TabsTrigger>
            <TabsTrigger value="matches">Partidas Recentes</TabsTrigger>
            <TabsTrigger value="charts">Gráficos</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Informações do Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Informações do Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Nome Completo:</span>
                      <p className="font-medium">{team.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Região:</span>
                      <p className="font-medium">{team.region}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">País:</span>
                      <p className="font-medium">{team.country}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Fundado:</span>
                      <p className="font-medium">{team.founded}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Técnico:</span>
                      <p className="font-medium">{team.coach}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Capitão:</span>
                      <p className="font-medium">{team.captain}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Sede:</span>
                      <p className="font-medium">{team.headquarters}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <span className="text-gray-500 text-sm">
                      Redes Sociais:
                    </span>
                    <div className="flex gap-2 mt-2">
                      {team.socialMedia?.twitter && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Twitter className="w-3 h-3" />
                          {team.socialMedia.twitter}
                        </Badge>
                      )}
                      {team.socialMedia?.instagram && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Instagram className="w-3 h-3" />
                          {team.socialMedia.instagram}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {team.website && (
                    <div>
                      <span className="text-gray-500 text-sm">Website:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <Globe className="w-4 h-4 text-blue-600" />
                        <a
                          href={team.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {team.website}
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Estatísticas do Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Estatísticas do Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Rating</span>
                      <span className="font-bold text-blue-600">
                        {team.rating}
                      </span>
                    </div>
                    <Progress value={team.rating / 10} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Win Rate</span>
                      <span className="font-bold">{team.winRate}%</span>
                    </div>
                    <Progress value={team.winRate} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Rating Médio
                      </span>
                      <span className="font-bold">{team.avgRating}</span>
                    </div>
                    <Progress value={team.avgRating * 50} className="h-2" />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="font-bold text-lg">{team.mapsWon}</div>
                      <div className="text-xs text-gray-600">Maps Won</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">{team.roundsWon}</div>
                      <div className="text-xs text-gray-600">Rounds Won</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conquistas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Conquistas Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 text-center">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <Award className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                      <div className="font-bold text-lg">{team.titles}</div>
                      <div className="text-xs text-gray-600">Títulos</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Gamepad2 className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <div className="font-bold text-lg">
                        {team.tournaments}
                      </div>
                      <div className="text-xs text-gray-600">Torneios</div>
                    </div>
                  </div>

                  <Separator />

                  {/* <div>
                    <span className="text-sm text-gray-600">
                      Títulos Recentes:
                    </span>
                    <div className="mt-2 space-y-1">
                      {team.recentTitles.map((title, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs block w-full text-center"
                        >
                          {title}
                        </Badge>
                      ))}
                    </div>
                  </div> */}

                  {team.achievements && (
                    <>
                      <Separator />
                      <div>
                        <span className="text-sm text-gray-600">
                          Principais Conquistas:
                        </span>
                        <div className="mt-2 space-y-1">
                          {team.achievements
                            .slice(0, 3)
                            .map((achievement, index) => (
                              <div
                                key={index}
                                className="text-xs text-gray-700 flex items-center gap-1"
                              >
                                <Star className="w-3 h-3 text-yellow-500" />
                                {achievement}
                              </div>
                            ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Descrição do Time */}
            {team.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Sobre o Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {team.description}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Players Tab */}
          <TabsContent value="players" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Jogadores do Time</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchPlayers()}
                disabled={playersLoading}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${
                    playersLoading ? "animate-spin" : ""
                  }`}
                />
                Atualizar
              </Button>
            </div>

            {playersLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Carregando jogadores...</p>
              </div>
            ) : playersError ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600">Erro ao carregar jogadores</p>
                    <Button onClick={() => refetchPlayers()} className="mt-4">
                      Tentar novamente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : players.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Users className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Nenhum jogador encontrado</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {players.map((player) => (
                  <Card
                    key={player.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <img
                            src={player.photo || "/default-avatar.png"}
                            alt={player.name}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {player.name}
                          </h3>
                          <p className="text-gray-600">{player.realName}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {player.role}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-lg text-blue-600">
                            {player.rating}
                          </div>
                          <div className="text-gray-600">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">{player.kd}</div>
                          <div className="text-gray-600">K/D</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">{player.adr}</div>
                          <div className="text-gray-600">ADR</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">
                            {player.headshot}%
                          </div>
                          <div className="text-gray-600">HS%</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          asChild
                        >
                          <Link to={`/jogadores/${player.id}`}>
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Ver Perfil
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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
              <div className="space-y-6">
                {matches.map((match) => (
                  <Card
                    key={match.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
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
                                <Badge variant="outline" className="text-xs">
                                  MVP: {match.mvp}
                                </Badge>
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
                            className={`font-bold text-2xl ${
                              match.result === "W"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {match.scoreTeam} - {match.scoreOpponent}
                          </div>
                          <div className="text-sm text-gray-600">
                            {match.result === "W" ? "Vitória" : "Derrota"} •{" "}
                            {match.duration}
                          </div>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <div>
                        <h4 className="font-semibold mb-3">Rounds por Round</h4>
                        <div className="flex flex-wrap gap-1">
                          {renderRounds(match.rounds)}
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                            <span>Vitória</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                            <span>Derrota</span>
                          </div>
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
            <h2 className="text-2xl font-bold">Estatísticas Detalhadas</h2>

            {team.teamStats && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Estatísticas de Mapas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Estatísticas de Mapas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-bold text-lg">
                          {team.teamStats.mapsPlayed}
                        </div>
                        <div className="text-sm text-gray-600">Maps Played</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-bold text-lg">
                          {team.teamStats.mapsWon}
                        </div>
                        <div className="text-sm text-gray-600">Maps Won</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Win Rate</span>
                        <span className="font-medium">
                          {(
                            (team.teamStats.mapsWon /
                              team.teamStats.mapsPlayed) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (team.teamStats.mapsWon / team.teamStats.mapsPlayed) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Estatísticas de Rounds */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Estatísticas de Rounds
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-bold text-lg">
                          {team.teamStats.roundsPlayed}
                        </div>
                        <div className="text-sm text-gray-600">
                          Rounds Played
                        </div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-bold text-lg">
                          {team.teamStats.roundsWon}
                        </div>
                        <div className="text-sm text-gray-600">Rounds Won</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Round Win Rate
                        </span>
                        <span className="font-medium">
                          {(
                            (team.teamStats.roundsWon /
                              team.teamStats.roundsPlayed) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (team.teamStats.roundsWon /
                            team.teamStats.roundsPlayed) *
                          100
                        }
                        className="h-2"
                      />
                    </div>

                    <div className="text-center">
                      <div className="font-bold text-lg">
                        {team.teamStats.avgRoundsPerMap}
                      </div>
                      <div className="text-sm text-gray-600">
                        Avg Rounds/Map
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Estatísticas Especiais */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Estatísticas Especiais
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Pistol Round Win Rate
                          </span>
                          <span className="font-medium">
                            {team.teamStats.pistolRoundWinRate}%
                          </span>
                        </div>
                        <Progress
                          value={team.teamStats.pistolRoundWinRate}
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Eco Round Win Rate
                          </span>
                          <span className="font-medium">
                            {team.teamStats.ecoRoundWinRate}%
                          </span>
                        </div>
                        <Progress
                          value={team.teamStats.ecoRoundWinRate}
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            Force Round Win Rate
                          </span>
                          <span className="font-medium">
                            {team.teamStats.forceRoundWinRate}%
                          </span>
                        </div>
                        <Progress
                          value={team.teamStats.forceRoundWinRate}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
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
                    Performance do time em diferentes mapas
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
                    Evolução do rating e winrate do time
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
                      <LineChart data={performanceData?.data || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="rating"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          name="Rating"
                        />
                        <Line
                          type="monotone"
                          dataKey="winRate"
                          stroke="#10B981"
                          strokeWidth={2}
                          name="Win Rate %"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Distribuição de Mapas Jogados */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Distribuição de Mapas
                  </CardTitle>
                  <CardDescription>
                    Quantidade de partidas por mapa
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
                      <RechartsPieChart>
                        <Pie
                          data={mapStatsData?.data || []}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ map, matches }) => `${map}: ${matches}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="matches"
                        >
                          {(mapStatsData?.data || []).map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={`hsl(${index * 45}, 70%, 60%)`}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Radar Chart - Estatísticas do Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Radar de Performance
                  </CardTitle>
                  <CardDescription>
                    Comparação visual das principais estatísticas do time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart
                      data={[
                        { skill: "Rating", value: team.rating / 10 },
                        { skill: "Win Rate", value: team.winRate },
                        { skill: "Maps Won", value: team.mapsWon },
                        { skill: "Titles", value: team.titles * 20 },
                        {
                          skill: "Pistol WR",
                          value: team.teamStats?.pistolRoundWinRate || 0,
                        },
                        {
                          skill: "Eco WR",
                          value: team.teamStats?.ecoRoundWinRate || 0,
                        },
                      ]}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
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

export default TeamProfile;

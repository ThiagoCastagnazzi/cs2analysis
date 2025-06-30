// Simulação de API para demonstrar TanStack Query
// Em um projeto real, essas funções fariam requisições HTTP reais

// Dados fictícios expandidos
const playersData = [
  {
    id: 1,
    name: "s1mple",
    realName: "Oleksandr Kostyliev",
    team: "NAVI",
    country: "Ukraine",
    role: "AWPer",
    rating: 1.28,
    kd: 1.31,
    adr: 85.2,
    headshot: 52.1,
    matches: 156,
    clutches: 78,
    aces: 12,
    mvps: 45,
    avatar: "/api/placeholder/128/128",
    // Dados expandidos para perfil
    age: 26,
    birthDate: "1997-10-02",
    birthPlace: "Kyiv, Ukraine",
    height: "185 cm",
    weight: "75 kg",
    steamId: "STEAM_1:1:61493616",
    joinedTeamDate: "2016-08-04",
    careerEarnings: "$1,664,684",
    socialMedia: {
      twitter: "@s1mpleO",
      instagram: "@s1mple_o",
      twitch: "s1mple",
    },
    // Estatísticas avançadas
    advancedStats: {
      kast: 74.2,
      firstKills: 0.18,
      firstDeaths: 0.12,
      entryKills: 0.15,
      tradedDeaths: 0.68,
      savedByTeammate: 0.42,
      savedTeammates: 0.38,
      multiKillRounds: 0.28,
      openingKillRating: 1.45,
      clutchSuccess: 0.34,
      rifleKills: 0.62,
      pistolKills: 0.08,
      sniperKills: 0.3,
      grenadeKills: 0.02,
    },
    // Histórico de times
    teamHistory: [
      {
        team: "NAVI",
        period: "2016 - Present",
        achievements: ["Major Champion 2021", "Intel Grand Slam"],
      },
      {
        team: "Team Liquid",
        period: "2016",
        achievements: ["ESL One Cologne 2016"],
      },
      {
        team: "FlipSid3 Tactics",
        period: "2013-2016",
        achievements: ["DreamHack Winter 2014"],
      },
    ],
    // Configurações de jogo
    gameSettings: {
      sensitivity: 3.09,
      dpi: 400,
      edpi: 1236,
      resolution: "1024x768",
      aspectRatio: "4:3",
      refreshRate: "144Hz",
      crosshair: {
        size: 2,
        thickness: 0,
        gap: -3,
        color: "Cyan",
      },
    },
    // Equipamentos
    equipment: {
      mouse: "Logitech G Pro X Superlight",
      keyboard: "HyperX Alloy FPS Pro",
      headset: "HyperX Cloud II",
      monitor: "BenQ XL2546",
      mousepad: "SteelSeries QcK+",
    },
    // Winrate por mapa
    mapStats: [
      {
        map: "Dust2",
        matches: 28,
        wins: 22,
        winRate: 78.6,
        rating: 1.32,
        adr: 87.4,
        kd: 1.35,
      },
      {
        map: "Mirage",
        matches: 25,
        wins: 18,
        winRate: 72.0,
        rating: 1.28,
        adr: 84.2,
        kd: 1.29,
      },
      {
        map: "Inferno",
        matches: 22,
        wins: 16,
        winRate: 72.7,
        rating: 1.25,
        adr: 83.1,
        kd: 1.27,
      },
      {
        map: "Cache",
        matches: 20,
        wins: 14,
        winRate: 70.0,
        rating: 1.24,
        adr: 82.8,
        kd: 1.26,
      },
      {
        map: "Overpass",
        matches: 18,
        wins: 12,
        winRate: 66.7,
        rating: 1.22,
        adr: 81.5,
        kd: 1.24,
      },
      {
        map: "Train",
        matches: 16,
        wins: 10,
        winRate: 62.5,
        rating: 1.2,
        adr: 80.2,
        kd: 1.22,
      },
      {
        map: "Nuke",
        matches: 15,
        wins: 9,
        winRate: 60.0,
        rating: 1.18,
        adr: 79.1,
        kd: 1.2,
      },
      {
        map: "Vertigo",
        matches: 12,
        wins: 7,
        winRate: 58.3,
        rating: 1.16,
        adr: 78.3,
        kd: 1.18,
      },
    ],
    // Dados para gráficos de performance
    performanceData: [
      { month: "Jan", rating: 1.25, adr: 82.1, kd: 1.28, matches: 12 },
      { month: "Fev", rating: 1.27, adr: 83.5, kd: 1.3, matches: 14 },
      { month: "Mar", rating: 1.29, adr: 85.2, kd: 1.32, matches: 16 },
      { month: "Abr", rating: 1.31, adr: 86.8, kd: 1.34, matches: 15 },
      { month: "Mai", rating: 1.28, adr: 84.9, kd: 1.31, matches: 13 },
      { month: "Jun", rating: 1.3, adr: 87.1, kd: 1.33, matches: 17 },
    ],
    // Estatísticas por tipo de round
    roundTypeStats: [
      { type: "Pistol", winRate: 68.2, rating: 1.15, kills: 42 },
      { type: "Eco", winRate: 34.7, rating: 0.95, kills: 28 },
      { type: "Force", winRate: 45.3, rating: 1.08, kills: 35 },
      { type: "Full Buy", winRate: 78.9, rating: 1.35, kills: 156 },
    ],
  },
  {
    id: 2,
    name: "ZywOo",
    realName: "Mathieu Herbaut",
    team: "Vitality",
    country: "France",
    role: "AWPer",
    rating: 1.27,
    kd: 1.29,
    adr: 83.7,
    headshot: 48.3,
    matches: 142,
    clutches: 71,
    aces: 10,
    mvps: 42,
    avatar: "/api/placeholder/128/128",
    age: 24,
    birthDate: "1999-11-09",
    birthPlace: "Auby, France",
    height: "180 cm",
    weight: "70 kg",
    steamId: "STEAM_1:0:155101530",
    joinedTeamDate: "2018-10-01",
    careerEarnings: "$892,450",
    socialMedia: {
      twitter: "@ZywOo",
      instagram: "@zywoo_cs",
      twitch: "ZywOo",
    },
    advancedStats: {
      kast: 73.8,
      firstKills: 0.17,
      firstDeaths: 0.11,
      entryKills: 0.14,
      tradedDeaths: 0.65,
      savedByTeammate: 0.4,
      savedTeammates: 0.35,
      multiKillRounds: 0.26,
      openingKillRating: 1.42,
      clutchSuccess: 0.32,
      rifleKills: 0.58,
      pistolKills: 0.07,
      sniperKills: 0.35,
      grenadeKills: 0.01,
    },
    teamHistory: [
      {
        team: "Vitality",
        period: "2018 - Present",
        achievements: ["BLAST Premier Champion", "IEM Katowice Champion"],
      },
      {
        team: "aAa",
        period: "2017-2018",
        achievements: ["French Championship"],
      },
    ],
    gameSettings: {
      sensitivity: 2.0,
      dpi: 400,
      edpi: 800,
      resolution: "1280x960",
      aspectRatio: "4:3",
      refreshRate: "240Hz",
      crosshair: {
        size: 1,
        thickness: 1,
        gap: -2,
        color: "Green",
      },
    },
    equipment: {
      mouse: "Logitech G Pro Wireless",
      keyboard: "Logitech G915 TKL",
      headset: "Logitech G Pro X",
      monitor: "BenQ XL2546K",
      mousepad: "Logitech G640",
    },
    // Winrate por mapa
    mapStats: [
      {
        map: "Mirage",
        matches: 26,
        wins: 20,
        winRate: 76.9,
        rating: 1.31,
        adr: 85.8,
        kd: 1.33,
      },
      {
        map: "Dust2",
        matches: 24,
        wins: 17,
        winRate: 70.8,
        rating: 1.29,
        adr: 84.1,
        kd: 1.31,
      },
      {
        map: "Inferno",
        matches: 23,
        wins: 16,
        winRate: 69.6,
        rating: 1.27,
        adr: 83.2,
        kd: 1.29,
      },
      {
        map: "Cache",
        matches: 21,
        wins: 14,
        winRate: 66.7,
        rating: 1.25,
        adr: 82.4,
        kd: 1.27,
      },
      {
        map: "Overpass",
        matches: 19,
        wins: 12,
        winRate: 63.2,
        rating: 1.23,
        adr: 81.6,
        kd: 1.25,
      },
      {
        map: "Train",
        matches: 17,
        wins: 10,
        winRate: 58.8,
        rating: 1.21,
        adr: 80.8,
        kd: 1.23,
      },
      {
        map: "Nuke",
        matches: 16,
        wins: 9,
        winRate: 56.3,
        rating: 1.19,
        adr: 79.9,
        kd: 1.21,
      },
      {
        map: "Vertigo",
        matches: 14,
        wins: 8,
        winRate: 57.1,
        rating: 1.17,
        adr: 78.7,
        kd: 1.19,
      },
    ],
    // Dados para gráficos de performance
    performanceData: [
      { month: "Jan", rating: 1.23, adr: 81.2, kd: 1.26, matches: 11 },
      { month: "Fev", rating: 1.25, adr: 82.8, kd: 1.28, matches: 13 },
      { month: "Mar", rating: 1.27, adr: 84.1, kd: 1.3, matches: 15 },
      { month: "Abr", rating: 1.29, adr: 85.7, kd: 1.32, matches: 14 },
      { month: "Mai", rating: 1.26, adr: 83.9, kd: 1.29, matches: 12 },
      { month: "Jun", rating: 1.28, adr: 86.2, kd: 1.31, matches: 16 },
    ],
    // Estatísticas por tipo de round
    roundTypeStats: [
      { type: "Pistol", winRate: 65.8, rating: 1.12, kills: 39 },
      { type: "Eco", winRate: 32.1, rating: 0.92, kills: 25 },
      { type: "Force", winRate: 43.7, rating: 1.05, kills: 32 },
      { type: "Full Buy", winRate: 76.4, rating: 1.33, kills: 148 },
    ],
  },
  {
    id: 3,
    name: "sh1ro",
    realName: "Dmitry Sokolov",
    team: "Cloud9",
    country: "Russia",
    role: "AWPer",
    rating: 1.21,
    kd: 1.24,
    adr: 79.8,
    headshot: 45.7,
    matches: 134,
    clutches: 65,
    aces: 8,
    mvps: 38,
    avatar: "/api/placeholder/128/128",
    age: 22,
    birthDate: "2001-07-03",
    birthPlace: "Moscow, Russia",
    height: "175 cm",
    weight: "68 kg",
    steamId: "STEAM_1:1:86594024",
    joinedTeamDate: "2020-12-01",
    careerEarnings: "$445,230",
    socialMedia: {
      twitter: "@sh1ro_cs",
      instagram: "@sh1ro_official",
      twitch: "sh1ro",
    },
    advancedStats: {
      kast: 72.5,
      firstKills: 0.16,
      firstDeaths: 0.13,
      entryKills: 0.12,
      tradedDeaths: 0.62,
      savedByTeammate: 0.38,
      savedTeammates: 0.33,
      multiKillRounds: 0.24,
      openingKillRating: 1.38,
      clutchSuccess: 0.3,
      rifleKills: 0.55,
      pistolKills: 0.09,
      sniperKills: 0.36,
      grenadeKills: 0.02,
    },
    teamHistory: [
      {
        team: "Cloud9",
        period: "2020 - Present",
        achievements: ["IEM Dallas Champion", "BLAST Premier Fall Champion"],
      },
      {
        team: "Gambit",
        period: "2019-2020",
        achievements: ["PGL Major Stockholm Champion"],
      },
    ],
    gameSettings: {
      sensitivity: 1.8,
      dpi: 400,
      edpi: 720,
      resolution: "1024x768",
      aspectRatio: "4:3",
      refreshRate: "144Hz",
      crosshair: {
        size: 3,
        thickness: 1,
        gap: -1,
        color: "White",
      },
    },
    equipment: {
      mouse: "Zowie EC2",
      keyboard: "HyperX Alloy Origins",
      headset: "SteelSeries Arctis Pro",
      monitor: "ASUS VG248QE",
      mousepad: "Zowie G-SR",
    },
  },
  {
    id: 4,
    name: "NiKo",
    realName: "Nikola Kovač",
    team: "G2",
    country: "Bosnia",
    role: "Rifler",
    rating: 1.19,
    kd: 1.22,
    adr: 78.4,
    headshot: 55.2,
    matches: 148,
    clutches: 62,
    aces: 9,
    mvps: 35,
    avatar: "/api/placeholder/128/128",
    age: 27,
    birthDate: "1997-02-16",
    birthPlace: "Brčko, Bosnia and Herzegovina",
    height: "183 cm",
    weight: "73 kg",
    steamId: "STEAM_1:1:27828",
    joinedTeamDate: "2021-10-01",
    careerEarnings: "$1,234,567",
    socialMedia: {
      twitter: "@G2NiKo",
      instagram: "@niko_cs",
      twitch: "NiKoCS",
    },
    advancedStats: {
      kast: 71.8,
      firstKills: 0.15,
      firstDeaths: 0.14,
      entryKills: 0.16,
      tradedDeaths: 0.6,
      savedByTeammate: 0.36,
      savedTeammates: 0.4,
      multiKillRounds: 0.22,
      openingKillRating: 1.35,
      clutchSuccess: 0.28,
      rifleKills: 0.78,
      pistolKills: 0.12,
      sniperKills: 0.1,
      grenadeKills: 0.03,
    },
    teamHistory: [
      {
        team: "G2",
        period: "2021 - Present",
        achievements: ["IEM Cologne Champion"],
      },
      {
        team: "FaZe",
        period: "2017-2021",
        achievements: ["ELEAGUE Major Champion"],
      },
      {
        team: "mousesports",
        period: "2015-2017",
        achievements: ["ESL Pro League Champion"],
      },
    ],
    gameSettings: {
      sensitivity: 1.35,
      dpi: 400,
      edpi: 540,
      resolution: "1280x960",
      aspectRatio: "4:3",
      refreshRate: "240Hz",
      crosshair: {
        size: 2,
        thickness: 0,
        gap: -2,
        color: "Yellow",
      },
    },
    equipment: {
      mouse: "Logitech G Pro X Superlight",
      keyboard: "Logitech G915",
      headset: "Logitech G Pro X",
      monitor: "BenQ XL2546K",
      mousepad: "Logitech G640",
    },
  },
  {
    id: 5,
    name: "device",
    realName: "Nicolai Reedtz",
    team: "Astralis",
    country: "Denmark",
    role: "AWPer",
    rating: 1.18,
    kd: 1.2,
    adr: 76.9,
    headshot: 43.8,
    matches: 139,
    clutches: 58,
    aces: 7,
    mvps: 32,
    avatar: "/api/placeholder/128/128",
    age: 28,
    birthDate: "1995-09-08",
    birthPlace: "Copenhagen, Denmark",
    height: "188 cm",
    weight: "78 kg",
    steamId: "STEAM_1:0:29475648",
    joinedTeamDate: "2016-01-18",
    careerEarnings: "$1,987,432",
    socialMedia: {
      twitter: "@dev1ce",
      instagram: "@device_cs",
      twitch: "device",
    },
    advancedStats: {
      kast: 70.5,
      firstKills: 0.14,
      firstDeaths: 0.12,
      entryKills: 0.11,
      tradedDeaths: 0.58,
      savedByTeammate: 0.34,
      savedTeammates: 0.31,
      multiKillRounds: 0.2,
      openingKillRating: 1.32,
      clutchSuccess: 0.26,
      rifleKills: 0.52,
      pistolKills: 0.06,
      sniperKills: 0.42,
      grenadeKills: 0.01,
    },
    teamHistory: [
      {
        team: "Astralis",
        period: "2016 - Present",
        achievements: ["4x Major Champion", "Intel Grand Slam"],
      },
      {
        team: "TSM",
        period: "2015-2016",
        achievements: ["ESL ESEA Pro League"],
      },
      {
        team: "Copenhagen Wolves",
        period: "2013-2015",
        achievements: ["DreamHack Bucharest"],
      },
    ],
    gameSettings: {
      sensitivity: 1.9,
      dpi: 400,
      edpi: 760,
      resolution: "1024x768",
      aspectRatio: "4:3",
      refreshRate: "144Hz",
      crosshair: {
        size: 4,
        thickness: 1,
        gap: -3,
        color: "Green",
      },
    },
    equipment: {
      mouse: "SteelSeries Rival 310",
      keyboard: "SteelSeries Apex Pro",
      headset: "SteelSeries Arctis Pro",
      monitor: "BenQ XL2546",
      mousepad: "SteelSeries QcK Heavy",
    },
  },
  {
    id: 6,
    name: "electronic",
    realName: "Denis Sharipov",
    team: "NAVI",
    country: "Russia",
    role: "Rifler",
    rating: 1.16,
    kd: 1.18,
    adr: 75.3,
    headshot: 49.1,
    matches: 152,
    clutches: 55,
    aces: 6,
    mvps: 29,
    avatar: "/api/placeholder/128/128",
    age: 25,
    birthDate: "1998-09-02",
    birthPlace: "Kazan, Russia",
    height: "177 cm",
    weight: "71 kg",
    steamId: "STEAM_1:1:89774378",
    joinedTeamDate: "2017-07-20",
    careerEarnings: "$876,543",
    socialMedia: {
      twitter: "@electronicCSGO",
      instagram: "@electronic_cs",
      twitch: "electronicCS",
    },
    advancedStats: {
      kast: 69.8,
      firstKills: 0.13,
      firstDeaths: 0.15,
      entryKills: 0.17,
      tradedDeaths: 0.56,
      savedByTeammate: 0.32,
      savedTeammates: 0.42,
      multiKillRounds: 0.18,
      openingKillRating: 1.28,
      clutchSuccess: 0.24,
      rifleKills: 0.82,
      pistolKills: 0.14,
      sniperKills: 0.04,
      grenadeKills: 0.04,
    },
    teamHistory: [
      {
        team: "NAVI",
        period: "2017 - Present",
        achievements: ["Major Champion 2021", "Intel Grand Slam"],
      },
      {
        team: "FlipSid3 Tactics",
        period: "2016-2017",
        achievements: ["ELEAGUE Major Qualifier"],
      },
    ],
    gameSettings: {
      sensitivity: 2.5,
      dpi: 400,
      edpi: 1000,
      resolution: "1280x960",
      aspectRatio: "4:3",
      refreshRate: "144Hz",
      crosshair: {
        size: 1,
        thickness: 0,
        gap: -1,
        color: "Red",
      },
    },
    equipment: {
      mouse: "Zowie FK1",
      keyboard: "HyperX Alloy Elite",
      headset: "HyperX Cloud Alpha",
      monitor: "ASUS VG248QE",
      mousepad: "Zowie G-SR",
    },
  },
];

// Dados de partidas recentes
const recentMatchesData = {
  1: [
    // s1mple
    {
      id: 1,
      date: "2025-06-24",
      tournament: "IEM Katowice 2025",
      opponent: "Vitality",
      map: "Mirage",
      result: "W",
      score: "16-12",
      kills: 28,
      deaths: 15,
      assists: 7,
      rating: 1.45,
      adr: 92.3,
      kast: 78,
      headshots: 16,
      firstKills: 5,
      clutches: 2,
      mvp: true,
    },
    {
      id: 2,
      date: "2025-06-23",
      tournament: "IEM Katowice 2025",
      opponent: "FaZe",
      map: "Dust2",
      result: "W",
      score: "16-9",
      kills: 24,
      deaths: 12,
      assists: 5,
      rating: 1.38,
      adr: 88.7,
      kast: 82,
      headshots: 14,
      firstKills: 4,
      clutches: 1,
      mvp: false,
    },
    {
      id: 3,
      date: "2025-06-22",
      tournament: "IEM Katowice 2025",
      opponent: "G2",
      map: "Inferno",
      result: "L",
      score: "14-16",
      kills: 22,
      deaths: 18,
      assists: 6,
      rating: 1.12,
      adr: 79.4,
      kast: 68,
      headshots: 11,
      firstKills: 3,
      clutches: 0,
      mvp: false,
    },
    {
      id: 4,
      date: "2025-06-21",
      tournament: "IEM Katowice 2025",
      opponent: "Cloud9",
      map: "Overpass",
      result: "W",
      score: "16-11",
      kills: 26,
      deaths: 14,
      assists: 8,
      rating: 1.42,
      adr: 91.2,
      kast: 75,
      headshots: 15,
      firstKills: 6,
      clutches: 1,
      mvp: true,
    },
    {
      id: 5,
      date: "2025-06-20",
      tournament: "IEM Katowice 2025",
      opponent: "Liquid",
      map: "Nuke",
      result: "W",
      score: "16-8",
      kills: 30,
      deaths: 11,
      assists: 4,
      rating: 1.67,
      adr: 98.5,
      kast: 85,
      headshots: 18,
      firstKills: 7,
      clutches: 3,
      mvp: true,
    },
  ],
  2: [
    // ZywOo
    {
      id: 6,
      date: "2025-06-24",
      tournament: "IEM Katowice 2025",
      opponent: "NAVI",
      map: "Mirage",
      result: "L",
      score: "12-16",
      kills: 25,
      deaths: 19,
      assists: 6,
      rating: 1.28,
      adr: 85.4,
      kast: 72,
      headshots: 12,
      firstKills: 4,
      clutches: 1,
      mvp: false,
    },
    {
      id: 7,
      date: "2025-06-23",
      tournament: "IEM Katowice 2025",
      opponent: "Astralis",
      map: "Ancient",
      result: "W",
      score: "16-13",
      kills: 27,
      deaths: 16,
      assists: 5,
      rating: 1.35,
      adr: 89.1,
      kast: 76,
      headshots: 13,
      firstKills: 5,
      clutches: 2,
      mvp: true,
    },
  ],
};

// Função para simular delay de rede
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// API de Jogadores
export const playersApi = {
  // Buscar todos os jogadores
  getAll: async (filters = {}) => {
    await delay(800); // Simula latência de rede

    let filteredPlayers = [...playersData];

    // Aplicar filtros
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredPlayers = filteredPlayers.filter(
        (player) =>
          player.name.toLowerCase().includes(searchTerm) ||
          player.realName.toLowerCase().includes(searchTerm) ||
          player.team.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.role && filters.role !== "all") {
      filteredPlayers = filteredPlayers.filter(
        (player) => player.role === filters.role
      );
    }

    return {
      data: filteredPlayers,
      total: filteredPlayers.length,
      timestamp: new Date().toISOString(),
    };
  },

  // Buscar jogador por ID
  getById: async (id) => {
    await delay(500);
    const player = playersData.find((p) => p.id === parseInt(id));
    if (!player) {
      throw new Error("Jogador não encontrado");
    }
    return {
      data: player,
      timestamp: new Date().toISOString(),
    };
  },

  // Buscar partidas recentes do jogador
  getRecentMatches: async (playerId) => {
    await delay(600);
    const matches = recentMatchesData[playerId] || [];
    return {
      data: matches,
      total: matches.length,
      timestamp: new Date().toISOString(),
    };
  },

  // Buscar estatísticas detalhadas do jogador
  getDetailedStats: async (playerId) => {
    await delay(400);
    const player = playersData.find((p) => p.id === parseInt(playerId));
    if (!player) {
      throw new Error("Jogador não encontrado");
    }

    // Calcular estatísticas baseadas nas partidas recentes
    const matches = recentMatchesData[playerId] || [];
    const recentStats = matches.reduce(
      (acc, match) => {
        acc.totalKills += match.kills;
        acc.totalDeaths += match.deaths;
        acc.totalAssists += match.assists;
        acc.totalRating += match.rating;
        acc.totalAdr += match.adr;
        acc.wins += match.result === "W" ? 1 : 0;
        acc.mvps += match.mvp ? 1 : 0;
        return acc;
      },
      {
        totalKills: 0,
        totalDeaths: 0,
        totalAssists: 0,
        totalRating: 0,
        totalAdr: 0,
        wins: 0,
        mvps: 0,
      }
    );

    const matchCount = matches.length || 1;

    return {
      data: {
        recent: {
          matches: matchCount,
          avgKills: (recentStats.totalKills / matchCount).toFixed(1),
          avgDeaths: (recentStats.totalDeaths / matchCount).toFixed(1),
          avgAssists: (recentStats.totalAssists / matchCount).toFixed(1),
          avgRating: (recentStats.totalRating / matchCount).toFixed(2),
          avgAdr: (recentStats.totalAdr / matchCount).toFixed(1),
          winRate: ((recentStats.wins / matchCount) * 100).toFixed(1),
          mvpRate: ((recentStats.mvps / matchCount) * 100).toFixed(1),
        },
        career: {
          totalMatches: player.matches,
          totalKills: Math.floor(player.matches * 20.5),
          totalDeaths: Math.floor(player.matches * 15.8),
          totalAssists: Math.floor(player.matches * 6.2),
          totalMvps: player.mvps,
          totalAces: player.aces,
          totalClutches: player.clutches,
        },
      },
      timestamp: new Date().toISOString(),
    };
  },

  // Buscar estatísticas por mapa do jogador
  getMapStats: async (playerId) => {
    await delay(500);
    const player = playersData.find((p) => p.id === parseInt(playerId));
    if (!player) {
      throw new Error("Jogador não encontrado");
    }
    return {
      data: player.mapStats || [],
      timestamp: new Date().toISOString(),
    };
  },

  // Buscar dados de performance do jogador
  getPerformanceData: async (playerId) => {
    await delay(400);
    const player = playersData.find((p) => p.id === parseInt(playerId));
    if (!player) {
      throw new Error("Jogador não encontrado");
    }
    return {
      data: {
        performance: player.performanceData || [],
        roundTypes: player.roundTypeStats || [],
      },
      timestamp: new Date().toISOString(),
    };
  },

  // Buscar jogadores por time
  getByTeam: async (teamName) => {
    await delay(600);
    const teamPlayers = playersData.filter(
      (p) => p.team.toLowerCase() === teamName.toLowerCase()
    );
    return {
      data: teamPlayers,
      total: teamPlayers.length,
      timestamp: new Date().toISOString(),
    };
  },
};

// Dados de times expandidos
const teamsData = [
  {
    id: 1,
    name: "NAVI",
    fullName: "Natus Vincere",
    region: "Europe",
    country: "Ukraine",
    ranking: 1,
    rating: 1000,
    players: ["s1mple", "electronic", "Perfecto", "b1t", "sdy"],
    recentTitles: ["IEM Katowice 2025", "BLAST Premier Fall 2024"],
    founded: "2009",
    winRate: 78.5,
    roundsWon: 1245,
    mapsWon: 89,
    avgRating: 1.15,
    tournaments: 12,
    titles: 3,
    logo: "/api/placeholder/80/80",
    // Dados expandidos para perfil do time
    description:
      "Natus Vincere é uma das organizações de esports mais prestigiadas do mundo, conhecida por sua excelência em Counter-Strike.",
    coach: "B1ad3",
    captain: "s1mple",
    headquarters: "Kyiv, Ukraine",
    website: "https://navi.gg",
    socialMedia: {
      twitter: "@natusvincere",
      instagram: "@natus_vincere_official",
      youtube: "NatusVincereTV",
    },
    achievements: [
      "PGL Major Stockholm 2021 Champions",
      "Intel Grand Slam Season 3 Winners",
      "IEM Katowice 2025 Champions",
      "BLAST Premier Fall 2024 Champions",
    ],
    teamStats: {
      mapsPlayed: 156,
      mapsWon: 122,
      roundsPlayed: 4890,
      roundsWon: 3156,
      avgRoundsPerMap: 31.3,
      pistolRoundWinRate: 68.2,
      ecoRoundWinRate: 34.7,
      forceRoundWinRate: 45.3,
    },
    // Winrate por mapa
    mapStats: [
      {
        map: "Dust2",
        matches: 22,
        wins: 18,
        winRate: 81.8,
        avgRating: 1.18,
        avgRounds: 30.5,
      },
      {
        map: "Mirage",
        matches: 20,
        wins: 16,
        winRate: 80.0,
        avgRating: 1.16,
        avgRounds: 31.2,
      },
      {
        map: "Inferno",
        matches: 18,
        wins: 14,
        winRate: 77.8,
        avgRating: 1.15,
        avgRounds: 30.8,
      },
      {
        map: "Cache",
        matches: 16,
        wins: 12,
        winRate: 75.0,
        avgRating: 1.14,
        avgRounds: 31.0,
      },
      {
        map: "Overpass",
        matches: 15,
        wins: 11,
        winRate: 73.3,
        avgRating: 1.13,
        avgRounds: 31.4,
      },
      {
        map: "Train",
        matches: 14,
        wins: 10,
        winRate: 71.4,
        avgRating: 1.12,
        avgRounds: 31.8,
      },
      {
        map: "Nuke",
        matches: 13,
        wins: 9,
        winRate: 69.2,
        avgRating: 1.11,
        avgRounds: 32.1,
      },
      {
        map: "Vertigo",
        matches: 12,
        wins: 8,
        winRate: 66.7,
        avgRating: 1.1,
        avgRounds: 32.5,
      },
    ],
    // Dados para gráficos de performance do time
    performanceData: [
      {
        month: "Jan",
        rating: 1.13,
        winRate: 76.2,
        mapsWon: 13,
        mapsPlayed: 17,
      },
      {
        month: "Fev",
        rating: 1.15,
        winRate: 78.1,
        mapsWon: 15,
        mapsPlayed: 19,
      },
      {
        month: "Mar",
        rating: 1.17,
        winRate: 79.5,
        mapsWon: 17,
        mapsPlayed: 21,
      },
      {
        month: "Abr",
        rating: 1.19,
        winRate: 81.2,
        mapsWon: 16,
        mapsPlayed: 19,
      },
      {
        month: "Mai",
        rating: 1.16,
        winRate: 77.8,
        mapsWon: 14,
        mapsPlayed: 18,
      },
      {
        month: "Jun",
        rating: 1.18,
        winRate: 80.4,
        mapsWon: 18,
        mapsPlayed: 22,
      },
    ],
  },
  {
    id: 2,
    name: "Vitality",
    fullName: "Team Vitality",
    region: "Europe",
    country: "France",
    ranking: 2,
    rating: 985,
    players: ["ZywOo", "apEX", "dupreeh", "Magisk", "Spinx"],
    recentTitles: ["BLAST Premier Spring 2024"],
    founded: "2013",
    winRate: 75.2,
    roundsWon: 1189,
    mapsWon: 84,
    avgRating: 1.12,
    tournaments: 10,
    titles: 2,
    logo: "/api/placeholder/80/80",
    description:
      "Team Vitality é uma organização francesa de esports que compete nos mais altos níveis do Counter-Strike mundial.",
    coach: "zonic",
    captain: "apEX",
    headquarters: "Paris, France",
    website: "https://vitality.gg",
    socialMedia: {
      twitter: "@TeamVitality",
      instagram: "@teamvitality",
      youtube: "TeamVitality",
    },
    achievements: [
      "BLAST Premier Spring 2024 Champions",
      "IEM Cologne 2023 Champions",
      "ESL Pro League Season 16 Champions",
    ],
    teamStats: {
      mapsPlayed: 142,
      mapsWon: 107,
      roundsPlayed: 4456,
      roundsWon: 2889,
      avgRoundsPerMap: 31.4,
      pistolRoundWinRate: 65.5,
      ecoRoundWinRate: 32.1,
      forceRoundWinRate: 42.8,
    },
  },
  {
    id: 3,
    name: "FaZe",
    fullName: "FaZe Clan",
    region: "Europe",
    country: "International",
    ranking: 3,
    rating: 970,
    players: ["karrigan", "rain", "Twistzz", "ropz", "broky"],
    recentTitles: ["IEM Chengdu 2024"],
    founded: "2010",
    winRate: 73.8,
    roundsWon: 1156,
    mapsWon: 81,
    avgRating: 1.09,
    tournaments: 11,
    titles: 2,
    logo: "/api/placeholder/80/80",
    description:
      "FaZe Clan é uma organização internacional de esports conhecida por seu estilo agressivo e jogadores talentosos.",
    coach: "YNk",
    captain: "karrigan",
    headquarters: "Los Angeles, USA",
    website: "https://fazeclan.com",
    socialMedia: {
      twitter: "@FaZeClan",
      instagram: "@fazeclan",
      youtube: "FaZeClan",
    },
    achievements: [
      "PGL Major Antwerp 2022 Champions",
      "IEM Chengdu 2024 Champions",
      "ESL Pro League Season 15 Champions",
    ],
    teamStats: {
      mapsPlayed: 138,
      mapsWon: 102,
      roundsPlayed: 4321,
      roundsWon: 2756,
      avgRoundsPerMap: 31.3,
      pistolRoundWinRate: 62.3,
      ecoRoundWinRate: 29.8,
      forceRoundWinRate: 41.2,
    },
  },
  {
    id: 4,
    name: "G2",
    fullName: "G2 Esports",
    region: "Europe",
    country: "International",
    ranking: 4,
    rating: 955,
    players: ["NiKo", "huNter-", "nexa", "m0NESY", "jks"],
    recentTitles: ["BLAST Premier World Final 2023"],
    founded: "2013",
    winRate: 71.4,
    roundsWon: 1098,
    mapsWon: 76,
    avgRating: 1.07,
    tournaments: 9,
    titles: 1,
    logo: "/api/placeholder/80/80",
    description:
      "G2 Esports é uma organização internacional que compete em múltiplos títulos de esports com foco na excelência.",
    coach: "TaZ",
    captain: "nexa",
    headquarters: "Berlin, Germany",
    website: "https://g2esports.com",
    socialMedia: {
      twitter: "@G2esports",
      instagram: "@g2esports",
      youtube: "G2esports",
    },
    achievements: [
      "BLAST Premier World Final 2023 Champions",
      "IEM Dallas 2022 Champions",
      "ESL Pro League Season 14 Champions",
    ],
    teamStats: {
      mapsPlayed: 134,
      mapsWon: 96,
      roundsPlayed: 4198,
      roundsWon: 2634,
      avgRoundsPerMap: 31.3,
      pistolRoundWinRate: 59.7,
      ecoRoundWinRate: 31.2,
      forceRoundWinRate: 39.8,
    },
  },
  {
    id: 5,
    name: "Astralis",
    fullName: "Astralis",
    region: "Europe",
    country: "Denmark",
    ranking: 5,
    rating: 940,
    players: ["device", "blameF", "k0nfig", "Staehr", "jabbi"],
    recentTitles: ["BLAST Premier Spring 2023"],
    founded: "2016",
    winRate: 69.8,
    roundsWon: 1034,
    mapsWon: 71,
    avgRating: 1.05,
    tournaments: 8,
    titles: 1,
    logo: "/api/placeholder/80/80",
    description:
      "Astralis é uma lenda do Counter-Strike, conhecida por revolucionar o jogo tático e conquistar múltiplos Majors.",
    coach: "zonic",
    captain: "blameF",
    headquarters: "Copenhagen, Denmark",
    website: "https://astralis.gg",
    socialMedia: {
      twitter: "@astralisgg",
      instagram: "@astralisgg",
      youtube: "AstralisOfficial",
    },
    achievements: [
      "4x Major Champions (2018-2019)",
      "Intel Grand Slam Winners",
      "BLAST Premier Spring 2023 Champions",
    ],
    teamStats: {
      mapsPlayed: 128,
      mapsWon: 89,
      roundsPlayed: 4012,
      roundsWon: 2456,
      avgRoundsPerMap: 31.3,
      pistolRoundWinRate: 61.2,
      ecoRoundWinRate: 28.9,
      forceRoundWinRate: 38.7,
    },
  },
  {
    id: 6,
    name: "Liquid",
    fullName: "Team Liquid",
    region: "Americas",
    country: "USA",
    ranking: 6,
    rating: 925,
    players: ["YEKINDAR", "EliGE", "NAF", "oSee", "nitr0"],
    recentTitles: ["IEM Chicago 2023"],
    founded: "2015",
    winRate: 68.7,
    roundsWon: 998,
    mapsWon: 72,
    avgRating: 1.04,
    tournaments: 7,
    titles: 1,
    logo: "/api/placeholder/80/80",
    description:
      "Team Liquid é a principal organização norte-americana de esports, representando a região nas competições globais.",
    coach: "daps",
    captain: "EliGE",
    headquarters: "Los Angeles, USA",
    website: "https://teamliquid.com",
    socialMedia: {
      twitter: "@TeamLiquid",
      instagram: "@teamliquid",
      youtube: "TeamLiquidNet",
    },
    achievements: [
      "Intel Grand Slam Season 2 Winners",
      "IEM Chicago 2023 Champions",
      "ESL One Cologne 2019 Champions",
    ],
    teamStats: {
      mapsPlayed: 125,
      mapsWon: 86,
      roundsPlayed: 3912,
      roundsWon: 2389,
      avgRoundsPerMap: 31.3,
      pistolRoundWinRate: 58.4,
      ecoRoundWinRate: 27.6,
      forceRoundWinRate: 37.2,
    },
  },
];

// Dados de partidas recentes dos times
const teamRecentMatchesData = {
  1: [
    // NAVI
    {
      id: 1,
      date: "2025-06-24",
      tournament: "IEM Katowice 2025",
      opponent: "Vitality",
      map: "Mirage",
      result: "W",
      scoreTeam: 16,
      scoreOpponent: 12,
      rounds: [
        { round: 1, winner: "team", type: "pistol" },
        { round: 2, winner: "team", type: "eco" },
        { round: 3, winner: "opponent", type: "force" },
        { round: 4, winner: "team", type: "gun" },
        { round: 5, winner: "team", type: "gun" },
        { round: 6, winner: "opponent", type: "gun" },
        { round: 7, winner: "team", type: "gun" },
        { round: 8, winner: "opponent", type: "gun" },
        { round: 9, winner: "team", type: "gun" },
        { round: 10, winner: "team", type: "gun" },
        { round: 11, winner: "opponent", type: "gun" },
        { round: 12, winner: "team", type: "gun" },
        { round: 13, winner: "opponent", type: "gun" },
        { round: 14, winner: "team", type: "gun" },
        { round: 15, winner: "opponent", type: "gun" },
        { round: 16, winner: "team", type: "pistol" },
        { round: 17, winner: "opponent", type: "eco" },
        { round: 18, winner: "opponent", type: "force" },
        { round: 19, winner: "team", type: "gun" },
        { round: 20, winner: "team", type: "gun" },
        { round: 21, winner: "opponent", type: "gun" },
        { round: 22, winner: "team", type: "gun" },
        { round: 23, winner: "opponent", type: "gun" },
        { round: 24, winner: "team", type: "gun" },
        { round: 25, winner: "team", type: "gun" },
        { round: 26, winner: "opponent", type: "gun" },
        { round: 27, winner: "team", type: "gun" },
        { round: 28, winner: "team", type: "gun" },
      ],
      mvp: "s1mple",
      duration: "42:15",
    },
    {
      id: 2,
      date: "2025-06-23",
      tournament: "IEM Katowice 2025",
      opponent: "FaZe",
      map: "Dust2",
      result: "W",
      scoreTeam: 16,
      scoreOpponent: 9,
      rounds: [
        { round: 1, winner: "team", type: "pistol" },
        { round: 2, winner: "team", type: "eco" },
        { round: 3, winner: "team", type: "force" },
        { round: 4, winner: "opponent", type: "gun" },
        { round: 5, winner: "team", type: "gun" },
        { round: 6, winner: "team", type: "gun" },
        { round: 7, winner: "team", type: "gun" },
        { round: 8, winner: "opponent", type: "gun" },
        { round: 9, winner: "team", type: "gun" },
        { round: 10, winner: "team", type: "gun" },
        { round: 11, winner: "opponent", type: "gun" },
        { round: 12, winner: "team", type: "gun" },
        { round: 13, winner: "team", type: "gun" },
        { round: 14, winner: "opponent", type: "gun" },
        { round: 15, winner: "team", type: "gun" },
        { round: 16, winner: "team", type: "pistol" },
        { round: 17, winner: "team", type: "eco" },
        { round: 18, winner: "opponent", type: "force" },
        { round: 19, winner: "team", type: "gun" },
        { round: 20, winner: "opponent", type: "gun" },
        { round: 21, winner: "team", type: "gun" },
        { round: 22, winner: "opponent", type: "gun" },
        { round: 23, winner: "team", type: "gun" },
        { round: 24, winner: "opponent", type: "gun" },
        { round: 25, winner: "team", type: "gun" },
      ],
      mvp: "electronic",
      duration: "38:42",
    },
    {
      id: 3,
      date: "2025-06-22",
      tournament: "IEM Katowice 2025",
      opponent: "G2",
      map: "Inferno",
      result: "L",
      scoreTeam: 14,
      scoreOpponent: 16,
      rounds: [
        { round: 1, winner: "opponent", type: "pistol" },
        { round: 2, winner: "opponent", type: "eco" },
        { round: 3, winner: "team", type: "force" },
        { round: 4, winner: "opponent", type: "gun" },
        { round: 5, winner: "team", type: "gun" },
        { round: 6, winner: "opponent", type: "gun" },
        { round: 7, winner: "team", type: "gun" },
        { round: 8, winner: "opponent", type: "gun" },
        { round: 9, winner: "team", type: "gun" },
        { round: 10, winner: "team", type: "gun" },
        { round: 11, winner: "opponent", type: "gun" },
        { round: 12, winner: "team", type: "gun" },
        { round: 13, winner: "opponent", type: "gun" },
        { round: 14, winner: "team", type: "gun" },
        { round: 15, winner: "opponent", type: "gun" },
        { round: 16, winner: "team", type: "pistol" },
        { round: 17, winner: "team", type: "eco" },
        { round: 18, winner: "opponent", type: "force" },
        { round: 19, winner: "team", type: "gun" },
        { round: 20, winner: "opponent", type: "gun" },
        { round: 21, winner: "team", type: "gun" },
        { round: 22, winner: "opponent", type: "gun" },
        { round: 23, winner: "team", type: "gun" },
        { round: 24, winner: "opponent", type: "gun" },
        { round: 25, winner: "team", type: "gun" },
        { round: 26, winner: "opponent", type: "gun" },
        { round: 27, winner: "team", type: "gun" },
        { round: 28, winner: "opponent", type: "gun" },
        { round: 29, winner: "team", type: "gun" },
        { round: 30, winner: "opponent", type: "gun" },
      ],
      mvp: "NiKo",
      duration: "45:23",
    },
  ],
  2: [
    // Vitality
    {
      id: 4,
      date: "2025-06-24",
      tournament: "IEM Katowice 2025",
      opponent: "NAVI",
      map: "Mirage",
      result: "L",
      scoreTeam: 12,
      scoreOpponent: 16,
      rounds: [
        { round: 1, winner: "opponent", type: "pistol" },
        { round: 2, winner: "opponent", type: "eco" },
        { round: 3, winner: "team", type: "force" },
        { round: 4, winner: "opponent", type: "gun" },
        { round: 5, winner: "opponent", type: "gun" },
        { round: 6, winner: "team", type: "gun" },
        { round: 7, winner: "opponent", type: "gun" },
        { round: 8, winner: "team", type: "gun" },
        { round: 9, winner: "opponent", type: "gun" },
        { round: 10, winner: "opponent", type: "gun" },
        { round: 11, winner: "team", type: "gun" },
        { round: 12, winner: "opponent", type: "gun" },
        { round: 13, winner: "team", type: "gun" },
        { round: 14, winner: "opponent", type: "gun" },
        { round: 15, winner: "team", type: "gun" },
        { round: 16, winner: "opponent", type: "pistol" },
        { round: 17, winner: "team", type: "eco" },
        { round: 18, winner: "team", type: "force" },
        { round: 19, winner: "opponent", type: "gun" },
        { round: 20, winner: "opponent", type: "gun" },
        { round: 21, winner: "team", type: "gun" },
        { round: 22, winner: "opponent", type: "gun" },
        { round: 23, winner: "team", type: "gun" },
        { round: 24, winner: "opponent", type: "gun" },
        { round: 25, winner: "opponent", type: "gun" },
        { round: 26, winner: "team", type: "gun" },
        { round: 27, winner: "opponent", type: "gun" },
        { round: 28, winner: "opponent", type: "gun" },
      ],
      mvp: "ZywOo",
      duration: "42:15",
    },
  ],
};

// API de Times
export const teamsApi = {
  // Buscar todos os times
  getAll: async (filters = {}) => {
    await delay(700);

    let filteredTeams = [...teamsData];

    // Aplicar filtros
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredTeams = filteredTeams.filter(
        (team) =>
          team.name.toLowerCase().includes(searchTerm) ||
          team.fullName.toLowerCase().includes(searchTerm) ||
          team.players.some((player) =>
            player.toLowerCase().includes(searchTerm)
          )
      );
    }

    if (filters.region && filters.region !== "all") {
      filteredTeams = filteredTeams.filter(
        (team) => team.region === filters.region
      );
    }

    return {
      data: filteredTeams,
      total: filteredTeams.length,
      timestamp: new Date().toISOString(),
    };
  },

  // Buscar time por ID
  getById: async (id) => {
    await delay(500);
    const team = teamsData.find((t) => t.id === parseInt(id));
    if (!team) {
      throw new Error("Time não encontrado");
    }
    return {
      data: team,
      timestamp: new Date().toISOString(),
    };
  },

  // Buscar rankings
  getRankings: async () => {
    await delay(600);
    const sortedTeams = [...teamsData].sort((a, b) => a.ranking - b.ranking);
    return {
      data: sortedTeams,
      total: sortedTeams.length,
      timestamp: new Date().toISOString(),
    };
  },

  // Buscar partidas recentes do time
  getRecentMatches: async (teamId) => {
    await delay(600);
    const matches = teamRecentMatchesData[teamId] || [];
    return {
      data: matches,
      total: matches.length,
      timestamp: new Date().toISOString(),
    };
  },

  // Buscar jogadores do time
  getTeamPlayers: async (teamId) => {
    await delay(500);
    const team = teamsData.find((t) => t.id === parseInt(teamId));
    if (!team) {
      throw new Error("Time não encontrado");
    }

    // Buscar jogadores que pertencem ao time
    const teamPlayers = playersData.filter((player) =>
      team.players.includes(player.name)
    );

    return {
      data: teamPlayers,
      total: teamPlayers.length,
      timestamp: new Date().toISOString(),
    };
  },

  // Buscar estatísticas por mapa do time
  getMapStats: async (teamId) => {
    await delay(500);
    const team = teamsData.find((t) => t.id === parseInt(teamId));
    if (!team) {
      throw new Error("Time não encontrado");
    }
    return {
      data: team.mapStats || [],
      timestamp: new Date().toISOString(),
    };
  },

  // Buscar dados de performance do time
  getPerformanceData: async (teamId) => {
    await delay(400);
    const team = teamsData.find((t) => t.id === parseInt(teamId));
    if (!team) {
      throw new Error("Time não encontrado");
    }
    return {
      data: team.performanceData || [],
      timestamp: new Date().toISOString(),
    };
  },
};

// API de Estatísticas
export const statsApi = {
  // Buscar estatísticas gerais
  getOverview: async () => {
    await delay(400);
    return {
      data: {
        totalPlayers: playersData.length,
        totalTeams: teamsData.length,
        totalMatches: 10000,
        totalTournaments: 50,
      },
      timestamp: new Date().toISOString(),
    };
  },

  // Comparar jogadores
  comparePlayers: async (playerId1, playerId2) => {
    await delay(600);
    const player1 = playersData.find((p) => p.id === parseInt(playerId1));
    const player2 = playersData.find((p) => p.id === parseInt(playerId2));

    if (!player1 || !player2) {
      throw new Error("Um ou ambos jogadores não foram encontrados");
    }

    return {
      data: {
        player1,
        player2,
        comparison: {
          ratingDiff: player1.rating - player2.rating,
          kdDiff: player1.kd - player2.kd,
          adrDiff: player1.adr - player2.adr,
          headshotDiff: player1.headshot - player2.headshot,
        },
      },
      timestamp: new Date().toISOString(),
    };
  },

  // Comparar times
  compareTeams: async (teamId1, teamId2) => {
    await delay(600);
    const team1 = teamsData.find((t) => t.id === parseInt(teamId1));
    const team2 = teamsData.find((t) => t.id === parseInt(teamId2));

    if (!team1 || !team2) {
      throw new Error("Um ou ambos times não foram encontrados");
    }

    return {
      data: {
        team1,
        team2,
        comparison: {
          ratingDiff: team1.rating - team2.rating,
          winRateDiff: team1.winRate - team2.winRate,
          rankingDiff: team2.ranking - team1.ranking, // Menor ranking é melhor
          titlesDiff: team1.titles - team2.titles,
        },
      },
      timestamp: new Date().toISOString(),
    };
  },
};

# Guia de Implementação - TanStack Query

Este documento detalha a implementação do TanStack Query no projeto CS2 Player Analysis, incluindo padrões, melhores práticas e exemplos de uso.

## 📋 Índice

1. [Configuração Inicial](#configuração-inicial)
2. [Estrutura de Query Keys](#estrutura-de-query-keys)
3. [Hooks Personalizados](#hooks-personalizados)
4. [Gerenciamento de Cache](#gerenciamento-de-cache)
5. [Estados de Interface](#estados-de-interface)
6. [Otimizações de Performance](#otimizações-de-performance)
7. [Debugging e DevTools](#debugging-e-devtools)
8. [Melhores Práticas](#melhores-práticas)

## 🚀 Configuração Inicial

### 1. Instalação das Dependências

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

### 2. Configuração do QueryClient

**Arquivo: `src/main.jsx`**

```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

// Wrapper da aplicação
<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

### 3. Configurações Explicadas

- **staleTime**: Tempo que os dados são considerados "frescos"
- **cacheTime**: Tempo que os dados ficam em cache após não serem usados
- **retry**: Número de tentativas em caso de erro
- **refetchOnWindowFocus**: Desabilita refetch automático ao focar na janela

## 🔑 Estrutura de Query Keys

### Padrão Hierárquico

**Arquivo: `src/hooks/useQueries.js`**

```javascript
export const queryKeys = {
  players: {
    all: ['players'],
    lists: () => [...queryKeys.players.all, 'list'],
    list: (filters) => [...queryKeys.players.lists(), filters],
    details: () => [...queryKeys.players.all, 'detail'],
    detail: (id) => [...queryKeys.players.details(), id],
    byTeam: (teamName) => [...queryKeys.players.all, 'team', teamName],
  },
  teams: {
    all: ['teams'],
    lists: () => [...queryKeys.teams.all, 'list'],
    list: (filters) => [...queryKeys.teams.lists(), filters],
    details: () => [...queryKeys.teams.all, 'detail'],
    detail: (id) => [...queryKeys.teams.details(), id],
    rankings: () => [...queryKeys.teams.all, 'rankings'],
  },
  stats: {
    all: ['stats'],
    overview: () => [...queryKeys.stats.all, 'overview'],
    comparePlayers: (id1, id2) => [...queryKeys.stats.all, 'compare', 'players', id1, id2],
    compareTeams: (id1, id2) => [...queryKeys.stats.all, 'compare', 'teams', id1, id2],
  },
}
```

### Vantagens da Estrutura Hierárquica

1. **Invalidação Granular**: Pode invalidar todas as queries de jogadores ou apenas uma específica
2. **Organização**: Estrutura clara e previsível
3. **Manutenibilidade**: Fácil de expandir e modificar
4. **Performance**: Cache eficiente com chaves bem definidas

## 🎣 Hooks Personalizados

### 1. Hook Básico de Listagem

```javascript
export const usePlayers = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.players.list(filters),
    queryFn: () => playersApi.getAll(filters),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    keepPreviousData: true, // Mantém dados anteriores durante nova busca
  });
};
```

### 2. Hook com Condição de Execução

```javascript
export const usePlayer = (id) => {
  return useQuery({
    queryKey: queryKeys.players.detail(id),
    queryFn: () => playersApi.getById(id),
    enabled: !!id, // Só executa se ID estiver presente
    staleTime: 10 * 60 * 1000,
  });
};
```

### 3. Hook de Comparação Condicional

```javascript
export const useComparePlayersQuery = (playerId1, playerId2) => {
  return useQuery({
    queryKey: queryKeys.stats.comparePlayers(playerId1, playerId2),
    queryFn: () => statsApi.comparePlayers(playerId1, playerId2),
    enabled: !!(playerId1 && playerId2 && playerId1 !== playerId2),
    staleTime: 5 * 60 * 1000,
  });
};
```

### 4. Hook de Prefetch

```javascript
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
```

## 💾 Gerenciamento de Cache

### 1. Invalidação de Cache

```javascript
export const useInvalidatePlayers = () => {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
  };
};
```

### 2. Limpeza de Cache

```javascript
export const useClearCache = () => {
  const queryClient = useQueryClient();
  
  return {
    clearPlayers: () => queryClient.removeQueries({ queryKey: queryKeys.players.all }),
    clearTeams: () => queryClient.removeQueries({ queryKey: queryKeys.teams.all }),
    clearAll: () => queryClient.clear(),
  };
};
```

### 3. Verificação de Cache

```javascript
export const useHasCachedData = (queryKey) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(queryKey);
  return !!data;
};
```

## 🎨 Estados de Interface

### 1. Estados Básicos

```javascript
const { data, isLoading, isError, error, refetch, isFetching } = usePlayers(filters);

// Loading State
if (isLoading) {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-3" />
      <span className="text-lg text-gray-600">Carregando jogadores...</span>
    </div>
  );
}

// Error State
if (isError) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-6 h-6 text-red-600" />
        <div>
          <h3 className="text-red-800 font-semibold">Erro ao carregar jogadores</h3>
          <p className="text-red-600 text-sm mt-1">{error?.message}</p>
          <Button onClick={() => refetch()} className="mt-3">
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### 2. Estados Avançados

```javascript
const { data, isLoading, isError, isFetching, isStale } = usePlayers(filters);

// Indicador de Background Fetch
{isFetching && (
  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-blue-500" />
)}

// Indicador de Dados Desatualizados
{isStale && (
  <span className="text-orange-500 ml-2">(Dados desatualizados)</span>
)}
```

## ⚡ Otimizações de Performance

### 1. Prefetch ao Hover

```javascript
const prefetchPlayer = usePrefetchPlayer();

const handlePlayerHover = (playerId) => {
  prefetchPlayer(playerId);
};

<div onMouseEnter={() => handlePlayerHover(player.id)}>
  {/* Conteúdo do player */}
</div>
```

### 2. KeepPreviousData

```javascript
export const usePlayers = (filters = {}) => {
  return useQuery({
    queryKey: queryKeys.players.list(filters),
    queryFn: () => playersApi.getAll(filters),
    keepPreviousData: true, // Mantém dados anteriores durante nova busca
  });
};
```

### 3. Stale Time Estratégico

```javascript
// Dados que mudam frequentemente
const { data } = useTeamRankings(); // staleTime: 2 minutos

// Dados que mudam raramente
const { data } = useStatsOverview(); // staleTime: 15 minutos

// Dados específicos
const { data } = usePlayer(id); // staleTime: 10 minutos
```

## 🐛 Debugging e DevTools

### 1. Configuração do DevTools

```javascript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

<ReactQueryDevtools 
  initialIsOpen={false} 
  position="bottom-right"
/>
```

### 2. Informações de Debug em Desenvolvimento

```javascript
{process.env.NODE_ENV === 'development' && data?.timestamp && (
  <div className="text-xs text-gray-500">
    Dados de: {new Date(data.timestamp).toLocaleString()}
    {isStale && <span className="text-orange-500 ml-2">(Desatualizados)</span>}
  </div>
)}
```

### 3. Logs Personalizados

```javascript
const { data, isLoading } = useQuery({
  queryKey: ['debug-query'],
  queryFn: async () => {
    console.log('🔄 Executando query...');
    const result = await api.getData();
    console.log('✅ Query concluída:', result);
    return result;
  },
  onSuccess: (data) => {
    console.log('🎉 Sucesso:', data);
  },
  onError: (error) => {
    console.error('❌ Erro:', error);
  },
});
```

## 📋 Melhores Práticas

### 1. Estrutura de Arquivos

```
src/
├── hooks/
│   ├── useQueries.js      # Todos os hooks do TanStack Query
│   └── useCustomHooks.js  # Hooks personalizados da aplicação
├── services/
│   ├── api.js            # Funções de API
│   └── queryClient.js    # Configuração do QueryClient
└── utils/
    └── queryKeys.js      # Query keys centralizadas (opcional)
```

### 2. Nomenclatura Consistente

```javascript
// ✅ Bom
const { data: playersData, isLoading: playersLoading } = usePlayers();
const { data: teamsData, isLoading: teamsLoading } = useTeams();

// ❌ Evitar
const { data, isLoading } = usePlayers();
const { data: data2, isLoading: loading2 } = useTeams();
```

### 3. Tratamento de Erros

```javascript
// ✅ Tratamento específico por tipo de erro
const { data, isError, error } = usePlayers();

if (isError) {
  if (error?.status === 404) {
    return <NotFound />;
  }
  if (error?.status === 500) {
    return <ServerError />;
  }
  return <GenericError error={error} />;
}
```

### 4. Configurações por Contexto

```javascript
// Dados críticos - retry mais agressivo
const { data } = useQuery({
  queryKey: ['critical-data'],
  queryFn: getCriticalData,
  retry: 5,
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
});

// Dados opcionais - sem retry
const { data } = useQuery({
  queryKey: ['optional-data'],
  queryFn: getOptionalData,
  retry: false,
});
```

### 5. Invalidação Inteligente

```javascript
// ✅ Invalidação granular
queryClient.invalidateQueries({ queryKey: queryKeys.players.lists() });

// ✅ Invalidação específica
queryClient.invalidateQueries({ queryKey: queryKeys.players.detail(playerId) });

// ❌ Invalidação muito ampla (pode causar requisições desnecessárias)
queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
```

## 🎯 Casos de Uso Específicos

### 1. Busca com Debounce

```javascript
const [searchTerm, setSearchTerm] = useState('');
const [debouncedSearch, setDebouncedSearch] = useState('');

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 300);
  
  return () => clearTimeout(timer);
}, [searchTerm]);

const { data } = usePlayers({ search: debouncedSearch });
```

### 2. Paginação

```javascript
const [page, setPage] = useState(1);

const { data, isLoading, isPreviousData } = useQuery({
  queryKey: ['players', 'list', { page }],
  queryFn: () => playersApi.getAll({ page }),
  keepPreviousData: true,
});
```

### 3. Refresh Manual

```javascript
const { data, refetch, isFetching } = usePlayers();

<Button 
  onClick={() => refetch()} 
  disabled={isFetching}
  className="flex items-center gap-2"
>
  <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
  Atualizar
</Button>
```

## 📊 Métricas e Monitoramento

### 1. Cache Hit Rate

```javascript
// Monitorar eficiência do cache
const queryClient = useQueryClient();
const cache = queryClient.getQueryCache();

console.log('Queries em cache:', cache.getAll().length);
console.log('Queries ativas:', cache.getAll().filter(q => q.getObserversCount() > 0).length);
```

### 2. Performance Tracking

```javascript
const { data, dataUpdatedAt, isStale } = useQuery({
  queryKey: ['performance-test'],
  queryFn: async () => {
    const start = performance.now();
    const result = await api.getData();
    const end = performance.now();
    console.log(`Query executada em ${end - start}ms`);
    return result;
  },
});
```

---

Este guia fornece uma base sólida para implementar e manter o TanStack Query de forma eficiente e escalável no projeto CS2 Player Analysis.


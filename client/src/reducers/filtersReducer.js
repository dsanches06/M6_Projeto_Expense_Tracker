// Reducer para gestão dos filtros do Dashboard
// Gere o estado dos filtros de data e categoria
// Ações: SET_DATE_RANGE, SET_CATEGORY, RESET

// Formata número com zero à esquerda (ex: 1 → "01")
const pad = (n) => String(n).padStart(2, '0');

export const filtersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATE_RANGE':
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };

    case 'SET_CATEGORY':
      return {
        ...state,
        activeCategory: action.payload.slug,
        activeCategoryType: action.payload.type,
      };

    case 'RESET':
      return {
        startDate: getFirstDayOfMonth(),
        endDate: getTodayDate(),
        activeCategory: null,
        activeCategoryType: null,
      };

    default:
      return state;
  }
};

// Função auxiliar para obter o primeiro dia do mês actual (hora local, sem UTC)
const getFirstDayOfMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-01`;
};

// Função auxiliar para obter a data actual (hora local, sem UTC)
const getTodayDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

// Estado inicial dos filtros (mês actual)
export const initialFiltersState = {
  startDate: getFirstDayOfMonth(),
  endDate: getTodayDate(),
  activeCategory: null,
  activeCategoryType: null,
};

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
        activeCategory: action.payload,
      };

    case 'RESET':
      return {
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          .toISOString()
          .split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        activeCategory: null,
      };

    default:
      return state;
  }
};

// Função auxiliar para obter o primeiro dia do mês actual
export const getFirstDayOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split('T')[0];
};

// Função auxiliar para obter a data actual
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Estado inicial dos filtros (mês actual)
export const initialFiltersState = {
  startDate: getFirstDayOfMonth(),
  endDate: getTodayDate(),
  activeCategory: null,
};

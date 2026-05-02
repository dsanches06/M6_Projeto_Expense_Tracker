// Reducer para gestão dos filtros do Dashboard
// Gere o estado dos filtros de data e categoria (múltiplas)
// Ações: SET_DATE_RANGE, SET_CATEGORIES, RESET

export const filtersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATE_RANGE':
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };

    case 'SET_CATEGORIES':
      return {
        ...state,
        activeCategories: action.payload,
      };

    case 'RESET':
      return {
        startDate: '',
        endDate: '',
        activeCategories: [],
      };

    default:
      return state;
  }
};

// Estado inicial dos filtros (sem filtro de data)
export const initialFiltersState = {
  startDate: '',
  endDate: '',
  activeCategories: [],
};

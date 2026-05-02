// Reducer para gestão dos filtros do Dashboard
// Gere o estado dos filtros de data e categoria
// Ações: SET_DATE_RANGE, SET_CATEGORY, RESET

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
        startDate: '',
        endDate: '',
        activeCategory: null,
        activeCategoryType: null,
      };

    default:
      return state;
  }
};

// Estado inicial dos filtros (sem filtro de data)
export const initialFiltersState = {
  startDate: '',
  endDate: '',
  activeCategory: null,
  activeCategoryType: null,
};

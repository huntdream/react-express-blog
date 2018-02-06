let initialState = {
  posts: {
    items: [],
    isFetching: true,
    hasError: false
  }
};

function posts(state = initialState.posts, action) {
  switch (action.type) {
    case 'ITEMS_HAVE_ERROR':
      return { ...state, hasError: action.hasError };
    case 'ITEMS_ARE_LOADING':
      return { ...state, isFetching: action.isFetching };
    case 'ITEMS_FETCH_SUCCESS':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

export default posts;

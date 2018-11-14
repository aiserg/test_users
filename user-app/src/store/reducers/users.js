const defaultState = {
  usersProfiles: [],
  specificUsersProfiles: [],
  newUsersCountries: [],
}

const users = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE_LOADING_STATE':
      return {
        ...state,
        isPageLoaded: action.isPageLoaded
      }
    case 'SET_USERS_PROFILES':
      return {
        ...state,
        usersProfiles: action.usersProfiles
      }
    case 'SET_SPECIFIC_USERS_PROFILES':
      return {
        ...state,
        usersProfiles: [].concat(state.usersProfiles, action.specificUsersProfiles)
      }  
    case 'CHANGE_USER_COUNTRY':
      return {
        ...state,
        newUsersCountries: {
          ...state.newUsersCountries,
          [action.userId] : action.newCountry
        }
      }  
    default:
      return state;
  }
}

export default users

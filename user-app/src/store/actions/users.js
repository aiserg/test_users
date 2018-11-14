import UsersHelper from 'api/users/users';

export function getUsers() {
  return async (dispatch, getState) => {
    try {
      const usersProfiles = await UsersHelper.getUsers();
      dispatch({
        type: 'SET_USERS_PROFILES',
        usersProfiles
      });
      dispatch(isPageLoaded(true));
    } catch (error) {
      console.error(error);
      dispatch(isPageLoaded(true));
    }
  };
}

export function getSpecificUser(userId) {
  return async (dispatch, getState) => {
    try {
      const specificUsersProfiles = await UsersHelper.getUser(userId);
      dispatch({
        type: 'SET_SPECIFIC_USERS_PROFILES',
        specificUsersProfiles
      });
      dispatch(isPageLoaded(true));
    } catch (error) {
      dispatch(isPageLoaded(true));
      console.error(error);
    }
  };
}

export const isPageLoaded = isPageLoaded => ({
  type: 'CHANGE_PAGE_LOADING_STATE',
  isPageLoaded
})

export const changeUserCountry = newUsersCountries => ({
  type: 'CHANGE_USER_COUNTRY',
  ...newUsersCountries
})

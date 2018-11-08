
const UsersHelper = {

  async getUsers() {
    try {
      const response = await fetch('/api/users');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    } catch (error) {
      console.log('[Error][UsersHelper.getUsers]', error);
    }
  },

  async getUser(userId) {
    try {
      if (!userId) throw Error('userId is not defined');
      const response = await fetch(`${'/api/user/' + userId}`);
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    } catch (error) {
      console.log('[Error][UsersHelper.getUser]', error);
    }
  },

}

export default UsersHelper;

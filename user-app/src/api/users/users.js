
const OK_STATUS = 200;


const UsersHelper = {

  async getUsers() {
    try {
      const response = await fetch('/api/users');
      const body = await response.json();
      if (response.status !== OK_STATUS) throw Error(body.message);
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
      if (response.status !== OK_STATUS) throw Error(body.message);
      return body;
    } catch (error) {
      console.log('[Error][UsersHelper.getUser]', error);
    }
  },

  async changeUserCountry(country, userId) {
    try {
      if (!country || !userId) throw Error('country or userId is not defined');
      await fetch('/api/user/country', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: userId, country: country})
      });
    } catch (error) {
      console.log('[Error][UsersHelper.changeUserCountry]', error);
    }
  },

}

export default UsersHelper;

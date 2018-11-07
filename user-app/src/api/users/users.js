const UsersHelper = {

  async callApi() {
    const response = await fetch('/api/users');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  },



}

export default UsersHelper;

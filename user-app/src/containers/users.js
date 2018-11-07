import React, { Component } from 'react';
import styles from 'containers/users.module.sass';
import UserCard from 'components/user-card';


class UsersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.list}>
          {this.renderList()}
        </div>
      </div>
    );
  }

  renderList() {
    const { users } = this.state;
    console.warn(users);
    const usersCards = users && users.map((user, key) =>
      <UserCard
        key={key}
        user={user}
      />
    );
    return usersCards
  }

  renderListItem() {

  }

  callApi = async () => {
    const response = await fetch('/api/users');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ users: res }))
      .catch(err => console.log(err));
  }
}

export default UsersContainer;

import React, { Component } from 'react';
import styles from 'containers/users.module.sass';
import UserCard from 'components/user-card';
import UsersHelper from 'api/users/users';


class UsersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    }
  }

  componentDidMount() {
    UsersHelper.getUsers()
      .then(users => this.setState({ users }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.list}>
          {this.renderCards()}
        </div>
      </div>
    );
  }

  renderCards() {
    const { users } = this.state;
    const usersCards = users && users.map((user, key) =>
      <UserCard
        key={key}
        user={user}
        history={this.props.history}
      />
    );
    return usersCards
  }

}

export default UsersContainer;

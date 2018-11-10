import React, { Component } from 'react';
import styles from 'containers/users.module.sass';
import UserCard from 'components/user-card';
import UsersHelper from 'api/users/users';
import Spinner from 'static/spinner.png';


class UsersContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: null,
      loading: true,
    }
  }

  componentDidMount = () => {
    UsersHelper.getUsers()
      .then(users => this.setState({ users, loading: false }))
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }
  
  renderCards = () => {
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

  renderSpinner = () => {
    return (
      <div className={styles.spinnerWrapper}>
        <img //eslint-disable-line
          src={Spinner}
          className={styles.spinner}
        />
      </div>
    )
  }

  render() {
    const { loading } = this.state;
    if (loading) return this.renderSpinner();

    return (
      <div className={styles.users}>
        <div className={styles.list}>
          {this.renderCards()}
        </div>
      </div>
    );
  }
}

export default UsersContainer;

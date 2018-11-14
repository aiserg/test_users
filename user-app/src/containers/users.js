import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from 'containers/users.module.sass';
import UserCard from 'components/user-card';
import Spinner from 'static/spinner.png';
import { getUsers } from 'store/actions/users';


class UsersContainer extends Component {

  componentDidMount() {
    this.props.dispatch(getUsers());
  }

  render() {
    const { isPageLoaded } = this.props.users;
    if (!isPageLoaded) return this.renderSpinner();

    return (
      <div className={styles.users}>
        <div className={styles.list}>
          {this.renderCards()}
        </div>
      </div>
    );
  }
  
  renderCards = () => {
    const { usersProfiles } = this.props.users;
    const usersCards = usersProfiles && usersProfiles.map((user, key) =>
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
}

const mapStateToProps = state => {
  return ({
    users: state.users,
  })
}

export default connect(mapStateToProps)(UsersContainer);

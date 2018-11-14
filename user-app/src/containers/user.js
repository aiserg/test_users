import React, { Component } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import styles from 'containers/user.module.sass';
import UserProfile from 'components/user-profile';
import { getSpecificUser, changeUserCountry } from 'store/actions/users';


class UserContainer extends Component {

  constructor(props) {
    super(props);
    this.userId = get(props, 'match.params.id');
  }
  
  getUserData = () => {
    const { usersProfiles } = this.props.users;
    if (!usersProfiles || !usersProfiles.length) return [];
    // eslint-disable-next-line
    return usersProfiles.find(user => user.id == this.userId) 
  }

  componentDidMount() {
    const userData = this.getUserData();
    if (userData && userData.id) return;
    this.props.dispatch(getSpecificUser(this.userId));
  }

  render() {
    const userProfile = this.getUserData();
    if (!userProfile.id) return null

    return (
      <div className={styles.wrapper}>
        {this.renderHeader()}
        <UserProfile
          userProfile={userProfile}
          history={this.props.history}
          changeUserCountry={this.changeUserCountry}
          newCountry={this.getNewCountryForUserProfile()}
        />
        {this.renderFooter()}
      </div>
    );
  }

  getNewCountryForUserProfile = () => {
    const newUsersCountries = get(this.props, 'users.newUsersCountries', [])
    return newUsersCountries[this.userId]
  }

  changeUserCountry = (newCountry) => {
    this.props.dispatch(changeUserCountry({ userId: this.userId, newCountry }))
  }
  
  renderBackButton() {
    const buttonLabel = '← Back';
    return (
      <div
        className={styles.backButton}
        onClick={this.handleBackButtonPress}
      >
        { buttonLabel }
      </div>
    )
  }

  handleBackButtonPress = () => {
    this.props.history.push('/');
  }

  renderHeader = () => {
    return (
      <header className={styles.header}>
        { this.renderBackButton() }
      </header>
    )
  }

  renderFooter = () => {
    return (
      <footer className={styles.footer}/>
    )
  }

}

const mapStateToProps = state => {
  return ({
    users: state.users,
  })
}

export default connect(mapStateToProps)(UserContainer);

import React, { Component } from 'react';
import { get, has } from 'lodash'
import styles from 'containers/user.module.sass';
import avatar from 'static/avatar.png';
import UsersHelper from 'api/users/users';


class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
      newCountry: null,
      hasUserCountryUpdated: false
    }
  }

  componentDidMount = () => {
    const userData = get(this.props, 'location.state')
    if (userData.id) return this.setState({ user: userData, loading: false})

    UsersHelper.getUser(get(this.props, 'match.params.id'))
      .then(user => this.setState({ user, loading: false }))
      .catch(err => {
        console.log(err)
        this.setState({ loading: false })
      });
  }

  handleBackButtonPress = () => {
    this.props.history.push('/');
  }
  
  renderBackButton() {
    const buttonLabel = '← Back';
    return (
      <div
        className={styles.backButton}
        onClick={this.handleBackButtonPress}
      >
        {buttonLabel}
      </div>
    )
  }

  renderHeader() {
    return (
      <header className={styles.header}>
        {this.renderBackButton()}
      </header>
    )
  }

  renderProfileImage() {
    return (
      <div className={styles.profileImageWrapper}>
        <img 
          src={avatar}
          className={styles.profileImage}
          alt='avatar'
        />
      </div>
    )
  }

  renderUserName() {
    const { user } = this.state;
    const userName = get(user, 'name', '');
    return (
      <div className={styles.userName}>
        { userName }
      </div>
    )
  }

  getUserAge = () => {
    const userAge = get(this.state, 'user.age', '')
    return userAge ? userAge + ' years' : '';
  }

  renderUserAge() {
    const userAge = this.getUserAge()
    return (
      <div className={styles.userAge}>
        { userAge }
      </div>
    )
  }

  renderCountry = () => {
    const { user, hasUserCountryUpdated } = this.state;
    const hasUserCountry = has(user, 'city');
    const showInput = !(hasUserCountry || hasUserCountryUpdated)

    return (
      showInput ? this.renderCountryField() : this.renderUserCountry()
    )
  }

  renderUserCountry() {
    const { user, newCountry } = this.state;
    const userCountry = get(user, 'city');
    
    return (
      <div className={styles.userCountry}>
        { userCountry || newCountry }
      </div>
    )
  }

  handleSubmitButton = () => {
    const { user, newCountry } = this.state;
    UsersHelper.changeUserCountry(newCountry, user.id)
      .then(res => this.setState({ hasUserCountryUpdated: true}))
      .catch(err => console.log(err));
  }

  handleCountryChange = (event) => {
    this.setState({ newCountry: event.target.value })
  }

  renderCountryField() {
    const label = 'Country:';
    const buttonLabel = 'Submit';

    return (
      <div className={styles.countryField}>
        <span className={styles.countryLabel}>{label}</span>
        <input
          className={styles.countryInput}
          type='text'
          onChange={this.handleCountryChange}
        />
        <input
          className={styles.countrySubmitButton}
          type='button'
          value={buttonLabel}
          onClick={this.handleSubmitButton}
        />
      </div>
    )
  }

  renderSeparationLine() {
    return (
      <div className={styles.separationLine}/>
    )
  }

  renderKnowledge() {
    const { user } = this.state;
    const knowledge = get(user, 'knowledge', []);
    const knownLanguages = knowledge.map((languageName, key) => {
      return (
        <div
          key={key}
          className={styles.language}
        >
          <div className={styles.languageName}>
            {languageName.language}
          </div>
          <div>
            {languageName.frameworks.join(' - ')}
          </div>
        </div>
      )
    })

    return (
      <div className={styles.knownLanguages}>
        {knownLanguages}
      </div>
    )
  }

  renderFooter() {
    return (
      <footer className={styles.footer}/>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderHeader()}
        <div className={styles.userInfo}>
          {this.renderProfileImage()}
          {this.renderUserName()}
          {this.renderUserAge()}
          {this.renderCountry()}
          {this.renderSeparationLine()}
          {this.renderKnowledge()}
        </div>
        {this.renderFooter()}
      </div>
    );
  }
}

export default UserContainer;

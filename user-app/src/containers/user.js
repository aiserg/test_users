import React, { Component } from 'react';
import { get, has } from 'lodash';
import styles from 'containers/user.module.sass';
import avatar from 'static/avatar.png';
import UsersHelper from 'api/users/users';


class UserContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      submitting: false,
      user: null,
      newCountry: null,
      hasUserCountryUpdated: false
    }
  }

  componentDidMount = () => {
    const userData = get(this.props, 'location.state');
    if (userData.id) return this.setState({ user: userData, loading: false});
    const userId = get(this.props, 'match.params.id');
    UsersHelper.getUser(userId)
      .then(user => this.setState({ user, loading: false }))
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
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

  renderProfileImage = () => {
    return (
      <div className={styles.profileImageWrapper}>
        <img 
          src={avatar}
          className={styles.profileImage}
          alt={'avatar'}
        />
      </div>
    )
  }

  renderUserName = () => {
    const userName = get(this.state, 'user.name', '');
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

  renderUserAge = () => {
    const userAge = this.getUserAge();
    return (
      <div className={styles.userAge}>
        { userAge }
      </div>
    )
  }

  renderCountry = () => {
    const { user, hasUserCountryUpdated } = this.state;
    const hasUserCountry = has(user, 'city');
    const showInput = !(hasUserCountry || hasUserCountryUpdated);
    return showInput ? this.renderCountryField() : this.renderUserCountry()
  }

  renderUserCountry = () => {
    const { newCountry } = this.state;
    const userCountry = get(this.state, 'user.city');
    return (
      <div className={styles.userCountry}>
        { userCountry || newCountry }
      </div>
    )
  }

  handleSubmitButton = () => {
    const { user, newCountry } = this.state;
    this.setState({ submitting: true });
    UsersHelper.changeUserCountry(newCountry, user.id)
      .then(res => this.setState({
        hasUserCountryUpdated: true,
        submitting: false,
      }))
      .catch(error => this.setState({
        submitting: false,
      }));
  }

  handleCountryChange = (event) => {
    const newCountry = get(event, 'target.value', '');
    this.setState({ newCountry })
  }

  canSaveCountry = () => {
    const { submitting, newCountry } = this.state;
    const properCountryName = newCountry && newCountry.length && newCountry.length > 0;
    return properCountryName && !submitting
  }
 
  renderCountryField = () => {
    const label = 'Country:';
    const buttonLabel = 'Submit';
    const isActiveSaveButton = this.canSaveCountry();
    const buttonStyle = isActiveSaveButton ?
      styles.countrySubmitButton :
      styles.countrySubmitButtonDisabled;

    return (
      <div className={styles.countryField}>
        <span className={styles.countryLabel}>
          {label}
        </span>
        <input
          type='text'
          className={styles.countryInput}
          onChange={this.handleCountryChange}
        />
        <input
          type='button'
          disabled={!isActiveSaveButton}
          className={buttonStyle}
          value={buttonLabel}
          onClick={this.handleSubmitButton}
        />
      </div>
    )
  }

  renderSeparationLine = () => {
    return (
      <div className={styles.separationLine}/>
    )
  }

  renderKnowledge = () => {
    const knowledge = get(this.state, 'user.knowledge', []);
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

  renderFooter = () => {
    return (
      <footer className={styles.footer}/>
    )
  }

}

export default UserContainer;

import React, { Component } from 'react';
import { get, has } from 'lodash';
import styles from 'containers/user.module.sass';
import avatar from 'static/avatar.png';
import UsersHelper from 'api/users/users';


class UserProfile extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      submitting: false,
      hasUserCountryUpdated: false
    }
  }
  
  render() {
    const userProfile = get(this.props, 'userProfile');
    if (!userProfile || !userProfile.id) return null
    
    return (
      <div className={styles.userInfo}>
        {this.renderProfileImage()}
        {this.renderUserName()}
        {this.renderUserAge()}
        {this.renderCountry()}
        {this.renderSeparationLine()}
        {this.renderKnowledge()}
      </div>
    );
  }
  
  renderBackButton = () => {
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
    const userName = get(this.props, 'userProfile.name')
    return (
      <div className={styles.userName}>
        { userName }
      </div>
    )
  }

  getUserAge = () => {
    const userAge = get(this.props, 'userProfile.age')
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
    const { userProfile } = this.props;
    const { hasUserCountryUpdated } = this.state;
    const hasUserCountry = has(userProfile, 'city');
    const showInput = !(hasUserCountry || hasUserCountryUpdated);
    return showInput ? this.renderCountryField() : this.renderUserCountry()
  }

  renderUserCountry = () => {
    const { newCountry } = this.props;
    const userCountry = get(this.props, 'userProfile.city')
    return (
      <div className={styles.userCountry}>
        { userCountry || newCountry }
      </div>
    )
  }

  handleSubmitButton = () => {
    const { newCountry, userProfile } = this.props;
    this.setState({ submitting: true });
    UsersHelper.changeUserCountry(newCountry, userProfile.id)
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
    this.props.changeUserCountry(newCountry);
  }

  canSaveCountry = () => {
    const { submitting, newCountry } = this.props;
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
    const knowledge = get(this.props, 'userProfile.knowledge')
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

}

export default UserProfile;

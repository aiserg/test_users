import React, { Component } from 'react';
import { get } from 'lodash'
import styles from 'containers/user.module.sass';
import avatar from 'static/avatar.png';
import UsersHelper from 'api/users/users';


class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
      country: null,
    }

  }

  componentDidMount = () => {
    const userData = get(this.props, 'location.state')
    if (userData.id) return this.setState({ user: userData, loading: false})

    UsersHelper.getUser(get(this.props, 'match.params.id'))
      .then(res => this.setState({ user: res, loading: false }))
      .catch(err => console.log(err));
  }
  
  renderBackButton() {
    const buttonLabel = '← Back';
    return (
      <div
        className={styles.backButton}
        onClick={() => this.props.history.push('/')}
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
        <img src={avatar} className={styles.profileImage} alt='avatar' />
      </div>
    )
  }

  renderUserName() {
    const { user } = this.state;
    const userName = user && user.name || '';
    return (
      <div className={styles.userName}>
        { userName }
      </div>
    )
  }

  renderUserAge() {
    const { user } = this.state;
    const userAge = user && user.age ? user.age + ' years' : '';
    return (
      <div className={styles.userAge}>
        { userAge }
      </div>
    )
  }

  renderUserCountry(userCountry) {
    return (
      <div className={styles.userCountry}>
        { userCountry }
      </div>
    )
  }

  handleCountryChange() {
    const { user, country } = this.state;
    UsersHelper.changeUserCountry(country, user.id)
      .then(res => {})
      .catch(err => console.log(err));
  }

  renderCountryField() {
    const label = 'Country:';

    return (
      <div className={styles.countryField}>
        <span className={styles.countryLabel}>{label}</span>
        <input
          className={styles.countryInput}
          type='text'
          onChange={(event) => this.setState({ country: event.target.value })}
        />
        <input
          className={styles.countrySubmitButton}
          type='button'
          value='Submit'
          onClick={() => this.handleCountryChange()}
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
    const knownLanguages = knowledge.map((language, key) => {
      return (
        <div
          key={key}
          className={styles.language}
        >
          <div className={styles.languageName}>
            {language.language}
          </div>
          <div>
            {language.frameworks.join(' - ')}
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
    const { user } = this.state;
    const userCountry = get(user, 'city');

    return (
      <div className={styles.wrapper}>
        {this.renderHeader()}
        <div className={styles.userInfo}>
          {this.renderProfileImage()}
          {this.renderUserName()}
          {this.renderUserAge()}
          { userCountry ? this.renderUserCountry(userCountry) : this.renderCountryField() }
          {this.renderSeparationLine()}
          {this.renderKnowledge()}
        </div>
        {this.renderFooter()}
      </div>
    );
  }
}

export default UserContainer;

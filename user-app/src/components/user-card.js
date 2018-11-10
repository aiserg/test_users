import React, { Component } from 'react';
import styles from 'components/user-card.module.sass';
import avatar from 'static/avatar.png';
import { get } from 'lodash';


export default class UserCard extends Component {

  render() {
    return (
      <div
        className={styles.wrapper}
        onClick={this.handleUserCardClick}
      >
        {this.renderProfileImage()}
        {this.renderUserName()}
        {this.renderUserAge()}
        {this.renderKnownLanguages()}
      </div>
    );
  }

  renderProfileImage = () => {
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

  renderUserName = () => {
    const userName = get(this.props, 'user.name', '');
    return (
      <div className={styles.userName}>
        { userName }
      </div>
    )
  }

  getUserAge = () => {
    const userAge = get(this.props, 'user.age', '')
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

  renderKnownLanguages = () => {
    const knowledge = get(this.props, 'user.knowledge', []);
    const knownLanguages = knowledge.map(languageName => languageName.language);
    const languageList = knownLanguages.join(', ');

    return (
      <div className={styles.knownLanguages}>
        { languageList }
      </div>
    )
  }

  handleUserCardClick = () => {
    const { user, history } = this.props;
    history.push('/user/' + user.id, user);
  }

}

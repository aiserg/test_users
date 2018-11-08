import React, { Component } from 'react';
import styles from 'components/user-card.module.sass';
import avatar from 'static/avatar.png';
import { get } from 'lodash';


class UserCard extends Component {

  renderProfileImage() {
    return (
      <div className={styles.profileImageWrapper}>
        <img src={avatar} className={styles.profileImage} alt='avatar' />
      </div>
    )
  }

  renderUserName() {
    const { user } = this.props;
    const userName = user.name || '';
    return (
      <div className={styles.userName}>
        { userName }
      </div>
    )
  }

  renderUserAge() {
    const { user } = this.props;
    const userAge = user.age ? user.age + ' years' : '';
    return (
      <div className={styles.userAge}>
        { userAge }
      </div>
    )
  }

  renderKnownLanguages() {
    const { user } = this.props;
    const knowledge = user.knowledge || [];
    const knownLanguages = knowledge.map(languageName => {
      return languageName.language
    })

    return (
      <div className={styles.knownLanguages}>
        { knownLanguages.join(', ') }
      </div>
    )
  }

  handleUserCardClick = () => {
    const { user, history } = this.props;
    history.push('/user/' + user.id, user)
  }

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

}

export default UserCard;

import React, { Component } from 'react';
import styles from 'components/user-card.module.sass';


class UserCard extends Component {

  renderUserName() {
    const { user } = this.props;
    const userName = user.name;

    return (
      <div className={styles.userName}>
        { userName }
      </div>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.profileImage}/>
        {this.renderUserName()}
      </div>
    );
  }

}

export default UserCard;

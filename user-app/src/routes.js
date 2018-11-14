import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import styles from 'index.module.sass';

import UsersContainer from 'containers/users';
import UserContainer from 'containers/user';

export default () => (
  <Router>
    <main className={styles.wrapper}>
      <Switch>
        <Route exact path='/' component={UsersContainer} />
        <Route path='/user/:id' component={UserContainer} />
      </Switch>
    </main>
  </Router>
);

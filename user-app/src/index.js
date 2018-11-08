import React from 'react';
import ReactDOM from 'react-dom';
import styles from 'index.module.sass';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import * as serviceWorker from 'serviceWorker';
import UsersContainer from 'containers/users';
import UserContainer from 'containers/user';

ReactDOM.render(
  <Router>
    <main className={styles.wrapper}>
      <Switch>
        <Route exact path='/' component={UsersContainer} />
        <Route path='/user/:id' component={UserContainer} />
      </Switch>
    </main>
  </Router>,
  document.getElementById('root')
);

serviceWorker.register();

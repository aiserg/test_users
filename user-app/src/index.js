import React from 'react';
import ReactDOM from 'react-dom';
import styles  from 'index.module.sass';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import UsersContainer from './containers/users';

ReactDOM.render(
  <Router>
    <main className={styles.wrapper}>
      <Switch>
        <Route path="/" component={UsersContainer} />
      </Switch>
    </main>
  </Router>,
  document.getElementById('root')
);

serviceWorker.register();

import React from 'react';
import ReactDOM from 'react-dom';
import UsersContainer from 'containers/users';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UsersContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

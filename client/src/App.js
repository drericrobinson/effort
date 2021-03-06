import React, { Component } from 'react';
import { Router } from '@reach/router';
import './@uik/styles.css';
import { Login } from './views/Login';
import { AuthProvider } from './utils/AuthContext';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { Layout } from './views/Layout';
import Report from './views/Report/Report';
import { Group } from './views/Group';
import GroupWeek from './views/Group/GroupWeek';
import User from './views/User/User';
import { Landing } from './views/Landing';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <AuthProvider>
          <Router primary={false}>
            <ProtectedRoute path='/' component={Layout} altComponent={Landing}>
              <GroupWeek path='/' component={GroupWeek} />
              <Report path='report/:id' component={Report} />
              <Group path='group' component={Group} />
              <GroupWeek path='group/week/:reportId' component={GroupWeek} />
              <User path='user/:userId' component={User} />
              <Report path='user/:userId/report/:id/' component={Report} />
            </ProtectedRoute>
            <Login path='/login' />
          </Router>
        </AuthProvider>
      </div>
    );
  }
}

export default App;

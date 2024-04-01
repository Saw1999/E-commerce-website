import React from 'react';
import { Navigation } from './components/navigation/Navigation';
import { Admin } from './pages/admin/Admin';

const App = () => {
  return (
    <div>
      <Navigation />
      <Admin />
    </div>
  )
}

export default App
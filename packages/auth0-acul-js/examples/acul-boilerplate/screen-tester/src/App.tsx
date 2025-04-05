import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import CallbackPage from './CallbackPage'; // Will create this next
import './App.css'; // Keep default styling for now

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Auth0 ACUL Login Tester</h1>
      </header>
      <main>
        <Routes>
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

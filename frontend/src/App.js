import { BrowserRouter, Route, Routes } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Header from './components/Header'
import BookRoom from './pages/BookRoom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
            <Route 
              exact path="/" 
              element={<Home />} 
            />

            <Route 
              path="/book-room/:id" 
              element={<BookRoom />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

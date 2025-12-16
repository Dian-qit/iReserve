import { BrowserRouter, Route, Routes } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Header from './components/Header'
import BookRoom from './pages/BookRoom'
import Landing from './pages/Landing'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
            <Route 
              exact path="/" 
              element={<Landing />} 
            />

            <Route 
              path="/home" 
              element={<Home />} 
            />
            <Route 
              path="/book-room/:id" 
              element={<BookRoom />} 
            />
          </Routes>
          <Footer/>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

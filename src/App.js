import { Container } from '@mui/material';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />}/>
          <Route path='/auth' exact element={<Auth />}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

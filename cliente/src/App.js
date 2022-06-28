import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import MovimentacaoId from './routes/MovimentacaoId';
import Movimentacao from './routes/Mov';
import Relatorio from './routes/Relatorio';
import Cont from './routes/Container';
import ContainerId from './routes/ContainerId';
import PostContainer from './routes/AddContainer';
import Menu from './components/Menu';

function App() {
  return (
    <div className="App">
      <Menu />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Relatorio />} />
          <Route path='/container' element={<Cont />} />
          <Route path='/container/:id' element={<ContainerId />} />
          <Route path='/container/post' element={<PostContainer />} />
          <Route path='/movimentacao' element={<Movimentacao />} />
          <Route path='/movimentacao/:id' element={<MovimentacaoId />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import MovimentacaoId from './routes/Movimentacao/MovimentacaoId';
import Movimentacao from './routes/Movimentacao/Movimentacao';
import PostMovimentacao from './routes/Movimentacao/PostMovimentacao';
import Relatorio from './routes/Relatorio';
import Cont from './routes/Container/Container';
import ContainerId from './routes/Container/ContainerId';
import PostContainer from './routes/Container/PostContainer';
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
          <Route path='/container/post/' element={<PostContainer />} />
          <Route path='/movimentacao' element={<Movimentacao />} />
          <Route path='/movimentacao/:id' element={<MovimentacaoId />} />
          <Route path='/movimentacao/post/' element={<PostMovimentacao />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

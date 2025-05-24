import './css/App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CardPet from './components/CardPet';

function App() {

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <Header />
        <section className="options">
          <CardPet icon="paw.svg" title="Cadastrar Pet" />
          <CardPet icon="search.svg" title="Buscar Pets" />
          <CardPet icon="list.svg" title="Fila Adoção" />
        </section>
      </main>
    </div>
  );
}

export default App;
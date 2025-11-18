import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import BoasVindas from './telas/BoasVindas.jsx';
import LoginUsuario from './telas/LoginUsuario.jsx';
import CadastroUsuario from './telas/CadastroUsuario.jsx';
import LoginGestor from './telas/LoginGestor.jsx';
import Home from './telas/Home.jsx';

export default function App() {
  const [tela, setTela] = useState('boasVindas');
  const [usuario, setUsuario] = useState(null);

  const mudarTela = (nomeTela) => setTela(nomeTela);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {tela === 'boasVindas' && <BoasVindas mudarTela={mudarTela} />}
      {tela === 'loginUsuario' && <LoginUsuario mudarTela={mudarTela} setUsuario={setUsuario} />}
      {tela === 'cadastroUsuario' && <CadastroUsuario mudarTela={mudarTela} />}
      {tela === 'loginGestor' && <LoginGestor mudarTela={mudarTela} setUsuario={setUsuario} />}
      {tela === 'home' && <Home usuario={usuario} mudarTela={mudarTela} />}
    </SafeAreaView>
  );
}

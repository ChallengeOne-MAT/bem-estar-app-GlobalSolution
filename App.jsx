import React, { useState } from 'react';
import { View } from 'react-native';
import LoginUsuario from './LoginUsuario';
import CadastroUsuario from './CadastroUsuario';
import Home from './Home';
import DarFeedback from './DarFeedback';
import DashboardGestor from './DashboardGestor';

export default function App() {
  const [tela, setTela] = useState('loginUsuario');
  const [usuarios, setUsuarios] = useState([]); 
  const [usuarioLogado, setUsuarioLogado] = useState(null); 
  const [gestorInbox, setGestorInbox] = useState([]); 

  const mudarTela = (novaTela) => setTela(novaTela);

  const cadastrarUsuario = (novoUsuario) => {
    setUsuarios(prev => [...prev, novoUsuario]);
    setUsuarioLogado(novoUsuario); 
    mudarTela('home');
  };

  const loginUsuario = (email, senha) => {
    const user = usuarios.find(u => u.email === email && u.senha === senha);
    if (user) {
      setUsuarioLogado(user);
      mudarTela('home');
    } else {
      alert('Email ou senha incorretos!');
    }
  };

  const renderTela = () => {
    switch (tela) {
      case 'loginUsuario':
        return <LoginUsuario mudarTela={mudarTela} loginUsuario={loginUsuario} />;
      case 'cadastroUsuario':
        return <CadastroUsuario mudarTela={mudarTela} cadastrarUsuario={cadastrarUsuario} />;
      case 'home':
        return <Home usuario={usuarioLogado} mudarTela={mudarTela} setGestorInbox={setGestorInbox} />;
      case 'darFeedback':
        return <DarFeedback usuario={usuarioLogado} setGestorInbox={setGestorInbox} mudarTela={mudarTela} />;
      case 'dashboardGestor':
        return <DashboardGestor usuario={usuarioLogado} gestorInbox={gestorInbox} voltar={() => mudarTela('home')} />;
      default:
        return <LoginUsuario mudarTela={mudarTela} loginUsuario={loginUsuario} />;
    }
  };

  return <View style={{ flex: 1 }}>{renderTela()}</View>;
}

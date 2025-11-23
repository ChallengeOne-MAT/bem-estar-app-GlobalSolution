import React, { useState } from 'react';
import { View } from 'react-native';
import LoginUsuario from './telas/LoginUsuario';
import CadastroUsuario from './telas/CadastroUsuario';
import Home from './telas/Home';
import DarFeedback from './telas/DarFeedback';
import DashboardGestor from './telas/DashboardGestor';
import Historico from './telas/Historico';
import Relatorios from './telas/Relatorios';

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
        return <Home 
                  usuario={usuarioLogado} 
                  setUsuario={setUsuarioLogado} 
                  setGestorInbox={setGestorInbox} 
                  mudarTela={mudarTela} 
                />;
      case 'darFeedback':
        return <DarFeedback 
                  usuario={usuarioLogado} 
                  setUsuario={setUsuarioLogado} 
                  setGestorInbox={setGestorInbox} 
                  mudarTela={mudarTela} 
                />;
      case 'dashboardGestor':
        return <DashboardGestor 
                  usuario={usuarioLogado} 
                  gestorInbox={gestorInbox} 
                  voltar={() => mudarTela('home')} 
                />;
      case 'historico':
        return <Historico usuario={usuarioLogado} mudarTela={mudarTela} />;
      case 'relatorios':
        return <Relatorios usuario={usuarioLogado} mudarTela={mudarTela} />;
      default:
        return <LoginUsuario mudarTela={mudarTela} loginUsuario={loginUsuario} />;
    }
  };

  return <View style={{ flex: 1 }}>{renderTela()}</View>;
}

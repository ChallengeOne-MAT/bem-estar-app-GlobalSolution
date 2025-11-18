import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginUsuario({ mudarTela, setUsuario }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = () => {
    if (!email || !senha) return alert('Preencha email e senha');
    // demo: seta email como nome (substituir por validação real/API depois)
    setUsuario({ nome: email, gestor: false });
    mudarTela('home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Usuário</Text>

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} style={styles.input} secureTextEntry />

      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => mudarTela('cadastroUsuario')} style={{ marginTop: 12 }}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => mudarTela('boasVindas')} style={{ marginTop: 12 }}>
        <Text style={styles.linkSecondary}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginTop: 10, width: '85%' },
  btn: { backgroundColor: '#4c67f2', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 12, width: '85%' },
  btnText: { color: 'white', fontWeight: '700' },
  link: { color: '#4c67f2' },
  linkSecondary: { color: '#999' },
});

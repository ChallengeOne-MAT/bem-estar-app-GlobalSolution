import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function LoginUsuario({ mudarTela, setUsuario }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = () => {
    if (!email || !senha) {
      return Alert.alert('Atenção', 'Preencha email e senha');
    }
    setUsuario({ nome: email, gestor: false });
    mudarTela('home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Usuário</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => mudarTela('cadastroUsuario')} style={styles.linkContainer}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => mudarTela('boasVindas')} style={styles.linkContainer}>
        <Text style={styles.linkSecondary}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#f5f5f7' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 24, color: '#1a1a2e' },
  input: {
    width: '85%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#fff'
  },
  btn: {
    backgroundColor: '#4c67f2',
    padding: 14,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  linkContainer: { marginTop: 12 },
  link: { color: '#4c67f2', fontWeight: '600', fontSize: 15 },
  linkSecondary: { color: '#333', fontWeight: '600', fontSize: 15 }
});

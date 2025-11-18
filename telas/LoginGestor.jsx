import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginGestor({ mudarTela, setUsuario }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const ADMIN_DEMO = { email: 'gestor@empresa.com', senha: 'gestor123', nome: 'Gestor Demo', gestor: true };

  const login = () => {
    if (email === ADMIN_DEMO.email && senha === ADMIN_DEMO.senha) {
      setUsuario(ADMIN_DEMO);
      mudarTela('home');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Gestor / Admin</Text>

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} style={styles.input} secureTextEntry />

      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text style={styles.btnText}>Entrar</Text>
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
  linkSecondary: { color: '#999' },
});

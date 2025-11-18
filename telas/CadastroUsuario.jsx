import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CadastroUsuario({ mudarTela }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastrar = () => {
    if (!nome || !email || !senha) return alert('Preencha todos os campos');
    // demo: aqui você chamaria API para salvar usuário
    alert('Cadastro realizado! Faça login');
    mudarTela('loginUsuario');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro Usuário</Text>

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} style={styles.input} secureTextEntry />

      <TouchableOpacity style={styles.btn} onPress={cadastrar}>
        <Text style={styles.btnText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => mudarTela('loginUsuario')} style={{ marginTop: 12 }}>
        <Text style={styles.linkSecondary}>Voltar para login</Text>
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

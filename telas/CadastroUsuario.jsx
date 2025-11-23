import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CadastroUsuario({ mudarTela, cadastrarUsuario }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastrar = () => {
    if (!nome || !email || !senha) return alert('Preencha todos os campos');
    cadastrarUsuario({ nome, email, senha, gestor: false, historico: [] });
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Cadastro Usuário</Text>

        <TextInput placeholder="Nome" placeholderTextColor="#ccc" value={nome} onChangeText={setNome} style={styles.input} />
        <TextInput placeholder="Email" placeholderTextColor="#ccc" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
        <TextInput placeholder="Senha" placeholderTextColor="#ccc" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />

        <TouchableOpacity style={styles.btn} onPress={cadastrar}>
          <Text style={styles.btnText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => mudarTela('loginUsuario')} style={styles.linkContainer}>
          <Text style={styles.link}>Voltar ao Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#1f1f2e' },
  card: { width: '90%', backgroundColor: '#2a2a3d', borderRadius: 20, padding: 30 },
  title: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 25, textAlign: 'center' },
  input: { width: '100%', padding: 14, marginBottom: 15, borderRadius: 15, backgroundColor: '#3b3b55', color: '#fff', fontSize: 16 },
  btn: { backgroundColor: '#6BCB77', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  linkContainer: { marginTop: 12, alignItems: 'center' },
  link: { color: '#4db8ff', fontWeight: '600', fontSize: 15 },
});

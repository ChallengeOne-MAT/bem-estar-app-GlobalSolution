import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginGestor({ mudarTela }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [gestor, setGestor] = useState(null);

  const senhaForte = 'G3st0r!@2025'; 

  useEffect(() => {
    const loadGestor = async () => {
      try {
        const data = await AsyncStorage.getItem('@gestor');
        if (data) setGestor(JSON.parse(data));
      } catch (e) {
        console.log('Erro ao carregar gestor', e);
      }
    };
    loadGestor();
  }, []);

  const handleCadastrar = async () => {
    if (!nome || !email) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const novoGestor = { nome, email, senha: senhaForte };
    try {
      await AsyncStorage.setItem('@gestor', JSON.stringify(novoGestor));
      setGestor(novoGestor);
      Alert.alert('Sucesso', 'Gestor cadastrado com sucesso!');
      setNome('');
      setEmail('');
      setSenha('');
    } catch (e) {
      console.log(e);
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  const handleLogin = async () => {
    if (!gestor) {
      Alert.alert('Erro', 'Nenhum gestor cadastrado. Faça o cadastro primeiro.');
      return;
    }

    if (email === gestor.email && senha === gestor.senha) {
      Alert.alert('Sucesso', `Bem-vindo, ${gestor.nome}!`);
      mudarTela('dashboardGestor', { usuario: gestor });
    } else {
      Alert.alert('Erro', 'E-mail ou senha incorretos.');
    }
  };

  const voltarBoasVindas = () => {
    mudarTela('boasVindas');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login / Cadastro Gestor</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Text style={styles.dicaSenha}>Dica: {senhaForte}</Text>

      <TouchableOpacity style={styles.btn} onPress={handleCadastrar}>
        <Text style={styles.btnText}>Cadastrar Gestor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login Gestor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnOutline} onPress={voltarBoasVindas}>
        <Text style={styles.btnOutlineText}>Voltar para BoasVindas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#1f1f2e' },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 20, textAlign: 'center' },
  input: {
    width: '80%',
    backgroundColor: '#2b2b42',
    color: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  dicaSenha: { color: '#6BCB77', marginBottom: 15, fontSize: 12, textAlign: 'center' },
  btn: {
    width: '80%',
    backgroundColor: '#6BCB77',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnOutline: {
    marginTop: 12,
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    borderColor: '#6BCB77',
  },
  btnOutlineText: { fontWeight: '700', color: '#6BCB77' },
});

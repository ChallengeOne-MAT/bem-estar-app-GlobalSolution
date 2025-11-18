import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home({ usuario, mudarTela }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {usuario?.nome || 'Usuário'}</Text>
      <Text style={{ marginTop: 8 }}>{usuario?.gestor ? 'Você está logado como gestor' : 'Você está logado como usuário'}</Text>

      <TouchableOpacity style={styles.btn} onPress={() => mudarTela('boasVindas')}>
        <Text style={styles.btnText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  btn: { backgroundColor: '#4c67f2', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 12, width: '80%' },
  btnText: { color: 'white', fontWeight: '700' },
});

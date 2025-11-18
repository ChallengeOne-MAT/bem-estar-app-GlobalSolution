import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BoasVindas({ mudarTela }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao MindFlow</Text>

      <TouchableOpacity style={styles.btn} onPress={() => mudarTela('loginUsuario')}>
        <Text style={styles.btnText}>Sou usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSecondary} onPress={() => mudarTela('loginGestor')}>
        <Text style={styles.btnTextSecondary}>Sou gestor / admin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  btn: { backgroundColor: '#4c67f2', padding: 12, borderRadius: 10, marginTop: 12, width: '80%', alignItems: 'center' },
  btnText: { color: 'white', fontWeight: '700' },
  btnSecondary: { borderWidth: 1, borderColor: '#4c67f2', padding: 12, borderRadius: 10, marginTop: 12, width: '80%', alignItems: 'center' },
  btnTextSecondary: { color: '#4c67f2', fontWeight: '700' },
});

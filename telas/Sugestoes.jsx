import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Sugestoes({ mudarTela }) {
  const [sugestao, setSugestao] = useState('');

  const enviarSugestao = () => {
    if (!sugestao) return Alert.alert('Atenção', 'Escreva algo antes de enviar!');
    Alert.alert('Sucesso', 'Sugestão enviada com sucesso!');
    setSugestao('');
    mudarTela('home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sugestões</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Escreva sua sugestão..."
        multiline
        value={sugestao}
        onChangeText={setSugestao}
      />

      <TouchableOpacity style={styles.btn} onPress={enviarSugestao}>
        <Text style={styles.btnText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => mudarTela('home')} style={{ marginTop: 12 }}>
        <Text style={styles.link}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#f5f5f7' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20, color: '#1a1a2e' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 10, width: '85%', marginBottom: 12, backgroundColor: '#fff' },
  btn: { backgroundColor: '#4c67f2', padding: 14, borderRadius: 10, width: '85%', alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16, textAlign: 'center' },
  link: { color: '#4c67f2', fontWeight: '600', fontSize: 15 }
});

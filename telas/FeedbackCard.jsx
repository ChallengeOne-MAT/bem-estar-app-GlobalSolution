import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Feedback({ mudarTela }) {
  const [nivel, setNivel] = useState(5);
  const [sugestao, setSugestao] = useState('');

  const emojis = ['😡','😠','😕','😐','🙂','😊','😃','😁','🤩','🤗','😍'];

  const getCorNivel = (i) => {
    if(i <= 3) return '#FFA500'; 
    if(i <= 7) return '#6BCB77'; 
    return '#FFD700';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback do Usuário</Text>

      {/* Barra de Satisfação */}
      <View style={styles.barraContainer}>
        {Array.from({ length: 11 }).map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.barraItem,
              { backgroundColor: i <= nivel ? getCorNivel(i) : '#ccc' },
            ]}
            onPress={() => setNivel(i)}
          >
            <Text style={styles.barraEmoji}>{emojis[i]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.nivelText}>Nível de satisfação: {nivel}/10</Text>

      {/* Sugestões */}
      <Text style={styles.subTitle}>Sugestões para melhorar:</Text>
      <TextInput
        style={styles.inputSugestao}
        placeholder="Digite suas sugestões aqui..."
        placeholderTextColor="#aaa"
        value={sugestao}
        onChangeText={setSugestao}
        multiline
      />

      {/* Botões */}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          alert(`Feedback enviado!\nSatisfação: ${nivel}/10\nSugestão: ${sugestao}`);
          setSugestao('');
          setNivel(5);
          mudarTela('home');
        }}
      >
        <Text style={styles.btnText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => mudarTela('home')} style={{ marginTop: 12 }}>
        <Text style={styles.link}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f2e',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  barraContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  barraItem: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  barraEmoji: {
    fontSize: 16,
  },
  nivelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  subTitle: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  inputSugestao: {
    backgroundColor: '#3b3b55',
    borderRadius: 15,
    padding: 12,
    color: '#fff',
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#6BCB77',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
  link: {
    color: '#4db8ff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Alerta({ mensagem }) {
  if (!mensagem) return null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>{mensagem}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 10
  },
  container: {
    backgroundColor: '#E63946',
    padding: 14,
    borderRadius: 10,
    width: "90%",
    elevation: 3
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 15
  }
});

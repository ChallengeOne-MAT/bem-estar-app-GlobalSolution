import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Relatorios({ mudarTela, usuario }) {
  const { tempoTela = 0, pausas = 0, ultimaPausa = '-', ambiente = 'home' } = usuario || {};

  const sugestoes = useMemo(() => {
    return ambiente === 'empresa'
      ? ['Alongamentos rápidos (2-3 min)', 'Respiração profunda', 'Pausas curtas a cada 2h']
      : ['Alongamento leve', 'Levante e caminhe 2 min', 'Pausa para água a cada 60-90 min'];
  }, [ambiente]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Tempo total de tela (hoje)</Text>
        <Text style={styles.value}>{tempoTela} min</Text>

        <Text style={styles.label}>Pausas realizadas</Text>
        <Text style={styles.value}>{pausas}</Text>

        <Text style={styles.label}>Última pausa</Text>
        <Text style={styles.value}>{ultimaPausa}</Text>
      </View>

      <View style={styles.card}>
        <Text style={[styles.titleSmall]}>Sugestões</Text>
        {sugestoes.map((s, i) => (
          <Text key={i} style={styles.sugestao}>• {s}</Text>
        ))}
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => mudarTela('home')}>
        <Text style={styles.btnText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1f1f2e', alignItems: 'center' },
  title: { fontSize: 26, color: '#fff', fontWeight: '700', marginBottom: 20 },
  card: { width: '90%', backgroundColor: '#2b2b42', padding: 16, borderRadius: 12, marginBottom: 16 },
  label: { color: '#9aa0b4', fontSize: 14, marginTop: 8 },
  value: { color: '#fff', fontSize: 18, fontWeight: '700' },
  titleSmall: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 8 },
  sugestao: { color: '#dfe6f3', marginBottom: 6 },
  btn: { marginTop: 8, backgroundColor: '#6BCB77', padding: 12, borderRadius: 12, width: '90%', alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' }
});

import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

function formatDuracao(segundos) {
  if (!segundos && segundos !== 0) return '-';
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = segundos % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export default function Historico({ mudarTela, usuario }) {
  const historicoDados = usuario?.historico || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Atividades</Text>

      <FlatList
        data={historicoDados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.atividade}>{item.tipo} • {item.ambiente}</Text>
              <Text style={styles.periodo}>{item.inicio} → {item.fim || item.timestamp}</Text>
            </View>
            <Text style={styles.duracao}>{formatDuracao(item.duracaoSegundos)}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.btn} onPress={() => mudarTela('home')}>
        <Text style={styles.btnText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#1f1f2e', alignItems: 'center' }, // escuro como Home
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20, color: '#fff' },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#2e2e44',
    alignItems: 'center'
  },
  atividade: { fontWeight: '700', fontSize: 15, color: '#fff' },
  periodo: { color: '#9aa0b4', fontSize: 13, marginTop: 4 },
  duracao: { color: '#d1d5db', fontSize: 13, marginLeft: 8 },
  btn: { marginTop: 12, backgroundColor: '#6BCB77', padding: 14, borderRadius: 10, width: '95%', alignItems: 'center' },
  btnText: { color: '#0b1226', fontWeight: '700', fontSize: 16 }
});

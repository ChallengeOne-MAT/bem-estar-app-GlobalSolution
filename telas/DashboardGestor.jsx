import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

function ItemCard({ item }) {
  return (
    <View style={styles.fbCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.fbTipo}>{item.tipo}</Text>
        <Text style={styles.fbTime}>{item.timestamp || (item.fim ? item.fim : '')}</Text>
      </View>

      {item.tipo === 'Feedback' ? (
        <>
          <Text style={styles.fbMeta}>Nível: {item.nivel}/10 • Humor: {item.humor} • Energia: {item.energia} • Estresse: {item.estresse}</Text>
          {item.texto ? <Text style={styles.fbTexto}>{item.texto}</Text> : null}
        </>
      ) : (
        <>
          <Text style={styles.fbMeta}>Ambiente: {item.ambiente}</Text>
          <Text style={styles.fbTexto}>Duração: {formatDuracao(item.duracaoSegundos)}</Text>
        </>
      )}
    </View>
  );
}

function formatDuracao(segundos) {
  if (!segundos && segundos !== 0) return '-';
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = segundos % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export default function DashboardGestor({ usuario, gestorInbox = [], voltar }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard do Gestor</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{usuario.nome}</Text>
        <Text style={styles.cardLabel}>Ambiente atual</Text>
        <Text style={styles.cardValue}>{usuario.ambiente}</Text>

        <View style={styles.row}>
          <View style={styles.kpi}>
            <Text style={styles.kpiLabel}>Tempo (min)</Text>
            <Text style={styles.kpiValue}>{usuario.tempoTela}</Text>
          </View>

          <View style={styles.kpi}>
            <Text style={styles.kpiLabel}>Pausas</Text>
            <Text style={styles.kpiValue}>{usuario.pausas}</Text>
          </View>
        </View>

        <Text style={styles.cardLabel}>Última pausa</Text>
        <Text style={styles.cardValue}>{usuario.ultimaPausa}</Text>
      </View>

      <View style={styles.feedbackSection}>
        <Text style={styles.sectionTitle}>Eventos recebidos (Feedbacks / Pausas)</Text>

        {gestorInbox.length === 0 ? (
          <Text style={styles.noFeedback}>Nenhum evento recebido ainda.</Text>
        ) : (
          <FlatList
            data={gestorInbox}
            keyExtractor={(it) => it.id}
            renderItem={({ item }) => <ItemCard item={item} />}
            contentContainerStyle={{ paddingBottom: 12 }}
          />
        )}
      </View>

      <TouchableOpacity style={styles.btn} onPress={voltar}>
        <Text style={styles.btnText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: '#1f1f2e', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: '800', marginBottom: 12, color: '#fff' },
  card: { width: '95%', backgroundColor: '#2b2b42', borderRadius: 14, padding: 16, marginBottom: 12 },
  cardTitle: { fontSize: 20, fontWeight: '800', marginBottom: 6, color: '#fff' },
  cardLabel: { color: '#9aa0b4', fontSize: 13, marginTop: 8 },
  cardValue: { color: '#fff', fontSize: 16, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  kpi: { width: '48%', backgroundColor: '#232635', padding: 12, borderRadius: 10, alignItems: 'center' },
  kpiLabel: { color: '#9aa0b4', fontSize: 12 },
  kpiValue: { color: '#fff', fontSize: 18, fontWeight: '800' },

  feedbackSection: { width: '95%', marginTop: 8, marginBottom: 14 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 8 },
  noFeedback: { color: '#9aa0b4', fontStyle: 'italic' },

  fbCard: {
    backgroundColor: '#222332',
    padding: 12,
    marginBottom: 8,
    borderRadius: 10
  },
  fbTipo: { color: '#6BCB77', fontWeight: '700' },
  fbTime: { color: '#9aa0b4', fontSize: 12 },
  fbMeta: { color: '#bfc9df', marginTop: 6, fontSize: 13 },
  fbTexto: { color: '#e6eef8', marginTop: 6 },

  btn: { marginTop: 16, backgroundColor: '#6BCB77', padding: 12, borderRadius: 10, width: '95%', alignItems: 'center' },
  btnText: { color: '#0b1226', fontWeight: '700' }
});

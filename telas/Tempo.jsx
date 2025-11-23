import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Tempo({ ativo }) {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    if (!ativo) return;
    const timer = setInterval(() => setSegundos(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [ativo]);

  const formatarTempo = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tempo de Uso</Text>
      <Text style={styles.time}>{formatarTempo(segundos)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', margin: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#1a1a2e' },
  time: { fontSize: 20, marginTop: 8, color: '#333' }
});

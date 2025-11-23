import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import api from '../src/services/api';

export default function DetalhesUsuario({ routeData, voltar }) {
  const user = routeData || {};
  const [historico, setHistorico] = useState([]);

  useEffect(() => { loadHistorico(); }, []);

  const loadHistorico = async () => {
    try {
      const h = await api.buscarHistorico(user.id_usuario);
      setHistorico(h);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalhes — {user.nome}</Text>

      <Text style={styles.subTitle}>Últimos registros:</Text>
      {historico.slice(0,5).map((h,i) => (
        <View key={i} style={styles.item}>
          <Text>{new Date(h.data_feedback).toLocaleDateString()} — Humor {h.humor} — Estresse {h.nivel_estresse}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.btn} onPress={voltar}>
        <Text style={styles.btnText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f7',
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1a1a2e'
  },
  subTitle: {
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 16
  },
  item: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#4c67f2',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  }
});

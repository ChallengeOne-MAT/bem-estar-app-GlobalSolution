import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Picker } from 'react-native';

export default function DarFeedback({ mudarTela, usuario, setUsuario, setGestorInbox }) {
  const [nivel, setNivel] = useState(5);
  const [humor, setHumor] = useState('neutro');
  const [energia, setEnergia] = useState('normal');
  const [estresse, setEstresse] = useState('baixo');
  const [sugestao, setSugestao] = useState('');

  const emojis = ['😡','😠','😕','😐','🙂','😊','😃','😁','🤩','🤗','😍'];

  const enviarFeedback = () => {
    const now = new Date();
    const entry = {
      id: `${now.getTime()}-fb`,
      tipo: 'Feedback',
      nivel,
      humor,
      energia,
      estresse,
      texto: sugestao,
      timestamp: now.toLocaleString(),
      ambiente: usuario?.ambiente || 'home'
    };

    setUsuario(prev => ({
      ...prev,
      historico: [entry, ...(prev.historico || [])]
    }));

    if (typeof setGestorInbox === 'function') {
      setGestorInbox(prev => [entry, ...(prev || [])]);
    }

    Alert.alert('Obrigado!', 'Seu feedback foi enviado e recebido pelo gestor.');
    setSugestao('');
    setNivel(5);
    setHumor('neutro');
    setEnergia('normal');
    setEstresse('baixo');
    mudarTela('home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como você está se sentindo?</Text>

      <View style={styles.barraContainer}>
        {Array.from({ length: 11 }).map((_, i) => (
          <TouchableOpacity
            key={String(i)}
            style={[
              styles.barraItem,
              { backgroundColor: i <= nivel ? (i <= 3 ? '#FFB26B' : i <=7 ? '#6BCB77' : '#FFD54F') : '#3b3b55' },
            ]}
            onPress={() => setNivel(i)}
          >
            <Text style={styles.barraEmoji}>{emojis[i]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Nível de satisfação: {nivel}/10</Text>

      <Text style={styles.label}>Humor</Text>
      <Picker selectedValue={humor} onValueChange={setHumor} style={styles.picker}>
        <Picker.Item label="Feliz" value="feliz" />
        <Picker.Item label="Neutro" value="neutro" />
        <Picker.Item label="Triste" value="triste" />
        <Picker.Item label="Irritado" value="irritado" />
      </Picker>

      <Text style={styles.label}>Energia</Text>
      <Picker selectedValue={energia} onValueChange={setEnergia} style={styles.picker}>
        <Picker.Item label="Baixa" value="baixa" />
        <Picker.Item label="Normal" value="normal" />
        <Picker.Item label="Alta" value="alta" />
      </Picker>

      <Text style={styles.label}>Estresse</Text>
      <Picker selectedValue={estresse} onValueChange={setEstresse} style={styles.picker}>
        <Picker.Item label="Baixo" value="baixo" />
        <Picker.Item label="Médio" value="medio" />
        <Picker.Item label="Alto" value="alto" />
      </Picker>

      <Text style={styles.subTitle}>Comentário (opcional)</Text>
      <TextInput
        style={styles.inputSugestao}
        placeholder="Conte mais se quiser..."
        placeholderTextColor="#aaa"
        value={sugestao}
        onChangeText={setSugestao}
        multiline
      />

      <TouchableOpacity style={styles.btn} onPress={enviarFeedback}>
        <Text style={styles.btnText}>Enviar ao Gestor</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => mudarTela('home')} style={{ marginTop: 12 }}>
        <Text style={styles.link}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1f1f2e', padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 12, textAlign: 'center' },
  barraContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  barraItem: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 3 },
  barraEmoji: { fontSize: 22 }, 
  label: { color: '#fff', marginTop: 8, marginBottom: 6 },
  picker: { width: '100%', backgroundColor: '#3b3b55', borderRadius: 10, marginBottom: 8, color: '#fff' },
  subTitle: { color: '#fff', marginTop: 10, marginBottom: 6, fontWeight: '600' },
  inputSugestao: { backgroundColor: '#3b3b55', borderRadius: 12, padding: 10, color: '#fff', height: 100, textAlignVertical: 'top' },
  btn: { marginTop: 12, backgroundColor: '#6BCB77', padding: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#0b1226', fontWeight: '800' },
  link: { color: '#4db8ff', textAlign: 'center', marginTop: 8 }
});

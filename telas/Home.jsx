import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Picker } from 'react-native';

export default function Home({ mudarTela, usuario, setUsuario, setGestorInbox }) {
  const [ambiente, setAmbiente] = useState(usuario.ambiente || 'home');
  const sessionStartRef = useRef(Date.now());
  const pauseStartRef = useRef(null);
  const tempoAcumuladoRef = useRef(usuario.tempoSessaoAcumulado || 0);
  const [isOnPause, setIsOnPause] = useState(false);
  const [secondsSinceStart, setSecondsSinceStart] = useState(tempoAcumuladoRef.current);
  const intervalRef = useRef(null);
  const minuteAlertShownRef = useRef(false);
  const [mostrarMsg, setMostrarMsg] = useState(false);

  const theme = ambiente === 'empresa'
    ? { background: '#12131a', card: '#1f2430', primary: '#4C67F2' }
    : { background: '#1f1f2e', card: '#2b2b42', primary: '#6BCB77' };

  const startInterval = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      const agora = Date.now();
      const segundos = tempoAcumuladoRef.current + Math.floor((agora - sessionStartRef.current) / 1000);
      setSecondsSinceStart(segundos);

      if (segundos > 0 && segundos % 60 === 0) {
        setUsuario(prev => ({ ...prev, tempoTela: (prev.tempoTela || 0) + 1 }));
      }

      if (segundos >= 60 && !minuteAlertShownRef.current) {
        minuteAlertShownRef.current = true;
        setMostrarMsg(true);
      }
    }, 1000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    sessionStartRef.current = Date.now();
    if (!isOnPause) startInterval();
    return () => stopInterval();
  }, []);

  const handleAmbienteChange = (novoAmbiente) => {
    const agora = Date.now();
    const duracaoSegundos = tempoAcumuladoRef.current + Math.floor((agora - sessionStartRef.current) / 1000);

    if (duracaoSegundos > 0) {
      const entry = {
        id: `${Date.now()}-sessao`,
        tipo: 'Sessão',
        inicio: new Date(sessionStartRef.current).toLocaleString(),
        fim: new Date(agora).toLocaleString(),
        duracaoSegundos,
        ambiente
      };
      setUsuario(prev => ({ ...prev, historico: [entry, ...(prev.historico || [])] }));
    }

    setAmbiente(novoAmbiente);
    setUsuario(prev => ({ ...prev, ambiente: novoAmbiente }));
    sessionStartRef.current = agora;
    tempoAcumuladoRef.current = 0;
    setSecondsSinceStart(0);
    minuteAlertShownRef.current = false;
    setIsOnPause(false);
    pauseStartRef.current = null;
    startInterval();
  };

  const togglePausa = () => {
    const agora = Date.now();
    if (!isOnPause) {
      tempoAcumuladoRef.current += Math.floor((agora - sessionStartRef.current) / 1000);
      pauseStartRef.current = agora;
      setIsOnPause(true);
      stopInterval();
      Alert.alert('Pausa iniciada', 'Você começou a pausa.');
    } else {
      const duracaoPausa = Math.floor((agora - (pauseStartRef.current || agora)) / 1000);
      const pausaEntry = {
        id: `${Date.now()}-pausa`,
        tipo: 'Pausa',
        inicio: new Date(pauseStartRef.current).toLocaleString(),
        fim: new Date(agora).toLocaleString(),
        duracaoSegundos: duracaoPausa,
        ambiente
      };
      setUsuario(prev => ({
        ...prev,
        pausas: (prev.pausas || 0) + 1,
        historico: [pausaEntry, ...(prev.historico || [])]
      }));

      if (typeof setGestorInbox === 'function') {
        setGestorInbox(prev => [pausaEntry, ...(prev || [])]);
      }

      sessionStartRef.current = agora;
      pauseStartRef.current = null;
      setIsOnPause(false);
      startInterval();

      Alert.alert('Pausa finalizada', `Você ficou em pausa por ${Math.floor(duracaoPausa / 60)}m ${duracaoPausa % 60}s`);
    }
  };

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: '#fff' }]}>Bem-vindo, {usuario.nome}</Text>
      <Text style={[styles.subtitle, { color: '#ccc' }]}>Tempo total hoje: {usuario.tempoTela ?? 0} min</Text>

      <Text style={[styles.label, { color: '#fff' }]}>Ambiente atual:</Text>
      <Picker
        selectedValue={ambiente}
        onValueChange={handleAmbienteChange}
        style={[styles.picker, { backgroundColor: theme.card }]}
      >
        <Picker.Item label="Home Office" value="home" />
        <Picker.Item label="Empresa" value="empresa" />
        <Picker.Item label="Em Casa" value="casa" />
      </Picker>

      <TouchableOpacity
        style={[styles.btnPrimary, { backgroundColor: isOnPause ? '#FFD54F' : theme.primary }]}
        onPress={togglePausa}
      >
        <Text style={styles.btnText}>{isOnPause ? 'Finalizar Pausa' : 'Iniciar Pausa'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btnPrimary, { backgroundColor: theme.primary }]}
        onPress={() => mudarTela('darFeedback')}
      >
        <Text style={styles.btnText}>Dar Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btnPrimary, { backgroundColor: theme.primary }]}
        onPress={() => mudarTela('relatorios')}
      >
        <Text style={styles.btnText}>Ver Relatórios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnOutline} onPress={() => mudarTela('historico')}>
        <Text style={styles.btnOutlineText}>Histórico</Text>
      </TouchableOpacity>

  <TouchableOpacity style={styles.btnOutline} onPress={() => mudarTela('boasVindas')}>
  <Text style={styles.btnOutlineText}>Voltar ao SejaBemVindos</Text>
</TouchableOpacity>


      <Text style={[styles.status, { color: '#ccc' }]}>Sessão atual: {fmt(secondsSinceStart)}</Text>
      <Text style={[styles.status, { color: '#ccc' }]}>
        {isOnPause ? 'Você está em pausa' :
          (ambiente === 'empresa' ? 'Trabalhando (empresa)' : 'Em casa / Home Office')}
      </Text>

      {mostrarMsg && (
        <View style={styles.msgContainer}>
          <Text style={styles.msgText}>
            Você ficou tempo demais sem interagir! Que tal beber água, se alongar ou fazer uma pausa?
          </Text>
          <TouchableOpacity style={styles.fecharBtn} onPress={() => setMostrarMsg(false)}>
            <Text style={styles.fecharText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 12 },
  label: { marginBottom: 6 },
  picker: { width: '80%', color: '#fff', borderRadius: 10 },
  btnPrimary: { padding: 14, borderRadius: 15, width: '80%', alignItems: 'center', marginTop: 12 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnOutline: { marginTop: 12, borderWidth: 1, padding: 12, borderRadius: 12, width: '80%', alignItems: 'center', borderColor: '#6BCB77' },
  btnOutlineText: { fontWeight: '700', color: '#6BCB77' },
  status: { marginTop: 10 },
  msgContainer: { backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 2, borderColor: '#6BCB77', padding: 15, borderRadius: 15, marginTop: 20, width: '90%', alignItems: 'center' },
  msgText: { color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 10 },
  fecharBtn: { backgroundColor: '#6BCB77', padding: 10, borderRadius: 10 },
  fecharText: { color: '#fff', fontWeight: '700' }
});

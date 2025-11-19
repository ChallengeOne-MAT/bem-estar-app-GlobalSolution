import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../src/services/api';

export default function DetalhesUsuario({ routeData, voltar }) {
  const user = routeData || {};
  const [historico, setHistorico] = useState([]);

  useEffect(()=>{ load(); },[]);

  const load = async () => {
    const h = await api.buscarHistorico(user.id_usuario);
    setHistorico(h);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes — {user.nome}</Text>

      <Text style={{marginTop:12,fontWeight:'700'}}>Últimos registros:</Text>
      {historico.slice(0,5).map((h,i)=>(
        <Text key={i}>{new Date(h.data_feedback).toLocaleDateString()} — Humor {h.humor} — Estresse {h.nivel_estresse}</Text>
      ))}

      <TouchableOpacity style={styles.btn} onPress={voltar}>
        <Text style={styles.btnText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16},
  title:{fontSize:20,fontWeight:'700'},
  btn:{backgroundColor:'#4c67f2',padding:12,borderRadius:10,marginTop:20,alignItems:'center'},
  btnText:{color:'white',fontWeight:'700'}
});

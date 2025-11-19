import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../src/services/api';

export default function Historico({ usuario, voltar }) {
  const [lista, setLista] = useState([]);

  useEffect(()=>{ load(); },[]);

  const load = async () => {
    const dados = await api.buscarHistorico(usuario.id_usuario);
    setLista(dados);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      <FlatList
        data={lista}
        keyExtractor={(i,idx)=>String(idx)}
        renderItem={({item})=>(
          <View style={styles.item}>
            <Text>{new Date(item.data_feedback).toLocaleDateString()} — Humor: {item.humor} — Estresse: {item.nivel_estresse}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{marginTop:20}}>Nenhum feedback registrado</Text>}
      />
      <TouchableOpacity onPress={voltar} style={{marginTop:12}}>
        <Text style={{color:'#999'}}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,padding:16},
  title:{fontSize:20,fontWeight:'700',textAlign:'center'},
  item:{padding:12,borderBottomWidth:1,borderColor:'#eee'}
});
 
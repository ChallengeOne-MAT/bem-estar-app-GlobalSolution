import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../src/services/api';

export default function Notificacoes({ voltar }) {
  const [list, setList] = useState([]);

  useEffect(()=>{ load(); },[]);

  const load = async ()=> setList(await api.buscarNotificacoes());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <FlatList
        data={list}
        keyExtractor={(i,idx)=>String(idx)}
        renderItem={({item})=>(
          <View style={styles.item}>
            <Text style={{fontWeight:'700'}}>{item.titulo}</Text>
            <Text>{item.mensagem}</Text>
            <Text style={{color:'#999',fontSize:12}}>{new Date(item.data_envio).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{marginTop:20}}>Sem notificações</Text>}
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

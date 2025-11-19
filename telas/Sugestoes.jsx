import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const sugestoes = [
  {id:1, descricao:'Faça uma pausa de 5 minutos', tipo:'pausa'},
  {id:2, descricao:'Alongue os ombros e pescoço', tipo:'alongamento'},
  {id:3, descricao:'Respire profundamente por 2 minutos', tipo:'respiração'}
];

export default function Sugestoes({ voltar }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sugestões rápidas</Text>
      <FlatList
        data={sugestoes}
        keyExtractor={i=>String(i.id)}
        renderItem={({item})=>(
          <View style={styles.item}>
            <Text style={{fontWeight:'700'}}>{item.descricao}</Text>
            <Text style={{color:'#666'}}>{item.tipo}</Text>
          </View>
        )}
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

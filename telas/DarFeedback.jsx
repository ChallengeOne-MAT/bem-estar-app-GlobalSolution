import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../src/services/api';

export default function DarFeedback({ usuario, voltar, aoEnviar }) {
  const [nivelEstresse, setNivelEstresse] = useState(null); // 1 a 5
  const [humor, setHumor] = useState(null);

  const enviar = async () => {
    if (!nivelEstresse || !humor) return alert('Escolha humor e estresse');
    const payload = {
      usuario_id: usuario.id_usuario || 1,
      nivel_estresse: nivelEstresse,
      humor,
      comentario: '',
      data_feedback: new Date().toISOString()
    };
    await api.enviarFeedback(payload);
    alert('Feedback enviado');
    aoEnviar && aoEnviar();
  };

  const emojis = ['😃','🙂','😐','😟','😢'];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como você se sente hoje?</Text>

      <View style={{flexDirection:'row',justifyContent:'space-around',width:'100%',marginTop:12}}>
        {emojis.map((e,i)=>(
          <TouchableOpacity key={i} onPress={()=>setHumor(i+1)} style={[styles.emoji, humor===i+1 && styles.selected]}>
            <Text style={{fontSize:24}}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={{marginTop:20}}>Nível de estresse (1 baixo - 5 alto)</Text>
      <View style={{flexDirection:'row',marginTop:8}}>
        {[1,2,3,4,5].map(n=>(
          <TouchableOpacity key={n} onPress={()=>setNivelEstresse(n)} style={[styles.box, nivelEstresse===n && styles.selectedBox]}>
            <Text>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.btn} onPress={enviar}>
        <Text style={styles.btnText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={voltar} style={{marginTop:12}}>
        <Text style={{color:'#999'}}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,alignItems:'center',padding:16,justifyContent:'center'},
  title:{fontSize:20,fontWeight:'700'},
  emoji:{padding:10},
  selected:{backgroundColor:'#e6f0ff',borderRadius:8},
  box:{padding:10,marginHorizontal:6,borderWidth:1,borderColor:'#ddd',borderRadius:6,width:40,alignItems:'center'},
  selectedBox:{backgroundColor:'#cfe0ff'},
  btn:{backgroundColor:'#4c67f2',padding:12,borderRadius:10,marginTop:20,width:'80%',alignItems:'center'},
  btnText:{color:'white',fontWeight:'700'}
});

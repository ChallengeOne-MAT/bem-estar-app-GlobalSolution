import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BoasVindas({ mudarTela }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao MindFlow</Text>

      <TouchableOpacity style={styles.btn} onPress={() => mudarTela('loginUsuario', { preserveSession: false })}>
        <Text style={styles.btnText}>Login Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => mudarTela('cadastroUsuario', { preserveSession: false })}>
        <Text style={styles.btnText}>Cadastro Usuário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnGestor} onPress={() => mudarTela('dashboardGestor', { preserveSession: false })}>
        <Text style={styles.btnText}>Login Gestor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:16,
    backgroundColor:'#1f1f2e' // mesmo fundo da Home
  },
  title: {
    fontSize:28,
    fontWeight:'800',
    marginBottom:30,
    color:'#fff'
  },
  btn: {
    backgroundColor:'#6BCB77',
    padding:14,
    borderRadius:15,
    width:'80%',
    marginBottom:12,
    alignItems:'center'
  },
  btnGestor: {
    backgroundColor:'#324158',
    padding:14,
    borderRadius:15,
    width:'80%',
    alignItems:'center',
    marginTop:6
  },
  btnText: { color:'#fff', fontWeight:'700', textAlign:'center', fontSize:16 }
});

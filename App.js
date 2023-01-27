import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
export default function App() {
  const [mesa, setMesa] = useState('MESA 03');
  const [atendente, setAtendente] = useState('João Carlos')
  const [cliente, setCliente] = useState('Não identificado(Não cadastrado)')
  const [data, setData] = useState('25/11/2022')
  const [hora, setHora] = useState('09:53:15')
  const [pedido, setPedido] = useState([
    { produto: 'Cerveja Heineken 600ml', qtd: 1, precoUnit: 18 },
    { produto: 'Cerveja Heineken 600ml', qtd: 1, precoUnit: 18 },
    { produto: 'Cerveja Heineken 600ml', qtd: 1, precoUnit: 18 }
  ])
  useEffect(()=>{
    const DataHoje = new Date()
    setData(`${DataHoje.getDay()<10?'0'+DataHoje.getDay():DataHoje.getDay()}`+'/'+`${DataHoje.getMonth()+1<10?"0"+eval(DataHoje.getMonth()+1):DataHoje.getMonth()+1}`+'/'+DataHoje.getFullYear());
    setHora(DataHoje.getHours()+':'+DataHoje.getMinutes()+':'+DataHoje.getSeconds())
  })
 
  let totalNota=0;
  let totalItens=0;
  pedido.forEach((item)=>{
    totalNota = item.precoUnit + totalNota;
    totalItens = item.qtd + totalItens;
   })
   
  
  async function gerarPDF() {
    const file = await printToFileAsync({
      html: html,
      base64: false
    });
    await shareAsync(file.uri)
  }

  
  const html = `
  <html>
    <body style="display:flex;flex:1;flex-direction:column;margin:0px;height:100%;width:100vw">
        
        <h1 style="text-align:center;font-size:70px;background-color:#ccc;margin:0px;font-weight:400;padding:15px 0">PEDIDO</h1>
        
        <div style="background-color:#ccc;display:flex;flex-direction:column;height:100px;padding:15px 0;border-top:3px solid black">
        <h2 style="text-align:center;font-size:40px;margin:0px;font-weight:400">Torres Paulista</h2>
        <span style="text-align:center;font-size:20px;margin:5px;height:20px">CNPJ 55.555.888/0001-99</span>
        <span style="text-align:center;font-size:20px;margin:5px; height:20px">Fone: 11-2666-8899 São Paulo-SP
        </div>
        
        <h2 style="font-weight:400;font-size:55px;text-align:center; background-color:#fff;margin:0px; padding:30px 0px;height:50px;border-top:3px solid black">${mesa}</h2>
        
        <h4 style="display:flex;justify-content:center;font-size:25px;height:35px;font-weight:400;margin:0;padding:8px 0;border-top:3px solid black;border-bottom:3px solid black">Atendente: ${atendente}</h4>
        
        <h3 style="font-size:30px;margin:13px;font-weight:400;align-items:center;height:30px">Cliente:${cliente}</h3>
        <div style="display:flex;flex-direction:row;margin:0 10px;font-weight:400; align-items:space-between;justify-content:center">
        <h3 style="flex:1;font-size:30px;font-weight:400;margin:0">Data:${data}</h3>
        <h3 style="font-size:30px;font-weight:400;margin:0">Hora:${hora}</h3>
        </div>
        <div style="margin:35px 0">
         ${pedido.map((item)=>('<div style="display:flex;justify-content:space-between;height:35px;font-size:35px"> <span>'+item.qtd+ ' x '+item.produto+'</span>'+'<span>'+(item.qtd*item.precoUnit).toFixed(2).replace('.',',')+'</span> </div>' ))}
        </div>
       <hr/>
       <div  style="display:flex;justify-content:space-between;background-color:#ccc;height:35px;padding:15px 30px;border-top:3px solid black;border-bottom:3px solid black">
       <span style="font-size:30px"> Din ${totalNota.toFixed(2).replace('.',',')}</span>
       <span style="font-size:30px"> PIX ${totalNota.toFixed(2).replace('.',',')} </span>
       <span style="font-size:30px"> Déb ${eval(totalNota*1.05).toFixed(2).replace('.',',')}</span>
       <span style="font-size:30px"> Créd ${eval(totalNota*1.15).toFixed(2).replace('.',',')}</span>
        </div>
        <div style="background-color:#ccc;display:flex;flex-direction:row;padding:0 10%; margin:0">
        <h3 style="flex:1;font-size:30px;font-weight:400"> Qtde de Itens</h3>
        <h3 style="font-size:30px;font-weight:400"> ${totalItens<10?'0'+totalItens:totalItens}</h3>
        </div>
        <div style="background-color:#ccc;display:flex;flex-direction:row;padding:0 10%; margin:0">
        <h3 style="flex:1;font-size:30px;font-weight:400;margin:0"> TOTAL(+10%)</h3>
        <h3 style="font-size:30px;font-weight:400;margin:0;padding-bottom:15px"> R$ ${eval(totalItens*1.1).toFixed(2).replace('.',',')}</h3>
        </div>
    </body>
   
  </html>
  `
  return (
    <View style={styles.container}>
      <Text>Gerar PDF a partir de texto</Text>
      <StatusBar style="auto" />
      <Button title="Gerar Pdf" onPress={gerarPDF} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNotaPedido: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});

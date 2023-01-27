import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';
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
  let totalNota=0;
  pedido.forEach((item)=>{
    totalNota = item.precoUnit + totalNota
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
    <body style="display:flex;justify-content:center;flex-direction:column;margin:0px;">
        
        <h1 style="text-align:center;font-size:75px;background-color:#ccc;margin:0px;font-weight:400">PEDIDO</h1>
        <hr style="border:1px solid black"/>
        <h2 style="text-align:center;font-size:35px;background-color:#ccc;margin:0px;font-weight:400">Torres Paulista</h2>
        <span style="text-align:center;font-size:15px;background-color:#ccc;margin:0px">CNPJ 55.555.888/0001-99</span>
        <span style="text-align:center;font-size:15px;background-color:#ccc;margin:0px">Fone: 11-2666-8899 São Paulo-SP
        <hr/>
        <h2 style="font-weight:400;font-size:40px; padding:0px;height:40px">${mesa}</h2>
        <hr/>
        <h4>Atendente: ${atendente}</h4>
        <hr/>
        <h3>Cliente:${cliente}</h3>
        <div>
        <h3>Data:${data}</h3>
        <h3>Hora:${hora}</h3>
        </div>
        <div >
         ${pedido.map((item)=>('<div style="display:flex;justify-content:space-between;height:15px"> <span>'+item.qtd+ ' x '+item.produto+'</span>'+'<span>'+(item.qtd*item.precoUnit).toFixed(2).replace('.',',')+'</span> </div>' ))}
        </div>
       <hr/>
       <div  style="display:flex;justify-content:space-between;height:15px;padding:15px 30px">
       <span> Din ${totalNota.toFixed(2).replace('.',',')}</span>
       <span> PIX ${totalNota.toFixed(2).replace('.',',')} </span>
       <span> Déb ${eval(totalNota*1.05).toFixed(2).replace('.',',')}</span>
       <span> Créd ${eval(totalNota*1.15).toFixed(2).replace('.',',')}</span>
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

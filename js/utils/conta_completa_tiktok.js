}else{
	numero = --numero;
	document.getElementById("input_numero").value=numero;	
	
	}

}

//verificar quantas contas disponiveis
function numero_contas(){
	
	firebase.database().ref('contas').once('value', (sanpshot) => {
                 
				
				 
				  if(sanpshot.val().contas_completas.length === undefined){
				  document.querySelector(".estoque").innerText="CONTAS DISPONIVEIS:"+" "+"0"
				  
				 
				 
				  }else{
					  
					   numero_estoque= sanpshot.val().contas_completas.length-1;
					   document.querySelector(".estoque").innerText="CONTAS DISPONIVEIS:"+" "+numero_estoque
					  
					  
				  }
                    
             })
	
	
	
	
	
	
	
}

function comprar_conta(){
	
	
	
	let numero = document.getElementById("input_numero").value
	
	let valor = 2* numero ;
	
	

	
	if(valor_saldo>=valor){
		
		alert('Compra realizada com sucesso');
		
		let compra = valor_saldo - valor;
		numero = parseInt(numero);
		
		selecionar_conta(numero)
		descontar_saldo(compra);
		
		
	}else{
		
	alert('Saldo insuficiente')
		
		
	}
	
	
	
	
	
	
	
	
}



function descontar_saldo(descontar){
	
const atualizar={
	valor: descontar
	
}



	firebase.database().ref('usuario/' + uid).update(atualizar);
	
	
	
	
}


function selecionar_conta(quantidade){
	
	
	firebase.database().ref('contas/contas_completas/').limitToLast(quantidade).once('value', (sanpshot) => {
               
			  
       sanpshot.forEach((intem,posicao,array)=>{
				   
					enviar_contas(intem.val().nome,intem.val().senha)
				    deletar_conta(intem.key)
					  
                  })
}) 
	
}

function deletar_conta(conta_nome){
	
		firebase.database().ref('contas/contas_completas/'+conta_nome).remove();
	
}




function enviar_contas(nome,senha){
	
	
	const atualizar={
	nome:nome,
	senha:senha
	
}

let aleatorio =  Math.floor(Math.random()*1000);

	firebase.database().ref('usuario/' + uid+"/contas_compradas/"+aleatorio).set(atualizar);
	
	
}

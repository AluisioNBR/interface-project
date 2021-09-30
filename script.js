// Ligação com os botões do HTML
const confirmButton = document.getElementById('confirm-button'), closeButton = document.getElementById('close-button')

// Hi ;)
function sayHi(){
    alert('Hi')
}

// Objeto para cuidar do dinheiro do player
const Money = {
    // Saldo do player
    balance: 5000,
    
    // Método de aumento de dinheiro
    increment(inc){
        this.balance = this.balance + inc
    },

    // Método de pagamento/diminuição de dinheiro
    payment(pay){
        this.balance = this.balance - pay
    },

    // Método para a atualização do visor de saldo no HTML
    updateMoneyVisor(balance){
        const visor = document.getElementById('money')
        visor.value = balance
    }
}

// Objeto para cuidar dos atributos do player
const Attributes = {
    // Atributos do player
    str: 3,
    vit: 3,
    spd: 3,
    dex: 3,
    int: 3,

    // Método para a atualização dos atributos do player
    updateAttributes(){
        const attributes = document.getElementsByClassName('progress-bar'), indicator = document.getElementsByClassName('progress-bar-value')
        const current = [
            Attributes.str,
            Attributes.vit,
            Attributes.spd,
            Attributes.dex,
            Attributes.int
        ]

        for (let x = 0; x < attributes.length; x++) {
            if(Number(attributes[x].value) > current[x]){
                let pay = current[x] * 50
                Money.payment(pay)
            }
            
            else if(Number(attributes[x].value) < current[x]){
                let inc = current[x] * 25
                Money.increment(inc)
            }

            else { continue }

            ChangeAttributesValues.resetColors(indicator[x])
            indicator[x].value = Number(attributes[x].value)

        }

        Money.updateMoneyVisor(Money.balance)
    }
}

// Objeto para fazer alterações dinâmicas nos valores dos atributos
const ChangeAttributesValues = {
    // Método para alteração dinâmica do str
    strChange(){
        const current = document.getElementById('str').value, indicator = document.getElementById('indicator-str')
        
        ChangeAttributesValues.colorChange(current, indicator)
    },

    // Método para alteração dinâmica do vit
    vitChange(){
        const current = document.getElementById('vit').value, indicator = document.getElementById('indicator-vit')
        
        ChangeAttributesValues.colorChange(current, indicator)
    },
    
    // Método para alteração dinâmica do spd
    spdChange(){
        const current = document.getElementById('spd').value, indicator = document.getElementById('indicator-spd')
        
        ChangeAttributesValues.colorChange(current, indicator)
    },
    
    // Método para alteração dinâmica do dex
    dexChange(){
        const current = document.getElementById('dex').value, indicator = document.getElementById('indicator-dex')
        
        ChangeAttributesValues.colorChange(current, indicator)
    },
    
    // Método para alteração dinâmica do int
    intChange(){
        const current = document.getElementById('int').value, indicator = document.getElementById('indicator-int')
        
        ChangeAttributesValues.colorChange(current, indicator)
    },

    // Método para a alteração dinâmica das cores dos valores
    colorChange(current, indicator){
        if(Attributes.str > current){
            
            if(indicator.classList.contains('onUp')){
                indicator.classList.remove('onUp')
            }
            
            indicator.classList.add('onDown')
            indicator.value = current
        }

        else if(Attributes.str < current){
            
            if(indicator.classList.contains('onDown')){
                indicator.classList.remove('onDown')
            }
            
            indicator.classList.add('onUp')
            indicator.value = current
        }

        else {
            ChangeAttributesValues.resetColors(indicator)

            indicator.value = current
        }
    },

    // Método para resetar as cores dos valores
    resetColors(indicator){
        if(indicator.classList.contains('onUp')){
            indicator.classList.remove('onUp')
        }

        else if(indicator.classList.contains('onDown')){
            indicator.classList.remove('onDown')
        }
    }
}

// Primeira atualização do visor de dinheiro
Money.updateMoneyVisor(Money.balance)

// Escopo para os eventos de mudança dinâmica
{
    document.getElementById('str').addEventListener('change', ChangeAttributesValues.strChange)
    document.getElementById('vit').addEventListener('change', ChangeAttributesValues.vitChange)
    document.getElementById('spd').addEventListener('change', ChangeAttributesValues.spdChange)
    document.getElementById('dex').addEventListener('change', ChangeAttributesValues.dexChange)
    document.getElementById('int').addEventListener('change', ChangeAttributesValues.intChange)
}

// Eventos de click dos botões do HTML
confirmButton.addEventListener('click', Attributes.updateAttributes)
closeButton.addEventListener('click', sayHi)
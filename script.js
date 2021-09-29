const confirmButton = document.getElementById('confirm-button'), closeButton = document.getElementById('close-button')

function sayHi(){
    alert('Hi')
}

const Money = {
    balance: 5000,
    
    increment(inc){
        this.balance = this.balance + inc
    },

    payment(pay){
        this.balance = this.balance - pay
    },

    updateMoneyVisor(balance){
        const visor = document.getElementById('money')
        visor.value = balance
    }
}

const Attributes = {
    str: 3,
    vit: 3,
    spd: 3,
    dex: 3,
    int: 3,

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

            indicator[x].value = Number(attributes[x].value)

        }

        Money.updateMoneyVisor(Money.balance)
    }
}

Money.updateMoneyVisor(Money.balance)

confirmButton.addEventListener('click', Attributes.updateAttributes)
closeButton.addEventListener('click', sayHi)
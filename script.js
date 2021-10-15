// Ligação com os botões do HTML
const confirmButton = document.getElementById('confirm-button'), closeButton = document.getElementById('close-button')

// Objeto para cuidar do dinheiro do player
const Money = {
    // Saldo do player
    balance: localStorage.getItem('balance'),
    
    // Método de aumento de dinheiro
    increment(inc){
        this.balance = this.balance + inc
        localStorage.setItem('balance', `${this.balance}`)
    },

    // Método de pagamento/diminuição de dinheiro
    payment(pay){
        this.balance = this.balance - pay
        localStorage.setItem('balance', `${this.balance}`)
    },

    // Método para a atualização do visor de saldo no HTML
    updateMoneyVisor(balance){
        const visor = document.getElementById('money')
        visor.value = balance
    }
}

// Objeto para cuidar dos pontos de experiência e do nível do player
const XP = {
    level: 1,
    current: 0,
    max: 100,

    increment(qnt){
        this.current = this.current + qnt

        if(this.current >= this.max){
            this.levelUp()
        }
    },

    levelUp(){
        if(this.current > this.max){
            let excess = this.current - this.max
            this.current = 0 + excess
        }

        else this.current = 0

        this.level = this.level + 1
    }
}

// Objeto para cuidar dos atributos do player
const Attributes = {
    // Atributos do player
    str: localStorage.getItem('str'),
    vit: localStorage.getItem('vit'),
    spd: localStorage.getItem('spd'),
    dex: localStorage.getItem('dex'),
    int: localStorage.getItem('int'),

    // Métodos para a atualização individual dos atributos do player
    updateStr(value){
        this.str = value
        localStorage.setItem('str', `${this.str}`)
    },
    
    updateVit(value){
        this.vit = value
        localStorage.setItem('vit', `${this.vit}`)
    },

    updateSpd(value){
        this.spd = value
        localStorage.setItem('spd', `${this.spd}`)
    },

    updateDex(value){
        this.dex = value
        localStorage.setItem('dex', `${this.dex}`)
    },

    updateInt(value){
        this.int = value
        localStorage.setItem('int', `${this.int}`)
    },

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

            else continue

            switch (x) {
                case 0:
                    Attributes.updateStr(Number(attributes[0].value))
                    break;
                
                case 1:
                    Attributes.updateVit(Number(attributes[1].value))
                    break;
                
                case 2:
                    Attributes.updateSpd(Number(attributes[2].value))
                    break;
                
                case 3:
                    Attributes.updateDex(Number(attributes[3].value))
                    break;
                
                case 4:
                    Attributes.updateInt(Number(attributes[4].value))
                    break;
            
                default:
                    break;
            }

            ChangeAttributesValues.resetColors(indicator[x])
            indicator[x].value = Number(attributes[x].value)

        }

        Money.updateMoneyVisor(Money.balance)
    }
}

// Objeto para fazer alterações dinâmicas nos valores dos atributos
const ChangeAttributesValues = {
    // Método para a alteração dinâmica das cores dos valores
    colorChange(current, indicator, index){
        let attribute
        switch (index) {
            case 0:
                attribute = Attributes.str
                break;

            case 1:
                attribute = Attributes.vit
                break;

            case 2:
                attribute = Attributes.spd
                break;

            case 3:
                attribute = Attributes.dex
                break;

            case 4:
                attribute = Attributes.int
                break;
        
            default:
                break;
        }

        if(attribute > current){
            
            if(indicator.classList.contains('onUp')){
                indicator.classList.remove('onUp')
            }
            
            indicator.classList.add('onDown')
            indicator.value = current
        }

        else if(attribute < current){
            
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
    },

    // Método para alteração dinâmica do str
    strChange(){
        const current = document.getElementById('str').value, indicator = document.getElementById('indicator-str'), index = 0
        
        ChangeAttributesValues.colorChange(current, indicator, index)
    },

    // Método para alteração dinâmica do vit
    vitChange(){
        const current = document.getElementById('vit').value, indicator = document.getElementById('indicator-vit'), index = 1
        
        ChangeAttributesValues.colorChange(current, indicator, index)
    },
    
    // Método para alteração dinâmica do spd
    spdChange(){
        const current = document.getElementById('spd').value, indicator = document.getElementById('indicator-spd'), index = 2
        
        ChangeAttributesValues.colorChange(current, indicator, index)
    },
    
    // Método para alteração dinâmica do dex
    dexChange(){
        const current = document.getElementById('dex').value, indicator = document.getElementById('indicator-dex'), index = 3
        
        ChangeAttributesValues.colorChange(current, indicator, index)
    },
    
    // Método para alteração dinâmica do int
    intChange(){
        const current = document.getElementById('int').value, indicator = document.getElementById('indicator-int'), index = 4
        
        ChangeAttributesValues.colorChange(current, indicator, index)
    }
}

// Objeto para monitorar a execução do jogo
const Game = {
    init(){
        // Escopo para a primeira atualização do visor de dinheiro
        {
            if(Money.balance == "" || Money.balance == null || isNaN(Money.balance) || Money.balance == undefined){
                Money.balance = 5000
                localStorage.setItem('balance', `${Money.balance}`)
                Money.updateMoneyVisor(Money.balance)
            }

            else{
                Money.balance = Number(Money.balance)
                Money.updateMoneyVisor(Money.balance)
            }
        }

        // Escopo para a atualização dos atributos(Com o armazenamento local)
        {
            // Atualização do str
            {
                if(Attributes.str == '' || Attributes.str == null || isNaN(Attributes.str) || Attributes.str == undefined) Attributes.updateStr(3)

                else Attributes.str = Number(Attributes.str)
            }

            // Atualização do vit
            {
                if(Attributes.vit == '' || Attributes.vit == null || isNaN(Attributes.vit) || Attributes.vit == undefined) Attributes.updateVit(3)

                else Attributes.vit = Number(Attributes.vit)
            }

            // Atualização do spd
            {
                if(Attributes.spd == '' || Attributes.spd == null || isNaN(Attributes.spd) || Attributes.spd == undefined) Attributes.updateSpd(3)

                else Attributes.spd = Number(Attributes.spd)
            }

            // Atualização do dex
            {
                if(Attributes.dex == '' || Attributes.dex == null || isNaN(Attributes.dex) || Attributes.dex == undefined) Attributes.updateDex(3)

                else Attributes.dex = Number(Attributes.dex)
            }

            // Atualização do int
            {
                if(Attributes.int == '' || Attributes.int == null || isNaN(Attributes.int) || Attributes.int == undefined) Attributes.updateInt(3)

                else Attributes.int = Number(Attributes.int)
            }

            // Atualização da exibição dos atributos
            let progressBar = document.getElementsByClassName('progress-bar'), progressBarValue = document.getElementsByClassName('progress-bar-value')

            for (let x = 0; x < 5; x++) {
                switch (x) {
                    case 0:
                        progressBar[0].value = Attributes.str
                        progressBarValue[0].value = Attributes.str
                        break;

                    case 1:
                        progressBar[1].value = Attributes.vit
                        progressBarValue[1].value = Attributes.vit
                        break;

                    case 2:
                        progressBar[2].value = Attributes.spd
                        progressBarValue[2].value = Attributes.spd
                        break;

                    case 3:
                        progressBar[3].value = Attributes.dex
                        progressBarValue[3].value = Attributes.dex
                        break;

                    case 4:
                        progressBar[4].value = Attributes.int
                        progressBarValue[4].value = Attributes.int
                        break;
                
                    default:
                        break;
                }
                
            }
        }

        // Escopo para os eventos de mudança dinâmica
        {
            document.getElementById('str').addEventListener('change', ChangeAttributesValues.strChange)
            document.getElementById('vit').addEventListener('change', ChangeAttributesValues.vitChange)
            document.getElementById('spd').addEventListener('change', ChangeAttributesValues.spdChange)
            document.getElementById('dex').addEventListener('change', ChangeAttributesValues.dexChange)
            document.getElementById('int').addEventListener('change', ChangeAttributesValues.intChange)
        }
    },

    refresh(){
        this.init()
    }
}

Game.init()

// Eventos de click dos botões do HTML
confirmButton.addEventListener('click', Attributes.updateAttributes)
closeButton.addEventListener('click', function (){
    alert('Hi')
})
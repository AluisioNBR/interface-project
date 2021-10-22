// Ligação com os botões do HTML
const confirmButton = document.getElementById('confirm-button'), confirmUpdate = document.getElementById('confirm-update'), cancelUpdate = document.getElementById('cancel-update'), closeButton = document.getElementById('close-button'), saveButton = document.getElementById('save-button'), closeSave = document.getElementById('closeSave')

// Objeto para cuidar dos pop-ups
const PopUp = {
    // Objeto para cuidar do pop-up de confirmação de atualização
    confirmUpdate: {
        element: document.getElementById('confirmUpdatePopUp'),
        confirmMsg: document.getElementById('confirm-text'),
        costMsg: document.getElementById('cost'),

        open(){
            PopUp.confirmUpdate.element.classList.remove('not-active')
            PopUp.confirmUpdate.element.classList.add('active')
            PopUp.confirmUpdate.updateMsg()
        },

        close(){
            PopUp.confirmUpdate.element.classList.remove('active')
            PopUp.confirmUpdate.element.classList.add('not-active')
        },

        updateMsg(){
            const values = Attributes.priceCalc()
            let newText = `Serão necessários ${values[2]} pontos de experiência, e ${values[0]} coins\nVai recuperar ${values[1]} coins`

            if(values[0] > Money.balance){
                newText = "Seus coins são insifucientes\npara realizar o aprimoramento!"
                PopUp.confirmUpdate.confirmMsg.innerText = newText
                PopUp.confirmUpdate.costMsg.innerText = ''

                if(!confirmUpdate.classList.contains('disable')) confirmUpdate.classList.add('disable')
            }
            
            else {
                PopUp.confirmUpdate.confirmMsg.innerText = "Deseja confirmar o aprimoramento ?"
                PopUp.confirmUpdate.costMsg.innerText = newText

                if(confirmUpdate.classList.contains('disable'))  confirmUpdate.classList.remove('disable')
            }
        }
    },

    saveData: {
        pop: document.getElementById('saveDataPopUp'),

        open(){
            PopUp.saveData.save()
            PopUp.saveData.pop.classList.remove('not-active')
            PopUp.saveData.pop.classList.add('active')
        },

        close(){
            PopUp.saveData.pop.classList.remove('active')
            PopUp.saveData.pop.classList.add('not-active')
        },

        save(){
            localStorage.setItem('balance', `${Money.balance}`)
        
            localStorage.setItem('xpCurrent', `${XP.current}`)
            localStorage.setItem('level', `${XP.level}`)
            localStorage.setItem('xpPoints', `${XP.points}`)
            localStorage.setItem('xpMax', `${XP.max}`)
        
            localStorage.setItem('str', `${Attributes.str}`)
            localStorage.setItem('vit', `${Attributes.vit}`)
            localStorage.setItem('spd', `${Attributes.spd}`)
            localStorage.setItem('dex', `${Attributes.dex}`)
            localStorage.setItem('int', `${Attributes.int}`)
        }
    }
}

// Objeto para cuidar do dinheiro do player
const Money = {
    // Saldo do player
    balance: localStorage.getItem('balance'),
    
    // Método de aumento de dinheiro
    increment(inc=0){
        this.balance = this.balance + inc
    },

    // Método de pagamento/diminuição de dinheiro
    payment(pay=0){
        this.balance = this.balance - pay
    },

    // Método para a atualização do visor de saldo no HTML
    updateMoneyVisor(balance=this.balance){
        const visor = document.getElementById('money')
        visor.value = balance
    }
}

// Objeto para cuidar dos pontos de experiência e do nível do player
const XP = {
    points: localStorage.getItem('xpPoints'),
    level: localStorage.getItem('level'),
    current: localStorage.getItem('xpCurrent'),
    max: localStorage.getItem('xpMax'),

    levelViewer: document.getElementById('level-viewer'),
    xpBarViewer: document.getElementById('xp-bar'),
    xpPointsViewer: document.getElementById('xp-points'),

    increment(qnt){
        this.current = this.current + qnt

        if(this.current >= this.max){
            this.levelUp()
        }

        else this.updateXPBarViewer()
    },

    payWithPoints(dec){
        this.points = this.points - dec
        this.updateXPPointsViewer()
    },

    levelUp(){
        if(this.current > this.max){
            let excess = this.current - this.max
            this.current = 0 + excess
        }

        else this.current = 0

        this.upXPMax()
        this.updateXPBarMax()
        this.updateXPBarViewer()

        this.points = this.points + 3
        this.level = this.level + 1

        this.updateXPPointsViewer()
        this.updateLevelViewer()
    },

    upXPMax(){
        this.max = this.max + 50
    },

    updateLevelViewer(){
        this.levelViewer.innerText = `Nível ${this.level}`
    },

    updateXPPointsViewer(){
        this.xpPointsViewer.value = this.points
    },

    updateXPBarViewer(){
        this.xpBarViewer.value = this.current    
    },

    updateXPBarMax(){
        this.xpBarViewer.setAttribute('max', this.max)
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
    },
    
    updateVit(value){
        this.vit = value
    },

    updateSpd(value){
        this.spd = value
    },

    updateDex(value){
        this.dex = value
    },

    updateInt(value){
        this.int = value
    },

    // Método para calcular os preços dos aprimoramentos
    priceCalc(){
        const attributes = document.getElementsByClassName('progress-bar'), indicator = document.getElementsByClassName('progress-bar-value')
        const current = [
            Attributes.str,
            Attributes.vit,
            Attributes.spd,
            Attributes.dex,
            Attributes.int
        ]

        let paymentTotal = 0, incrementTotal = 0, pointsToPay = 0

        for (let x = 0; x < attributes.length; x++) {
            let payPoints = 0
            
            if(Number(attributes[x].value) > current[x]){
                if(XP.points < 1 || pointsToPay >= XP.points){
                    let pay = Number(indicator[x].value) * 50
                    paymentTotal = paymentTotal + pay
                }

                else {
                    payPoints = payPoints + (indicator[x].value - current[x])

                    if(payPoints > XP.points){
                        let pay = (payPoints - XP.points) * 50
                        paymentTotal = paymentTotal + pay
                        pointsToPay = pointsToPay + payPoints
                    }

                    else {
                        pointsToPay = pointsToPay + payPoints
                    }
                }
            }
            
            else if(Number(attributes[x].value) < current[x]){
                let inc = Number(indicator[x].value) * 25
                incrementTotal = incrementTotal + inc
            }

            else continue

            if(pointsToPay > XP.points){
                pointsToPay = XP.points
            }
        }

        return [paymentTotal, incrementTotal, pointsToPay]
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
            let payPoints = 0
            
            if(Number(attributes[x].value) > current[x]){
                if(XP.points < 1){
                    let pay = Number(indicator[x].value) * 50
                    Money.payment(pay)
                }

                else {
                    payPoints = payPoints + (indicator[x].value - current[x])

                    if(payPoints > XP.points){
                        let pay = (payPoints - XP.points) * 50
                        Money.payment(pay)
                        XP.payWithPoints(XP.points)
                    }

                    else {
                        XP.payWithPoints(payPoints)
                    }
                }
            }
            
            else if(Number(attributes[x].value) < current[x]){
                let inc = Number(indicator[x].value) * 25
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
        PopUp.confirmUpdate.close()
    }
}

// Objeto para fazer alterações dinâmicas nos valores dos atributos
const ChangeAttributesValues = {
    str: document.getElementById('str'),
    vit: document.getElementById('vit'),
    spd: document.getElementById('spd'),
    dex: document.getElementById('dex'),
    int: document.getElementById('int'),

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
        const indicator = document.getElementById('indicator-str'), index = 0
        
        ChangeAttributesValues.colorChange(ChangeAttributesValues.str.value, indicator, index)
    },

    // Método para alteração dinâmica do vit
    vitChange(){
        const indicator = document.getElementById('indicator-vit'), index = 1
        
        ChangeAttributesValues.colorChange(ChangeAttributesValues.vit.value, indicator, index)
    },
    
    // Método para alteração dinâmica do spd
    spdChange(){
        const indicator = document.getElementById('indicator-spd'), index = 2
        
        ChangeAttributesValues.colorChange(ChangeAttributesValues.spd.value, indicator, index)
    },
    
    // Método para alteração dinâmica do dex
    dexChange(){
        const indicator = document.getElementById('indicator-dex'), index = 3
        
        ChangeAttributesValues.colorChange(ChangeAttributesValues.dex.value, indicator, index)
    },
    
    // Método para alteração dinâmica do int
    intChange(){
        const indicator = document.getElementById('indicator-int'), index = 4
        
        ChangeAttributesValues.colorChange(ChangeAttributesValues.int.value, indicator, index)
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

        // Escopo para a inicialização dos atributos
        {
            // Atualização do str
            {
                if(Attributes.str == '' || Attributes.str == null || isNaN(Attributes.str) || Attributes.str == "undefined") {
                    Attributes.updateStr(3)
                    localStorage.setItem('str', `${Attributes.str}`)
                }

                else Attributes.str = Number(Attributes.str)
            }

            // Atualização do vit
            {
                if(Attributes.vit == '' || Attributes.vit == null || isNaN(Attributes.vit) || Attributes.vit == undefined) {
                    Attributes.updateVit(3)
                    localStorage.setItem('vit', `${Attributes.vit}`)
                }

                else Attributes.vit = Number(Attributes.vit)
            }

            // Atualização do spd
            {
                if(Attributes.spd == '' || Attributes.spd == null || isNaN(Attributes.spd) || Attributes.spd == undefined) {
                    Attributes.updateSpd(3)
                    localStorage.setItem('spd', `${Attributes.spd}`)
                }

                else Attributes.spd = Number(Attributes.spd)
            }

            // Atualização do dex
            {
                if(Attributes.dex == '' || Attributes.dex == null || isNaN(Attributes.dex) || Attributes.dex == undefined){
                    Attributes.updateDex(3)
                    localStorage.setItem('dex', `${Attributes.dex}`)
                }

                else Attributes.dex = Number(Attributes.dex)
            }

            // Atualização do int
            {
                if(Attributes.int == '' || Attributes.int == null || isNaN(Attributes.int) || Attributes.int == undefined) {
                    Attributes.updateInt(3)
                    localStorage.setItem('int', `${Attributes.int}`)
                }

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
            ChangeAttributesValues.str.addEventListener('change', ChangeAttributesValues.strChange)
            ChangeAttributesValues.vit.addEventListener('change', ChangeAttributesValues.vitChange)
            ChangeAttributesValues.spd.addEventListener('change', ChangeAttributesValues.spdChange)
            ChangeAttributesValues.dex.addEventListener('change', ChangeAttributesValues.dexChange)
            ChangeAttributesValues.int.addEventListener('change', ChangeAttributesValues.intChange)
        }

        // Escopo para a iniciação do XP
        {
            // Escopo para a iniciação do nível
            {
                if(XP.level == '' || XP.level == null || isNaN(XP.level) || XP.level == undefined){
                    XP.level = 1
                    localStorage.setItem('level', `${XP.level}`)
                }

                else XP.level = Number(XP.level)

                XP.updateLevelViewer()
            }

            // Escopo para a iniciação dos pontos de xp
            {
                if(XP.points == '' || XP.points == null || isNaN(XP.points) || XP.points == undefined){
                    XP.points = 3
                    localStorage.setItem('xpPoints', `${XP.points}`)
                }

                else XP.points = Number(XP.points)

                XP.updateXPPointsViewer()
            }

            // Escopo para a inicialização do XP atual
            {
                if(XP.current == '' || XP.current == null || isNaN(XP.current) || XP.current == undefined){
                    XP.current = 0
                    localStorage.setItem('xpCurrent', `${XP.current}`)
                }

                else XP.current = Number(XP.current)

                XP.updateXPBarViewer()
            }

            // Escopo para a inicialização do XP máximo
            {
                if(XP.max == '' || XP.max == null || isNaN(XP.max) || XP.max == undefined){
                    XP.max = 100
                    localStorage.setItem('xpMax', `${XP.max}`)
                }

                else XP.max = Number(XP.max)

                XP.updateXPBarMax()
            }
        }

        // Escopo para os eventos de click dos botões do HTML
        {
            confirmButton.addEventListener('click', PopUp.confirmUpdate.open)
            confirmUpdate.addEventListener('click', Attributes.updateAttributes)
            cancelUpdate.addEventListener('click', PopUp.confirmUpdate.close)
            saveButton.addEventListener('click', PopUp.saveData.open)
            closeSave.addEventListener('click', PopUp.saveData.close)
            closeButton.addEventListener('click', function (){
                alert('Hi')
            })
        }
    },

    refresh(){
        this.init()
    }
}

Game.init()

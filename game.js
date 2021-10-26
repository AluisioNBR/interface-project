// Objeto para monitorar a execução do jogo
const Game = {
    init(){
        this.firstUpdateMoney()

        this.firstUpdateXP()

        this.firstUpdateAttributes()

        this.initChange()

        this.initEventClick()
    },

    refresh(){
        this.init()
    },

    // Método para a primeira atualização do visor de dinheiro
    firstUpdateMoney(){
        let balance = localStorage.getItem('balance')
        
        if(balance == "" || balance == null || balance == undefined){
            Money.increment(5000)
            localStorage.setItem('balance', `${Money.balance}`)
        }

        else Money.increment(Number(balance))

        Money.updateMoneyVisor()
    },

    // Método para a iniciação do XP
    firstUpdateXP(){
        let points = localStorage.getItem('xpPoints'), level = localStorage.getItem('level'), current = localStorage.getItem('xpCurrent'), max = localStorage.getItem('xpMax')
        // Escopo para a iniciação do nível
        {
            if(level == '' || level == null || level == undefined){
                XP.level = 1
                localStorage.setItem('level', `${XP.level}`)
            }

            else XP.level = Number(level)

            XP.updateLevelViewer()
        }

        // Escopo para a iniciação dos pontos de xp
        {
            if(points == '' || points == null || points == undefined){
                XP.points = 3
                localStorage.setItem('xpPoints', `${XP.points}`)
            }

            else XP.points = Number(points)

            XP.updateXPPointsViewer()
        }

        // Escopo para a inicialização do XP atual
        {
            if(current == '' || current == null || current == undefined){
                XP.current = 0
                localStorage.setItem('xpCurrent', `${XP.current}`)
            }

            else XP.current = Number(current)

            XP.updateXPBarViewer()
        }

        // Escopo para a inicialização do XP máximo
        {
            if(max == '' || max == null || max == undefined){
                XP.max = 100
                localStorage.setItem('xpMax', `${XP.max}`)
            }

            else XP.max = Number(max)

            XP.updateXPBarMax()
        }
    },

    // Método para a inicialização dos atributos
    firstUpdateAttributes(){
        let str = localStorage.getItem('str'), vit = localStorage.getItem('vit'), spd = localStorage.getItem('spd'), dex = localStorage.getItem('dex'), int = localStorage.getItem('int')
        
        // Atualização do str
        {
            if(str == '' || str == null || str == undefined) {
                Attributes.updateStr(3)
                localStorage.setItem('str', `${Attributes.str}`)
            }

            else Attributes.updateStr(Number(str))
        }

        // Atualização do vit
        {
            if(vit == '' || vit == null || vit == undefined) {
                Attributes.updateVit(3)
                localStorage.setItem('vit', `${Attributes.vit}`)
            }

            else Attributes.updateVit(Number(vit))
        }

        // Atualização do spd
        {
            if(spd == '' || spd == null || spd == undefined) {
                Attributes.updateSpd(3)
                localStorage.setItem('spd', `${Attributes.spd}`)
            }

            else Attributes.updateSpd(Number(spd))
        }

        // Atualização do dex
        {
            if(dex == '' || dex == null || dex == undefined){
                Attributes.updateDex(3)
                localStorage.setItem('dex', `${Attributes.dex}`)
            }

            else Attributes.updateDex(Number(dex))
        }

        // Atualização do int
        {
            if(int == '' || int == null || int == undefined) {
                Attributes.updateInt(3)
                localStorage.setItem('int', `${Attributes.int}`)
            }

            else Attributes.updateInt(Number(int))
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
    },

    // Método para os eventos de mudança dinâmica
    initChange(){
        ChangeAttributesValues.str.addEventListener('change', ChangeAttributesValues.strChange)
        ChangeAttributesValues.vit.addEventListener('change', ChangeAttributesValues.vitChange)
        ChangeAttributesValues.spd.addEventListener('change', ChangeAttributesValues.spdChange)
        ChangeAttributesValues.dex.addEventListener('change', ChangeAttributesValues.dexChange)
        ChangeAttributesValues.int.addEventListener('change', ChangeAttributesValues.intChange)
    },

    // Método para os eventos de click dos botões do HTML
    initEventClick(){
        ButtonsHTML.confirmUpdate.addEventListener('click', Attributes.updateAttributes)
        ButtonsHTML.confirmButton.addEventListener('click', PopUp.confirmUpdate.open)
        ButtonsHTML.cancelUpdate.addEventListener('click', PopUp.confirmUpdate.close)
        ButtonsHTML.saveButton.addEventListener('click', PopUp.saveData.open)
        ButtonsHTML.closeSave.addEventListener('click', PopUp.saveData.close)
        ButtonsHTML.closeButton.addEventListener('click', function (){
            alert('Hi')
        })
    }
}

Game.init()

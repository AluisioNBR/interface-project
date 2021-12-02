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

                if(!ButtonsHTML.confirmUpdate.classList.contains('disable')) ButtonsHTML.confirmUpdate.classList.add('disable')
            }
            
            else {
                PopUp.confirmUpdate.confirmMsg.innerText = "Deseja confirmar o aprimoramento ?"
                PopUp.confirmUpdate.costMsg.innerText = newText

                if(ButtonsHTML.confirmUpdate.classList.contains('disable')) ButtonsHTML.confirmUpdate.classList.remove('disable')
            }
        }
    },

    personCard: {
        container: document.getElementById('person-card'),

        open(){
            PopUp.personCard.container.classList.remove('not-active')
            PopUp.personCard.container.classList.add('active')
        },
        
        close(){
            PopUp.personCard.container.classList.remove('active')
            PopUp.personCard.container.classList.add('not-active')

            PopUp.statusCard.open()
        }
    },

    statusCard:{
        container: document.getElementById('status-card'),

        open(){
            PopUp.statusCard.container.classList.remove('not-active')
            PopUp.statusCard.container.classList.add('active')
        },

        close(){
            PopUp.statusCard.container.classList.remove('active')
            PopUp.statusCard.container.classList.add('not-active')

            PopUp.personCard.open()
        }
    },

    // Objeto para cuidar do pop-up de salvamento
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
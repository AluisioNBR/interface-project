// Ligação com os botões do HTML
const ButtonsHTML = {
    confirmButton: document.getElementById('confirm-button'),
    confirmUpdate: document.getElementById('confirm-update'),
    cancelUpdate: document.getElementById('cancel-update'),
    closeButton: document.getElementById('close-button'),
    changeToPerson: document.getElementById('changeToPerson'),
    changeToStatus: document.getElementById('changeToStatus'),
    saveButton: document.getElementById('save-button'),
    closeSave: document.getElementById('closeSave')
}

ButtonsHTML.confirmUpdate.addEventListener('click', Attributes.updateAttributes)
ButtonsHTML.confirmButton.addEventListener('click', PopUp.confirmUpdate.open)
ButtonsHTML.cancelUpdate.addEventListener('click', PopUp.confirmUpdate.close)
ButtonsHTML.changeToPerson.addEventListener('click', PopUp.statusCard.close)
ButtonsHTML.changeToStatus.addEventListener('click', PopUp.personCard.close)
ButtonsHTML.saveButton.addEventListener('click', PopUp.saveData.open)
ButtonsHTML.closeSave.addEventListener('click', PopUp.saveData.close)
ButtonsHTML.closeButton.addEventListener('click', function (){
    alert('Hi')
})
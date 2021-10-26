// Objeto para cuidar do dinheiro do player
const Money = {
    // Saldo do player
    balance: 0,
    
    // Método de aumento de dinheiro
    increment(inc=0){
        this.balance = this.balance + inc
    },

    // Método de pagamento/diminuição de dinheiro
    payment(pay=0){
        this.balance = this.balance - pay
    },

    // Método para a atualização do visor de saldo no HTML
    updateMoneyVisor(){
        const visor = document.getElementById('money')
        visor.value = this.balance
    }
}
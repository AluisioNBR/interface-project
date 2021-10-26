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
        }

        else if(attribute < current){
            
            if(indicator.classList.contains('onDown')){
                indicator.classList.remove('onDown')
            }
            
            indicator.classList.add('onUp')
        }

        else {
            ChangeAttributesValues.resetColors(indicator)
        }

        indicator.value = current
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
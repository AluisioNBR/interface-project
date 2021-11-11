// Objeto para cuidar dos pontos de experiência e do nível do player
const XP = {
    points: 3,
    level: 1,
    current: 0,
    max: 100,

    levelViewer: document.querySelector('#level-viewer span'),
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
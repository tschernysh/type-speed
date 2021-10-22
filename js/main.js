let textBlock = document.getElementsByClassName('app_text')
let startButton = document.getElementById('startButton')
let typeSpeedEl = document.getElementsByClassName('type_speed')
let typeMistakesEl = document.getElementsByClassName('type_mistakes')
let finishSpeedEl = document.getElementsByClassName('finish_speed')
let finishMistakesEl = document.getElementsByClassName('finish_mistakes')
let startBlock = document.getElementsByClassName('app_start')
let finishBlock = document.getElementsByClassName('app_finish')
let typeBlock = document.getElementsByClassName('app_window')
let background = document.getElementsByClassName('app_background')



const startStage = () => {
    // let text = "The story follows the futuristic dystopian world after a worldwide cataclysm during which the main character Shinji played by Megumi Ogata, is recruited by an organization named Nerv to pilot a mecha named Evangelion to battle beings called \"Angels\""
    let text = 'xyu pizda zalypa chlen'
    let symbols = text.toUpperCase().split('')
    typeBlock[0].classList.remove('app_window_hidden')
    startBlock[0].classList.add('app_start_hidden')
    finishBlock[0].classList.add('app_finish_hidden')
    typeSpeedEl[0].innerText = null
    textBlock[0].innerText = 'Starts in 3'
    setTimeout(() => {
        textBlock[0].innerText = 'Starts in 2'
        setTimeout(() => {
            textBlock[0].innerText = 'Starts in 1'
            setTimeout(() => {
                startType(symbols)
            }, 1000)
        }, 1000)
    }, 1000)
}

const arrSum = (curr, a) => {
    return curr + a
}
const startType = (symbols) => {
    let lastPress = Date.now()
    let midInterval = 0
    let interval = []
    let controlSpeed = []
    let midSpeed = 0
    let speed  = 0
    let mistakes = 0
    textBlock[0].innerText = symbols.join('')
    document.addEventListener('keypress', e => {
        
        if(e.key.toUpperCase() === symbols[0]){
            interval[interval.length] = Date.now() - lastPress
            lastPress = Date.now()
            midInterval = Math.ceil((interval.reduce(arrSum, 0))/interval.length)
            speed = Math.ceil((controlSpeed.reduce(arrSum, 0))/controlSpeed.length)
            typeSpeedEl[0].innerText = speed || null
            symbols.splice(0, 1)
            textBlock[0].innerText = symbols.join('')
            interval.length === 50 && interval.splice(0, 20)
            background[0].style.filter = 'hue-rotate(' + (speed / 3 ) +'deg)'
        }else if(e.key.toUpperCase() !== symbols[0]){
            mistakes++
            typeMistakesEl[0].innerText = mistakes
        }
    })

    let intervalFunc = setInterval(() => {
        if(symbols[0] && midInterval){
            controlSpeed[controlSpeed.length] = Math.ceil(60000 / midInterval)
            midSpeed = Math.ceil((controlSpeed.reduce(arrSum, 0))/controlSpeed.length)
        }else if(!symbols[0]){
            typeBlock[0].classList.add('app_window_hidden')
            finishBlock[0].classList.remove('app_finish_hidden')
            document.removeEventListener('keypress', () => {})
            background[0].style.filter = ''
            finishSpeedEl[0].innerText = midSpeed
            finishMistakesEl[0].innerText = mistakes
            clearInterval(intervalFunc)
        }
    }, 1000);
}

startButton.addEventListener('click', startStage)

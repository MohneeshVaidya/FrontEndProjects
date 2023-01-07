let removeFrame = function (obj) {

    tmp = obj.textContent
    id = '#' + tmp.trim().toLowerCase()
    
    document.querySelector(id).classList.add('hide')
}

let addFrame = function (obj) {

    tmp = obj.textContent
    id = '#' + tmp.trim().toLowerCase()

    document.querySelector(id).classList.remove('hide')
}

let updateDimen = function (num) {

    newDimension = `${100/num}%`
    document.querySelectorAll('.work').forEach(element => {

        if(!element.classList.contains('hide')) {

            if(document.querySelector('main').offsetWidth > 765) element.style.width = newDimension;
            else element.style.height = newDimension;
        }
    })
}

let updateIframe = function () {
    
    htmlCode = `<html>
        <head> <style> ${css} </style> </head>
        <body> ${html} </body>
    </html>`
    
    with(iframeObj.contentDocument) {

        open()
        write(htmlCode)
        close()
    }

    iframeObj.contentWindow.eval(javascript)
}

let iframeObj = document.querySelector('iframe')
let width = Infinity
let count = 4
let html = ''
let css = ''
let javascript = ''

document.querySelectorAll('.btn').forEach(btn => {
    
    btn.addEventListener('click', e => {
        
        classList = e.currentTarget.classList
        if(classList.contains('active')) {

            --count
            removeFrame(e.currentTarget)
        } else {

            ++count
            addFrame(e.currentTarget)
        }
        classList.toggle('active')
        updateDimen(count)
    })
})

events = 'keyup paste'.split(' ')
events.forEach((val, idx, events) => {

    document.querySelector('#html').addEventListener(val, e => {

        html = e.currentTarget.value.trim()
        updateIframe()
    })

    document.querySelector('#css').addEventListener(val, e => {

        css = e.currentTarget.value.trim()
        updateIframe()
    })

    document.querySelector('#javascript').addEventListener(val, e => {

        if(e.key !== 'Enter') {
            
            javascript = ''
            return
        }

        javascript = e.currentTarget.value.trim()
        updateIframe()
    })
})

window.addEventListener('resize', e => {

    document.querySelectorAll('.work').forEach(obj => {

        if(document.querySelector('main').offsetWidth <= 765) obj.style.width = '97%';
        else obj.style.height = '99%';
    })

    updateDimen(count)
})
import { resizeObserver, getTabPos } from "https://ettricswildfire.netlify.app/scripts/helpers.js"

function createVerticalTabs(vtElm) {
    return {
        tabWrapper: vtElm.querySelector('.tab-wrapper'),
        indicator: vtElm.querySelector('.tab-vertical-active-indicator'),
        tabs: vtElm.querySelectorAll('.tab'),
        activeIndex: 0,
        timeoutFunc: null,
        frame: vtElm.querySelector('.frame'),

        moveIndicator() {
            this.indicator.style.opacity = '0.3'
            this.indicator.style.height = '0.5em'
            setTimeout(() => {
                this.indicator.style.opacity = '1'
                this.indicator.style.height = '1.5em'
                let pos = getTabPos(this.tabs[this.activeIndex].querySelector('.tab-number'), this.tabWrapper)
                this.indicator.style.bottom = `calc(${pos}px + 0.2em)`
            }, 600);
        },

        prepare() {

            this.tabs.forEach((tab, i) => {
                tab.addEventListener('click', ()=>{
                    this.tabClickHandler(i)
                })

                let tabImg = document.createElement('img')
                let imgSrcs = [...this.frame.querySelectorAll('img')].map(img => {
                        return img.src
                    })
                tabImg.src = imgSrcs[i]

                tab.append(tabImg)

            })
            this.activate(this.activeIndex)

            this.frame.onmouseover = () => {
                this.stopPlaying()
            }
            this.frame.onmouseout = () => {
                this.autoPlay()
            }
        },

        activate(tabIndex) {
            this.tabs.forEach((tab, i) => {
                const img = tab.querySelector('img')
                img.onmouseover = () => {
                    this.stopPlaying()
                }
                img.onmouseout = () => {
                    this.autoPlay()
                }
                if (i===tabIndex) {
                    tab.classList.add('active')
                    resizeObserver.observe(img)
                } else {
                    tab.classList.remove('active')
                    resizeObserver.unobserve(img)
                    img.style.height = 0
                }
            })
            this.activeIndex = tabIndex
            this.moveIndicator()

            this.frame.classList.remove('active')
            void this.frame.offsetWidth
            this.frame.classList.add('active')
            this.frame.querySelectorAll('img').forEach((img, i) => {
                if (i === tabIndex) {
                    img.classList.add('active')

                } else {
                    img.classList.remove('active')
                    
                }
            })
        },
        tabClickHandler(clickedIndex) {
            clearTimeout(this.timeoutFunc)
            this.activate(clickedIndex)
        },
        autoPlay() {
            this.timeoutFunc = setTimeout(() => {
                this.activeIndex = (this.activeIndex >= this.tabs.length - 1)? 0 : this.activeIndex + 1
                this.tabs[this.activeIndex].click()
                this.autoPlay()
            }, 4000);
        },
        stopPlaying() {
            clearTimeout(this.timeoutFunc)
        }
    }
}

export default createVerticalTabs
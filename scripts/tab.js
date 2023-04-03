import createVerticalTabs from "https://ettricswildfire.netlify.app/scripts/createVerticalTabs.js"
import { resizeObserver } from "https://ettricswildfire.netlify.app/scripts/helpers.js"

const vertTabs = document.querySelectorAll('.vertical-tabs')

const vtObjs = []

let tabObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {

        let i = Number(entry.target.dataset.index)

        if (entry.isIntersecting) {
            vtObjs[i].autoPlay()
        } else {
            vtObjs[i].stopPlaying()
        }

    })
}, {
    threshold: 0.7,
    rootMargin: `${0.3 * window.innerHeight}px 0px`, 
})


vertTabs.forEach((vt, i) => {

    const relativeDiv = vt.querySelector('.relative')

    resizeObserver.observe(relativeDiv)
    const tabObj = createVerticalTabs(vt)
    vtObjs.push(tabObj)
    tabObj.prepare()
    vt.dataset.index = i
    tabObserver.observe(vt)

})

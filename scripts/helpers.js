const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
        entry.target.style.height = `${entry.contentRect.width}px`
    })
})



function getTabPos(child, parent) {
    let childY = child.getBoundingClientRect().bottom
    let parentY = parent.getBoundingClientRect().bottom
    return (parentY - childY)
}




export {resizeObserver, getTabPos}

window.onload = () => { 
    initialFilter((dragItem, dropItem) => {
        dragItem.parentNode.removeChild(dragItem)
        dropItem.before(dragItem)

        httpRequest('/sort/user', { dragItem, dropItem }) 
    })

    setLoadHandler(() => { httpRequest('/getdata/user') })
}

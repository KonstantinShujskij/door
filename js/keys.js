
window.onload = () => { 
    initialFilter((dragItem, dropItem) => {
        dragItem.parentNode.removeChild(dragItem)
        dropItem.before(dragItem)

        httpRequest('/sort/keys', { dragItem, dropItem }) 
    })

    setLoadHandler(() => { httpRequest('/getdata/id') })
}

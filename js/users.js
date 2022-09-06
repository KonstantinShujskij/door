
window.onload = () => { 
    initialFilter((dragItem, dropItem) => {
        dragItem.parentNode.removeChild(dragItem)
        dropItem.before(dragItem)

        httpRequest('/sort/users', { dragItem, dropItem }) 
    })

    setLoadHandler(() => { httpRequest('/getdata/user') })
}

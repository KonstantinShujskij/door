
window.onload = () => {
    const accessList = document.getElementById('access-events')
    const systemList = document.getElementById('system-events')

    
    initialMenu((target) => {
        document.getElementById('content').setAttribute('data-content', target)
    })

    initialFilter((dragItem, dropItem) => {
        dragItem.parentNode.removeChild(dragItem)
        dropItem.before(dragItem)

        httpRequest('/sort/access-events', { dragItem, dropItem }) 
    }, accessList)

    initialFilter((dragItem, dropItem) => {
        dragItem.parentNode.removeChild(dragItem)
        dropItem.before(dragItem)

        httpRequest('/sort/system-events', { dragItem, dropItem }) 
    }, systemList)

    setLoadHandler(() => { httpRequest('/getdata/access-events') }, accessList)
    setLoadHandler(() => { httpRequest('/getdata/system-events') }, systemList)
    
}

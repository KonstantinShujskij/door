let filterDragItem = null 

function setFilterItemHandler(item, handler) {

    function handleDragStart() {
        filterDragItem = this
        this.style.opacity = '0.4'
    }
    
    function handleDragEnd(e) {
        this.style.opacity = '1'
        filterDragItem = null
    }

    function handleDrop(e) {
        if(filterDragItem !== this) { handler(filterDragItem, this) }      

        e.stopPropagation()
        return false
    }

    function handleDragOver(e) {
        if (e.preventDefault) { e.preventDefault() }
        return false
    }

    item.addEventListener('dragstart', handleDragStart)
    item.addEventListener('dragend', handleDragEnd)
    item.addEventListener('drop', handleDrop)
    item.addEventListener('dragover', handleDragOver)
}

function initialFilter(handler) {
    document.querySelectorAll('.filter__item').forEach((item) => setFilterItemHandler(item, handler))
}

function setLoadHandler(handler, root=null, item=null) {
    if(root === null) { root = document.getElementsByClassName('content__list')[0] }
    if(item === null) { item = document.getElementsByClassName('content-list__bottom')[0] }

    const observer = new IntersectionObserver(([target]) => {
        if(target.isIntersecting) { handler() }
    }, { root, rootMargin: '100px', threshold: 0})

    observer.observe(item)
}




// class Element {
//     constructor(initial) {
//         this.state = initial
//         this.subscribes = []
//     }

//     reducer(state, action) { return state }

//     dispatch(action) { 
//         this.state = this.reducer(this.state, action)
//         this.subscribes.forEach((fun) => fun(this.state))
//     }

//     subscribe(fun) { this.subscribes.push(fun) }
// }

const sortPref = ['input-sort__none', 'input-sort__lower', 'input-sort__upper']

const items = {}

const setContent = (content) => items.content.setAttribute('data-content', content)
const setPopup = (popup) => items.content.setAttribute('data-popup', popup)


window.onload = () => {
    items.content = document.getElementById('content')
    items.sidebar = document.getElementById('sidebar')
    items.sidebarItems = Array.from(document.getElementsByClassName('sidebar__item'))    

    items.usersSelectAll = document.getElementById('users__button-all')
    items.keysSelectAll = document.getElementById('keys__button-all')
    
    items.sidebar.onclick = (event) => {
        if(event.target.classList.contains('sidebar__item')) {
            items.sidebarItems.map((item) => item.classList.remove('sidebar__item_active'))
            event.target.classList.add('sidebar__item_active')
            setContent(event.target.getAttribute('data-target'))
        }
    }

    Array.from(document.getElementsByClassName('user-key-add')).map((item) => {
        item.getElementsByClassName('user-key-add__button')[0].onclick = (event) => {
            item.classList.toggle('user-key-add_open')
        }

        Array.from(item.getElementsByClassName('user-key-add__case')).map((link) => {
            link.onclick = () => {
                item.classList.remove('user-key-add_open')
                Array.from(document.getElementsByClassName('popup-keys')).map((elem) => {
                    elem.setAttribute('data-content', link.getAttribute('data-target'))
                })
            }
        })
    })

    document.addEventListener( 'click', (e) => {
        Array.from(document.getElementsByClassName('user-key-add')).map((item) => {
            if(!e.composedPath().includes(item)) {
                item.classList.remove('user-key-add_open')
            }
        })

        e.stopPropagation()       
    })


    Array.from(document.getElementsByClassName('input__sort')).map((item) => {
        item.onclick = () => {
            const sort = item.parentNode.getAttribute('data-sort')

            if(sort == 'none') { item.parentNode.setAttribute('data-sort', 'lower') }
            else if(sort == 'lower') { item.parentNode.setAttribute('data-sort', 'upper') }
            else { item.parentNode.setAttribute('data-sort', 'none') }
        }
    })


    document.getElementById('user-popup-create-end-data').onkeyup = (event) => {
        const pattern = /^\d{2}([./-])\d{2}\1\d{4}$/
        if(event.target.value.match(pattern)) {
            document.getElementById('user-popup-create-delete').classList.remove('hide')
        }
        else {
            document.getElementById('user-popup-create-delete').classList.add('hide')
        }
    }

    items.usersSelectAll.onclick = (event) => {
        if(event.target.getAttribute('type') === 'checkbox') {
            items.usersSelectAll.classList.toggle('users__button-all_select')
        }        
    }

    items.keysSelectAll.onclick = (event) => {
        if(event.target.getAttribute('type') === 'checkbox') {
            items.keysSelectAll.classList.toggle('keys__button-all_select')
        }        
    }


    let filterDragItem = null

    function handleDragStart(e) {
        this.style.opacity = '0.4';
        filterDragItem = this
    }
    
    function handleDragEnd(e) {
        this.style.opacity = '1';
        filterDragItem = null
    }

    function handleDrop(e) {
        if(filterDragItem !== this) {
            filterDragItem.parentNode.removeChild(filterDragItem)
            this.before(filterDragItem)
        }      

        e.stopPropagation()
        return false
    }

    function handleDragOver(e) {
        if (e.preventDefault) { e.preventDefault() }
        return false;
      }
    
    
    document.querySelectorAll('.filter__item').forEach(function(item) {
        item.addEventListener('dragstart', handleDragStart)
        item.addEventListener('dragend', handleDragEnd)
        item.addEventListener('drop', handleDrop)
        item.addEventListener('dragover', handleDragOver);
    })
}
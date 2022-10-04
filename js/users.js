class PopupEdit {
    constructor(elem) {
        this.root = elem
        
        this.elems = {}
        this.elems.firstName = this.root.querySelector('#name')
        this.elems.lastName = this.root.querySelector('#lastname')
        this.elems.middleName = this.root.querySelector('#middlename')
        this.elems.branch = this.root.querySelector('#branch')
        this.elems.company = this.root.querySelector('#company')
        this.elems.phone = this.root.querySelector('#phone')
        this.elems.email = this.root.querySelector('#email')
        this.elems.language = this.root.querySelector('#language')
        this.elems.validFrom = this.root.querySelector('#validFrom')
        this.elems.validTo = this.root.querySelector('#validTo')
        this.elems.privilege = this.root.querySelector('#privilege')

        this.elems.keyList = this.root.querySelector('#key-list')
    }

    createKey(key) {
        return `<div class="popup-key">
                    <div class="popup-key__name">${key.idName}</div>
                    <div class="popup-key__id">${key.id}</div>
                    <div class="popup-key__type">Чип</div>
                    <div class="popup-key__button">
                        <button class="popup-key__button-remove" tooltip="Открепить">
                            <i class="fa-solid fa-link-slash"></i>
                        </button>
                    </div>
                </div>`
    }

    initKeyEvents() {}

    fill(data) {
        for(let key in data) { 
            if(this.elems[key]) {
                this.elems[key].value = data[key] 
            }            
        }

        const keys = data.keys
        if(keys) {
            this.elems.keyList.innerHTML = ''
            keys.forEach((key) => {
                this.elems.keyList.innerHTML += this.createKey(key)
            })
            this.initKeyEvents()
        }
    }
}

const elements = {}
const users = new Set()

let openEdit = () => {} 
let openEditList = () => {
    if(users.size === 1) { openEdit(users.values().next().value) }
}


window.onload = () => { 
    initialFilter((dragItem, dropItem) => {
        dragItem.parentNode.removeChild(dragItem)
        dropItem.before(dragItem)

        httpRequest('/sort/users', { dragItem, dropItem }) 
    })

    setLoadHandler(() => { httpRequest('/getdata/user') })

    initialPopupKeys()

    const popup = new PopupEdit(document.querySelector('.popup.edit-popup'))

    openEdit = (id) => {
        setPopup('edit')       
        httpRequest(`/user/${id}`).then((data) => data.json()).then((data) => popup.fill(data))
    }

    const selectCount = new Value(0, "select-value")


    elements.check_list = document.querySelectorAll('.user__select input')
    elements.selectAllBtn = document.getElementById('select-all')
    elements.selectAll = elements.selectAllBtn.parentNode.parentNode

    Array.from(elements.check_list).forEach((item) => {
        item.onchange = (event) => {
            const id = event.target.getAttribute('data-id')

            if(event.target.checked) { 
                elements.selectAllBtn.checked = true
                elements.selectAll.classList.remove('controls__button-all_select')
                users.add(id) 
            }
            else { 
                if(!Array.from(elements.check_list).filter((item) => item.checked).length) {
                    elements.selectAllBtn.checked = false
                    elements.selectAll.classList.add('controls__button-all_select')
                }
                users.delete(id) 
            }
            selectCount.set(users.size)
        }
    })

    elements.selectAllBtn.onchange = (event) => {
        if(event.target.checked) { 
            elements.selectAll.classList.remove('controls__button-all_select')
            Array.from(elements.check_list).forEach((item) => { 
                if(!item.disabled) {
                    item.checked = true 
                    users.add(item.getAttribute('data-id')) 
                }                
            })
        }
        else { 
            elements.selectAll.classList.add('controls__button-all_select')
            Array.from(elements.check_list).forEach((item) => {
                if(!item.disabled) {
                    item.checked = false
                    users.delete(item.getAttribute('data-id')) 
                }      
            })
        }
        selectCount.set(users.size)
    }

}

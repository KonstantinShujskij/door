class PopupEdit {
    constructor(elem) {
        this.root = elem
        
        this.elems = {}
        this.elems.idName = this.root.querySelector('#id-name')
    }

    fill(data) {
        for(let key in data) { 
            if(this.elems[key]) {
                this.elems[key].value = data[key] 
            }            
        }
    }
}

const elements = {}
const keys = new Set()

let openEdit = () => {} 
let openEditList = () => {
    if(keys.size === 1) { openEdit(keys.values().next().value) }
}


window.onload = () => { 
    initialFilter((dragItem, dropItem) => {
        dragItem.parentNode.removeChild(dragItem)
        dropItem.before(dragItem)

        httpRequest('/sort/keys', { dragItem, dropItem }) 
    })

    setLoadHandler(() => { httpRequest('/getdata/id') })

    initialPopupKeys()

    initialInputs()

    console.log(inputs);

    inputs.keytype.validate = () => false
    inputs.scaner.validate = () => false

    const popup = new PopupEdit(document.querySelector('.popup.edit-popup'))

    openEdit = (id) => {
        setPopup('edit')        
        httpRequest(`/key/${id}`).then((data) => data.json()).then((data) => popup.fill(data))
    }

    const selectCount = new Value(0, "select-value")


    elements.check_list = document.querySelectorAll('.key__select input')
    elements.selectAllBtn = document.getElementById('select-all')
    elements.selectAll = elements.selectAllBtn.parentNode.parentNode

    Array.from(elements.check_list).forEach((item) => {
        item.onchange = (event) => {
            const id = event.target.getAttribute('data-id')

            if(event.target.checked) { 
                elements.selectAllBtn.checked = true
                elements.selectAll.classList.remove('controls__button-all_select')
                keys.add(id) 
            }
            else { 
                if(!Array.from(elements.check_list).filter((item) => item.checked).length) {
                    elements.selectAllBtn.checked = false
                    elements.selectAll.classList.add('controls__button-all_select')
                }
                keys.delete(id) 
            }
            selectCount.set(keys.size)
        }
    })

    elements.selectAllBtn.onchange = (event) => {
        if(event.target.checked) { 
            elements.selectAll.classList.remove('controls__button-all_select')
            Array.from(elements.check_list).forEach((item) => { 
                if(!item.disabled) {
                    item.checked = true 
                    keys.add(item.getAttribute('data-id')) 
                }                
            })
        }
        else { 
            elements.selectAll.classList.add('controls__button-all_select')
            Array.from(elements.check_list).forEach((item) => {
                if(!item.disabled) {
                    item.checked = false
                    keys.delete(item.getAttribute('data-id')) 
                }      
            })
        }
        selectCount.set(keys.size)
    }


}

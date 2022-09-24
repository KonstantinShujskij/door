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
    }

    fill(data) {
        for(let key in data) { 
            if(this.elems[key]) {
                this.elems[key].value = data[key] 
            }            
        }
    }
}

let openEdit = () => {} 


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
        httpRequest(`/user/${id}`).then((data) => popup.fill(data))
    }

}

function initialPopupKeys() {
    const popupKeys = document.querySelectorAll('.popup-keys-wrap')

    

    popupKeys.forEach((elem) => {
        const contentWrap = elem.querySelector('.popup-keys')
        const addWrap = elem.querySelector('.popup-key-add')
        const btn = elem.querySelector('.popup-key-add__button')
        const list = elem.querySelectorAll('.popup-key-add__case')

        list.forEach((item) => {
            item.onclick = () => { 
                const target = item.getAttribute('data-target')
                contentWrap.setAttribute('data-content', target)
                addWrap.classList.remove('popup-key-add_open')
            }
        })

        btn.onclick = () => { addWrap.classList.toggle('popup-key-add_open') }
    })

}

function setPopup(popup) {    
    document.getElementById('content').setAttribute('data-popup', popup) 
    document.querySelectorAll('.popup__content').forEach((item) => item.scrollTop = 0)
}
function initialPopupKeys() {
    const popupKeys = document.querySelectorAll('.popup-keys-wrap')
    const contentWrap = document.querySelector('.popup-keys')
    const keysPopup = document.querySelector('.keys-popup')

    const keysPopupCancelBtn = document.querySelector('.key-popup__cancel-btn')
    const keysPopupSetBtn = document.querySelector('.key-popup__set-btn')

    if(keysPopupCancelBtn) {
        keysPopupCancelBtn.onclick = () => { keysPopup.classList.remove('popup_open') }
    }
    if(keysPopupSetBtn) {
        keysPopupSetBtn.onclick = () => { keysPopup.classList.remove('popup_open') }
    }


    popupKeys.forEach((elem) => {       
        const addWrap = elem.querySelector('.popup-key-add')
        const btn = elem.querySelector('.popup-key-add__button')
        const list = elem.querySelectorAll('.popup-key-add__case')

        list.forEach((item) => {
            item.onclick = () => { 
                const target = item.getAttribute('data-target')
                contentWrap.setAttribute('data-content', target)
                addWrap.classList.remove('popup-key-add_open')
                if(keysPopup) { keysPopup.classList.add('popup_open') }
            }
        })

        btn.onclick = () => { addWrap.classList.toggle('popup-key-add_open') }
    })

}

function setPopup(popup) {    
    document.getElementById('content').setAttribute('data-popup', popup) 
    document.querySelectorAll('.popup__content').forEach((item) => item.scrollTop = 0)
}
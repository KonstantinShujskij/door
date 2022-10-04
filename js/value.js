class Value {
    constructor(initialValue, elem=null) {
        this.value = initialValue
        this.actions = new Map()

        if(elem) {
            this.elem = document.getElementById(elem)
            this.actions.set("refresh", () => { this.elem.innerHTML = this.value })
            this.call('refresh')
        }
    }

    subscribe(fun) {
        const id = Number.toString(Date.now())
        this.actions.set(id, fun)
        return id
    }

    unSubscribe(id) { this.actions.delete(id) }

    call(id) { this.actions.get(id)() }

    callAll() { for (let [id, fun] of this.actions) fun() }

    set(value) { 
        this.value = value 
        this.callAll()
    }

    get() { return this.value }
}
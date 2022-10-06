class MiniCalendar {
    monthList = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

    constructor(elem) {
        this.root = elem
        this.yearElem = this.root.querySelector('.mini-calendar__year-value')
        this.monthElem = this.root.querySelector('.mini-calendar__month-value')
        this.daysElem = this.root.querySelector('.mini-calendar__days')

        this.backYearBtn = this.root.querySelector('.mini-calendar__back-year-btn')
        this.nextYearBtn = this.root.querySelector('.mini-calendar__next-year-btn')
        this.backMonthBtn = this.root.querySelector('.mini-calendar__back-month-btn')
        this.nextMonthBtn = this.root.querySelector('.mini-calendar__next-month-btn')

        this.year = new Date().getFullYear()
        this.month = new Date().getMonth()

        this.refresh()

        this.backYearBtn.onclick = (e) => { this.year -= 1; this.refresh() }
        this.nextYearBtn.onclick = () => { this.year += 1; this.refresh() }
        this.backMonthBtn.onclick = () => { this.month = (this.month + 12 - 1) % 12; this.refresh() }
        this.nextMonthBtn.onclick = () => { this.month = (this.month + 1) % 12; this.refresh() }
    }

    refresh() {
        this.dayCount = 32 - new Date(this.year, this.month, 32).getDate()
        this.startDay = new Date(this.year, this.month, 1).getDay()

        this.yearElem.innerText = this.year
        this.monthElem.innerText = this.monthList[this.month]
        this.daysElem.setAttribute('data-start', this.startDay)

        this.daysElem.innerHTML = '<div class="mini-calendar__clear"></div>'
        for(let i = 1; i <= this.dayCount; i++) { this.daysElem.innerHTML += `<div class="mini-calendar__day">${i}</div>` }
        this.initialDayEvents()
    }

    initialDayEvents() {
        this.daysElem.querySelectorAll('.mini-calendar__day').forEach((day) => {
            day.onclick = () => { this.onselect(this.year, this.month, day.innerText) }
        })
    }

    onselect(year, month, day) {  }
}

class Input {
    constructor(elem) {
        this.root = elem
        this.input = this.root.querySelector('.input__value')

        this.input.oninput = () => this.oninput()


        this.value = this.input.value             
    }

    validate(value) { return true }

    oninput() {
        if(this.validate(this.input.value)) { this.value = this.input.value }
        this.input.value = this.value
    }
}

class InputList extends Input {
    constructor(elem) {
        super(elem)

        this.list = this.root.querySelector('.input__list')

        this.input.onclick = (e) => this.root.classList.toggle('input_open') 

        document.addEventListener('click', (event) => {         
            if(!event.composedPath().includes(this.root) ) { this.root.classList.remove('input_open') }
        })      
    }

}

class InputSelect extends InputList {
    constructor(elem) {
        super(elem)

        this.cases = this.root.querySelectorAll('.input__case')

        this.cases.forEach((item) => { item.onclick = (event) => this.onselect(event) })
    }

    onselect(event) {
        this.value = event.target.innerText
        this.input.value = this.value
    }
}


class InputDate extends InputList {
    constructor(elem) {
        super(elem)

        this.calendar = new MiniCalendar(this.list)

        this.calendar.onselect = (year, month, day) => {
            month += 1
            this.value = `${day > 9? day : '0' + day}.${month > 9? month : '0' + month}.${year}`
            this.input.value = this.value
        }
    }
}

const inputs = {}

function initialInputs() {
    document.querySelectorAll('.value-input').forEach((input) => {
        const item = new InputSelect(input)
        inputs[`${item.input.id}`] = item
    })

    document.querySelectorAll('.select-input').forEach((input) => {
        const item = new InputSelect(input)
        inputs[`${item.input.id}`] = item
    })

    document.querySelectorAll('.input-date').forEach((input) => {
        const item = new InputDate(input)
        inputs[`${item.input.id}`] = item
    })
}


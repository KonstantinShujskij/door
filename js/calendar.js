class Calendar {
    constructor(id='calendar') {
        this.root = document.getElementById(id)

        this.weeks = this.root.querySelectorAll('.week')
        this.numbers = this.root.querySelectorAll('.number')
        this.days = this.root.querySelectorAll('.day')

        this.setDaysEvent()
        this.setWeekEvent()
        this.setNumbersEvent()
    }

    setDaysEvent() {
        this.days.forEach((day) => {
            day.onclick = () => {
                if(this.currentDay) { this.currentDay.classList.remove('day_active') }

                if(this.currentDay !== day) {
                    this.currentDay = day
                    this.currentDay.classList.add('day_active')
                }
                else { this.currentDay = null }
            }
        })
    }

    setWeekEvent() {
        this.weeks.forEach((week) => {
            week.onclick = () => {
                if(this.currentWeek) { this.currentWeek.classList.remove('week_active') }

                if(this.currentWeek !== week) {
                    this.currentWeek = week
                    this.currentWeek.classList.add('week_active')
                }
                else { this.currentWeek = null }
            }
        })
    }

    setNumbersEvent() {
        this.numbers.forEach((number) => {
            number.onclick = () => {
                if(this.currentNumber) { this.currentNumber.classList.remove('number_active') }

                if(this.currentNumber !== number) {
                    this.currentNumber = number
                    this.currentNumber.classList.add('number_active')
                }
                else { this.currentNumber = null }
            }
        })
    }
}

// 13.1-ПТ.08.2022
// 13.3-ЧТ.**.****
// 13.**.****
// 08.****
window.onload = () => {
    new Calendar()
}
import "flatpickr";

export class FlatpickrExtension {

    static hook () {
        Flatpickr.setDate = function(e){
            e.preventDefault();
            e.stopPropagation();
    
            if (!e.target.classList.contains("flatpickr-day") || e.target.classList.contains("disabled") || e.target.classList.contains("notAllowed")) return;
    
            var selectedDate = self.latestSelectedDateObj = new Date(e.target.dateObj.getTime());
    
            var shouldChangeMonth = selectedDate.getMonth() !== self.currentMonth && self.config.mode !== "range";
    
            self.selectedDateElem = e.target;
    
            if (self.config.mode === "single") self.selectedDates = [selectedDate];else if (self.config.mode === "multiple") {
                var selectedIndex = isDateSelected(selectedDate);
                if (selectedIndex) self.selectedDates.splice(selectedIndex, 1);else self.selectedDates.push(selectedDate);
            } else if (self.config.mode === "range") {
                if (self.selectedDates.length === 2) self.clear();
    
                self.selectedDates.push(selectedDate);
    
                // unless selecting same date twice, sort ascendingly
                if (compareDates(selectedDate, self.selectedDates[0], true) !== 0) self.selectedDates.sort(function (a, b) {
                    return a.getTime() - b.getTime();
                });
            }
    
            setHoursFromInputs();
    
            if (shouldChangeMonth) {
                var isNewYear = self.currentYear !== selectedDate.getFullYear();
                self.currentYear = selectedDate.getFullYear();
                self.currentMonth = selectedDate.getMonth();
    
                if (isNewYear) triggerEvent("YearChange");
    
                triggerEvent("MonthChange");
            }
    
            buildDays();
    
            if (self.minDateHasTime && self.config.enableTime && compareDates(selectedDate, self.config.minDate) === 0) setHoursFromDate(self.config.minDate);
    
            updateValue();
    
            if (self.config.enableTime) setTimeout(function () {
                return self.showTimeInput = true;
            }, 50);
    
            if (self.config.mode === "range") {
                if (self.selectedDates.length === 1) {
                    onMouseOver(e.target);
    
                    self._hidePrevMonthArrow = self._hidePrevMonthArrow || self.minRangeDate > self.days.childNodes[0].dateObj;
    
                    self._hideNextMonthArrow = self._hideNextMonthArrow || self.maxRangeDate < new Date(self.currentYear, self.currentMonth + 1, 1);
                } else {
                    updateNavigationCurrentMonth();
                    self.close();
                }
            }
    
            triggerEvent("Change");
    
            // maintain focus
            if (!shouldChangeMonth) focusOnDay(e.target.$i, 0);else afterDayAnim(function () {
                return self.selectedDateElem.focus();
            });
    
            if (self.config.enableTime) setTimeout(function () {
                return self.hourElement.select();
            }, 451);
    
            if (self.config.mode === "single" && !self.config.enableTime) self.close();
        }
    }
};
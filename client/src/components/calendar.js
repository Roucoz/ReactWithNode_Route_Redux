import React, { Component, Fragment } from "react";
import moment from 'moment';


const weekdayshort = moment.weekdaysShort();

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateObject: moment()
        };
    }
    weekdayshortname = () => {
        return (<div>{weekdayshort.map(day => {
            return (
                <th key={day} className="primcolor p-1 ">
                    {day}
                </th>
            )
        })}</div>
        )
    }

    render() {
        const firstDayOfMonth = () => {
            let dateObject = this.state.dateObject;
            let firstDay = moment(dateObject)
                .startOf("month")
                .format("d");
            return firstDay;
        };

        let blanks = [];
        for (let i = 0; i < firstDayOfMonth(); i++) {
            blanks.push(
                <td className="calendar-day empty">{""}</td>
            );
        }
        let daysInMonth = [];
        for (let d = 1; d <= daysInMonth(); d++) {
            daysInMonth.push(
                <td key={d} className="calendar-day">
                    {d}
                </td>
            );
        }
        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];
        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row); // if index not equal 7 that means not go to next week
            } else {
                rows.push(cells); // when reach next week we contain all td in last week to rows 
                cells = []; // empty container 
                cells.push(row); // in current loop we still push current row to new container
            }
            if (i === totalSlots.length - 1) { // when end loop we add remain date
                rows.push(cells);
            }
        });
        let daysinmonth = rows.map((d, i) => {
            return <tr>{d}</tr>;
        });
        return (
            
            <div className='fullwidth'>
                {console.log(weekdayshort)}
                <h2>Calendar</h2>
                {
                    <table className="calendar-day">
                        <thead>
                            <tr>{this.weekdayshortname}</tr>
                        </thead>
                        <tbody>{daysinmonth}</tbody>
                    </table>
                    
                }
            </div>

        )
    }

}


export default Calendar;
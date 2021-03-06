jQuery(function($) {
    export  let allStatistics = [], complexStatistics = [], lastNames = [];
    export  let monthGlobal, yearGlobal;

 export function deleteCharts() {
    let child;
    let monthInf = $('#monthInf')[0];
    let commonInf = $('#commonInf')[0];
    child= monthInf.firstElementChild;

    while(child){
        if(child.firstElementChild) {
            child.removeChild(child.firstElementChild);
        }
        child =child.nextElementSibling;
    }
    child= commonInf.firstElementChild;
    while(child){
        if(child.firstElementChild) {
            child.removeChild(child.firstElementChild);
        }
        child =child.nextElementSibling;
    }

}
 export function generateLastNames(complexStatistics) {
    let lastNames=[];
    Object.keys(complexStatistics).forEach(function (element, index) {
        if(element.split('_')[1]==="STATISTICS"){
            let monthStatistics =complexStatistics[element];
            Object.keys(monthStatistics).forEach(function (worker, index) {
                lastNames.push(monthStatistics[worker]['last_name']);
            });
        }


    });
    lastNames = (function (arr) { //select unique names
        let obj = {};

        for (let i = 0; i < arr.length; i++) {
            let str = arr[i];
            obj[str] = true; // запомнить строку в виде свойства объекта
        }

        return Object.keys(obj);
    })(lastNames);
    return lastNames;

}
export function autocomplete(lastNames) {


    $( "#tags" ).autocomplete({
        source: lastNames
    });
}
 export function dateToString(month, year) {
    switch (month){

        case 1 : monthGlobal = "January"; break;
        case 2 : monthGlobal = "February"; break;
        case 3 : monthGlobal = "March"; break;
        case 4 : monthGlobal = "April"; break;
        case 5 : monthGlobal = "May"; break;
        case 6 : monthGlobal = "June"; break;
        case 7 : monthGlobal = "July"; break;
        case 8 : monthGlobal = "August"; break;
        case 9 : monthGlobal = "September"; break;
        case 10 : monthGlobal = "October"; break;
        case 11 : monthGlobal = "November"; break;
        case 12 : monthGlobal = "December";

    }
    return `${monthGlobal}_${year}`;

}
export function calculateIncrement(now, last, mode=0) {
    if(last==='н/д'){
        return last
    }
    if(mode===0){
        return ((now-last)/last*100).toFixed(2)+" %";
    }
    return (now-last).toFixed(2)+" %";

}
 export function addCells(row, cells) {
    for (let j = 0; j < cells.length; j++) {
        let cell = document.createElement('td');
        cell.textContent = cells[j];
        if(cells[j][(cells[j].length)-1]==="%"){
            if(cells[j][0]==="-"){
                $(cell).addClass('minus');
            }
            else if(cells[j][0]===("0" || "н")){
                //не менять цвет
            }
            else
                $(cell).addClass('plus');
        }
        row.appendChild(cell);
    }
    return row;

}
export function getAvg(grades) {
    return  (grades.reduce(function (p, c) {
        return p + c;
    }) / grades.length).toFixed(2);
}
 export function getSum(grades) {
    return grades.reduce(function(p,c){
        return p+c;
    });
}
export function selectStatistics(departments) {
    let tempStatistics = {};
    let idOfWorkersFromDepartment =[];
    let date = new Date();
    let currentMonthTableName = `U_STATISTICS_${dateToString(date.getMonth()+1, date.getFullYear())}`;

    //пойчаем айди актуальных сотрудников принадлежащих к департаменту
    Object.keys(allStatistics[currentMonthTableName]).forEach(function (id, index) {
        if(departments.indexOf(Number(allStatistics[currentMonthTableName][id]['department']))!==-1){
            idOfWorkersFromDepartment.push(id);
        }
    });

    //вытаскиваем их статистику
    Object.keys(allStatistics).forEach(function (element, index) {

        if (element.split('_')[1] === "STATISTICS") {
            let monthStatistics = allStatistics[element];
            tempStatistics[element]={};
            Object.keys(monthStatistics).forEach(function (worker, index) {
                if(idOfWorkersFromDepartment.indexOf(worker)!==-1){
                    tempStatistics[element][worker]={};
                    for(let key in monthStatistics[Number(worker)]){
                        let value = monthStatistics[Number(worker)][key];
                        tempStatistics[element][worker][key]=value;
                    }
                }
            });
        }
        else{
            tempStatistics[element]=allStatistics[element];
        }
    });
    return tempStatistics;


}
export function paintLineChart(container, title, categories, yText, series) {
    Highcharts.chart(container, {
        chart: {
            type: 'line'
        },
        title: {
            text: title
        },

        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: yText
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: series
    });
}
export function makeWorkersCharts(lastName, complexStatistics) {
    let namesOfColumns=[], leadCount =[], dealCount =[], invoiceCount=[],  done=[],conversion=[], finalConversion=[], acceptance=[], averageCheck=[], plan=[], percent=[], selfBonus=[];
    Object.keys(complexStatistics).forEach(function (element, index) {

        if(element.split('_')[1]==="STATISTICS"){
            let monthStatistics =complexStatistics[element];
            Object.keys(monthStatistics).forEach(function (worker, index) {
                if(monthStatistics[worker]['last_name']===lastName){
                    leadCount.push(monthStatistics[worker]['leadCount']);
                    dealCount.push(monthStatistics[worker]['dealCount']);
                    invoiceCount.push(monthStatistics[worker]['invoiceCount']);
                    plan.push(monthStatistics[worker]['plan']);
                    done.push(monthStatistics[worker]['done']);
                    percent.push(monthStatistics[worker]['percent']);
                    conversion.push(monthStatistics[worker]['conversion']);
                    finalConversion.push(monthStatistics[worker]['finalConversion']);
                    acceptance.push(monthStatistics[worker]['acceptance']);
                    averageCheck.push(monthStatistics[worker]['averageCheck']);
                    selfBonus.push(monthStatistics[worker]['selfBonus']);
                    namesOfColumns.push(element.split('_')[2]+', '+element.split('_')[3]);
                }

            });

        }
    });
    let balance = (plan[done.length-1] - done[done.length-1])>=0 ? (plan[done.length-1]-done[done.length-1]) : 0;

    paintLineChart('cont4',"План, сумма закрытых сделок и личный бонус сотрудника по месяцам", namesOfColumns, "Сумма в рублях", [{name:"План", data:plan}, {name:"Личный бонус", data:selfBonus}, {name:"Выполнено", data:done}]);
    paintLineChart('cont5', "Выполнение плана в процентах по месяцам", namesOfColumns, "в %", [{name:"Процент выполнения плана", data: percent},]);
    paintLineChart("cont6","Средний чек сотрудника по месяцам",namesOfColumns,"Средний чек в рублях",[{name:"Средний чек", data:averageCheck}]);
    paintLineChart('cont7', "Общее количество лидов по месяцам", namesOfColumns, "Количество",
        [{name: 'Лиды', data:leadCount}]);
    paintLineChart('cont8', "Общее количество сделок, счетов по месяцам", namesOfColumns, "Количество",
        [{name: 'Сделки', data:dealCount},{name: 'Счета', data:invoiceCount}]);

    paintLineChart("cont9", "Конверсия по месяцам", namesOfColumns, "показатели в %", [{name:'Конверсия(сделки/лиды)', data:conversion}, {name:"счета/лиды", data:finalConversion}]);
    paintLineChart("cont10", "Акцептация по месяцам", namesOfColumns, "показатели в %", [{name:"Акцептация(счета/сделки)", data:acceptance}]);
    // круговая диаграмма выполнения плана за послений месяц сотрудника.....
    Highcharts.chart('cont1', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: "Выполнение личного плана за "+namesOfColumns[namesOfColumns.length-1]+"("+plan[plan.length-1]+" р.)"
        },
        tooltip: {
            pointFormat: '{point.percentage:.1f}%'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: на {point.y:.1f} р',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            colorByPoint: true,
            data: [{
                name: 'Выполнено',
                y: done[done.length-1],
                sliced: true,
                selected: true
            },
                {
                    name: 'Осталось',
                    y: balance,

                }
            ]
        }]
    });

}
export function makeMonthGeneralTable(currentMonthStatistics, lastMonthStatistics) {

    let table = document.createElement('table');
    table.setAttribute('id', 'commonTable');
    $(table).html("<thead>\n" +
        "\t<tr>\n" +
        "\t\t<th ROWSPAN=\"2\">Фамилии</th>\n" +
        "\t\t<th colspan=\"2\">Кол-о лидов</th>\n" +
        "\t\t<th colspan=\"2\">Кол-о сделок</th>\n" +
        "\t\t<th colspan=\"2\">Кол-о счетов</th>\n" +
        "\t\t<th colspan=\"2\">План</th>\n" +
        "\t\t<th colspan=\"2\">Выполнено</th>\n" +
        "\t\t<th colspan=\"2\">% выполнения плана</th>\n" +
        "\t\t<th colspan=\"2\">Средний чек</th>\n" +
        "\t\t<th colspan=\"2\">Конверсия(сделки/лиды) %</th>\n" +
        "\t\t<th colspan=\"2\">сделки/лиды (%)</th>\n" +
        "\t\t<th colspan=\"2\">Акцептация(счета/сделки) %</th>\n" +
        "\t\t<th>Личный бонус</th>\n" +
        "\t\t<th>Бонус от общего плана</th>\n" +
        "\n" +
        "\n" +
        "\t</tr>\n" +
        "\t<tr>\n" +
        "\t\t<th>Общ.</th>\n" +
        "\t\t<th>Прирост(%)</th>\n" +
        "\t\t<th>Общ.</th>\n" +
        "\t\t<th>Прирост(%)</th>\n" +
        "\t\t<th>Общ.</th>\n" +
        "\t\t<th>Прирост(%)</th>\n" +
        "\t\t<th>Общ.</th>\n" +
        "\t\t<th>Прирост(%)</th>\n" +
        "\t\t<th>Общ.</th>\n" +
        "\t\t<th>Прирост(%)</th>\n" +
        "\t\t<th>Общ.</th>\n" +
        "\t\t<th>Прирост(%)</th>\n" +
        "\t\t<th>Общ.</th>\n" +
        "\t\t<th>Прирост(%)</th>\n" +
        "\t\t<th>Общ.</th>\n" +
        "\t\t<th>Прирост(%)</th>\n" +
        "\t\t<th>Общ.</th>\n" +
        "\t\t<th>Прирост(%)</th>\n" +
        "\t\t<th>Общ.</th>\n" +
        "\t\t<th>Прирост(%)</th>\n" +
        "\t</tr>\n" +
        "\t</thead>")
    let tbody = document.createElement('tbody');

    Object.keys(currentMonthStatistics).forEach(function (element, index) {

        let {acceptance,averageCheck,commonBonus,conversion, dealCount,department,done,finalConversion,invoiceCount,
            last_name,leadCount,percent,plan, selfBonus} = currentMonthStatistics[element];

        if(typeof lastMonthStatistics[element] !== 'undefined' ) {
            const {
                acceptance: acceptancePr, averageCheck:averageCheckPr , commonBonus: commonBonusPr, conversion: conversionPr, dealCount: dealCountPr, department: departmentPr,
                done: donePr, finalConversion: finalConversionPr, invoiceCount: invoiceCountPr, last_name: last_namePr, leadCount: leadCountPr, percent: percentPr, plan: planPr, selfBonus: selfBonusPr
            } = lastMonthStatistics[element];
        }
        else{
            const acceptancePr ='н/д', averageCheckPr ='н/д' , commonBonusPr='н/д', conversionPr='н/д', dealCountPr='н/д',donePr='н/д', finalConversionPr='н/д',
                invoiceCountPr='н/д',leadCountPr='н/д',percentPr='н/д', planPr='н/д',selfBonusPr='н/д' ;
        }


        let row = document.createElement('tr');
        let cells = [last_name, leadCount, calculateIncrement(leadCount, leadCountPr), dealCount, calculateIncrement(dealCount, dealCountPr), invoiceCount, calculateIncrement(invoiceCount, invoiceCountPr),
            plan, calculateIncrement(plan, planPr), done, calculateIncrement(done, donePr), percent, calculateIncrement(percent, percentPr, 1), averageCheck, calculateIncrement(averageCheck, averageCheckPr),
            conversion, calculateIncrement(conversion, conversionPr,1), finalConversion, calculateIncrement(finalConversion, finalConversionPr, 1),acceptance, calculateIncrement(acceptance, acceptancePr,1),
            selfBonus, commonBonus];
        row = addCells(row, cells);
        tbody.appendChild(row);
        table.appendChild(tbody);
        document.querySelector("#commonTableWrapper").appendChild(table);
    });

}

export function makeCommonCharts(msg){
    let namesOfColumns = [], leadCountAvg =[], dealCountAvg =[], invoiceCountAvg=[], planAvg=[], doneAvg=[], percentAvg=[], conversionAvg=[],
        finalConversionAvg=[], acceptanceAvg=[], averageCheckAvg=[];
    Object.keys(msg).forEach(function (element, index) {
        let leadCount =[], dealCount =[], invoiceCount=[],  done=[],conversion=[], finalConversion=[], acceptance=[], averageCheck=[], plan;
        if(element.split('_')[1]==="STATISTICS"){
            let monthStatistics =msg[element];
            Object.keys(monthStatistics).forEach(function (worker, index) {
                leadCount.push(monthStatistics[worker]['leadCount']);
                dealCount.push(monthStatistics[worker]['dealCount']);
                invoiceCount.push(monthStatistics[worker]['invoiceCount']);
                done.push(monthStatistics[worker]['done']);
                conversion.push(monthStatistics[worker]['conversion']);
                finalConversion.push(monthStatistics[worker]['finalConversion']);
                acceptance.push(monthStatistics[worker]['acceptance']);
                averageCheck.push(monthStatistics[worker]['averageCheck']);
            });
            namesOfColumns.push(element.split('_')[2]+', '+element.split('_')[3]);
            leadCountAvg.push(getSum(leadCount));
            dealCountAvg.push(getSum(dealCount));
            invoiceCountAvg.push(getSum(invoiceCount));
            doneAvg.push(getSum(done));
            conversionAvg.push(Number(getAvg(conversion)));
            finalConversionAvg.push(Number(getAvg(finalConversion)));
            acceptanceAvg.push(Number(getAvg(acceptance)));
            averageCheckAvg.push(Number(getAvg(averageCheck)));
            plan = Number(msg["U_PLAN_"+element.split('_')[2]+'_'+element.split('_')[3]]);
            planAvg.push(plan);
            percentAvg.push(Number((getSum(done)/plan*100).toFixed(2)));

        }
    });

    paintLineChart('cont4',"План и сумма закрытых сделок по месяцам", namesOfColumns, "Сумма в рублях", [{name:"План", data:planAvg}, {name:"Выполнено", data:doneAvg}]);
    paintLineChart('cont5', "Выполнение плана в процентах по месяцам", namesOfColumns, "в %", [{name:"Процент выполнения плана", data: percentAvg},]);
    paintLineChart("cont6","Средний чек компании по месяцам",namesOfColumns,"Средний чек в рублях",[{name:"Средний чек", data:averageCheckAvg}]);
    paintLineChart('cont7', "Общее количество лидов по месяцам", namesOfColumns, "Количество",
        [{name: 'Лиды', data:leadCountAvg}]);
    paintLineChart('cont8', "Общее количество сделок, счетов по месяцам", namesOfColumns, "Количество",
        [{name: 'Сделки', data:dealCountAvg},{name: 'Счета', data:invoiceCountAvg},]);

    paintLineChart("cont9", "Конверсия по месяцам", namesOfColumns, "показатели в %", [{name:'Конверсия(сделки/лиды)', data:conversionAvg}, {name:"счета/лиды", data:finalConversionAvg}]);
    paintLineChart("cont10", "Акцептация по месяцам", namesOfColumns, "показатели в %", [{name:"Акцептация(счета/сделки)", data:acceptanceAvg}]);


}


export function makeMonthChart(data, month, year, commonPlan) {
    let nameOfChart = month + ',' + year;
    let lastNames = [], plan = [], percent = [], done = [];
    let dataToTable =[] ;
    Object.keys(data).forEach(function (element, index) {

        lastNames.push(data[element]['last_name']);
        percent.push(data[element]['percent']);
        plan.push(data[element]['plan']);
        done.push(data[element]['done']);
        dataToTable.push({"name": data[element]['last_name'], "y": data[element]['percent'], "plan" : data[element]['plan'], 'done':data[element]['done']  });
    });
    const commonDone = getSum(done);
    const commonBalance = (commonPlan-commonDone)>=0 ? (commonPlan-commonDone): 0 ;

    //столбиковая диаграмма



    Highcharts.chart('cont2', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Процент выполнения за '+nameOfChart
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Проценты выполнения плана'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: ' <p>План: {point.plan}р. </p><p> Выполнено: {point.done}р.</p>'
        },
        series: [{
            name: 'Фамилии',
            data: dataToTable,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
    // круговая диаграмма
    Highcharts.chart('cont1', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: "Выполнение общего плана за "+nameOfChart+"("+commonPlan+" р.)"
        },
        tooltip: {
            pointFormat: '{point.percentage:.1f}%'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: на {point.y:.1f} р',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            colorByPoint: true,
            data: [{
                name: 'Выполнено',
                y: commonDone,
                sliced: true,
                selected: true
            },
                {
                    name: 'Осталось',
                    y: commonBalance,

                }
            ]
        }]
    });


}
});
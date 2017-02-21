import {Component, View} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http'
import {TodoService} from './TodoService';
import Chart from 'chart.js';
import bootpag from 'bootpag/lib/jquery.bootpag.min.js';

class TodoComponent {
    constructor(todoService)
    {
        this.todos = [];
        this.todos_page = [];
        this.todoData = {
            date: '',
            price: '',
            persent: '',
            come: ''
        };
        this.page = 1;
        this.chartData = {
            labels: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
            datasets: [
                {
                    label: 'прибыль',
                    backgroundColor: "rgba(255, 51, 0, 0.4)",
                    borderColor: "rgba(255, 51, 0, 1)",
                    borderWidth: 2,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    label: 'приход',
                    backgroundColor: "rgba(0, 153, 0, 0.3)",
                    borderColor: "rgba(0, 153, 0, 1)",
                    borderWidth: 1,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    label: 'расход',
                    backgroundColor: "rgba(51, 51, 255, 0.2)",
                    borderColor: "rgba(51, 51, 255, 1)",
                    borderWidth: 1,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ]
        };

        this.todoService = todoService;

        this.todoService.getAllTodos()
                .subscribe((res) => {

                    this.convert(res);

                    console.log(this.todos);


                    var now = new Date();
                    var month = (now.getMonth() + 1);
                    var day = now.getDate();
                    if (month < 10)
                    {
                        month = "0" + month;
                    }
                    if (day < 10)
                    {
                        day = "0" + day;
                    }
                    var today = now.getFullYear() + '-' + month + '-' + day;
                    $('#datePicker').val(today);

                });
    }
    showChart()
    {

        var now = new Date();

        for (var it = 1; it <= 12; it++)
        {
            this.todos.forEach((item, i, todos) => {
                if ((item.date).substr(0, 4) == now.getFullYear())
                {
                    var mounth = it;
                    if (mounth < 10)
                    {
                        mounth = '0' + mounth;
                    }
                    if ((item.date).substr(5, 2) == mounth)
                    {
                        this.chartData.datasets[0].data[it-1] += Number(item.profit)|0;
                        this.chartData.datasets[1].data[it-1] += Number(item.income)|0;
                        this.chartData.datasets[2].data[it-1] += Number(item.outcome)|0;
                    }
                }
            }, this);
        }

        this.myChart = new Chart($("#myChart")[0].getContext('2d'), {
            type: 'line',
            data: this.chartData,
            options: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(0, 0, 0)',
                        fontSize: 14
                    }
                },
                scales: {
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        });
    }
    convert(res)
    {
        this.todos = [];
        res.forEach((item, i, res) => {
            this.todos.push({
                date: item.date,
                income: 0,
                outcome: 0,
                profit: 0
            });
            if (item.come == 'in')
            {
                this.todos[i].income = (Number(item.price)).toFixed(2);
            } else
            {
                this.todos[i].outcome = (Number(item.price)).toFixed(2);
            }
            this.todos[i].profit = (Number(item.price) / 100 * Number(item.persent)).toFixed(2);
        }, this);
        this.showChart();

        this.sortGrid('date');

        this.pageCount();
    }
    pageCount()
    {
        var total = 1;

        for (var i = 1; i <= this.todos.length; i++)
        {
            if (i % 15 == 0)
            {
                total += 1;
            }
        }

        if (total * 15 == this.todos.length)
        {
            total -= 1;
        }

        if (total == 0)
        {
            total = 1;
        }

        var that = this;
        $('#page-selection').bootpag({
            total: total,
            page: 1,
            maxVisible: 5,
            leaps: true,
            firstLastUse: true,
            first: '←',
            last: '→',
            wrapClass: 'pagination',
            activeClass: 'active',
            disabledClass: 'disabled',
            nextClass: 'next',
            prevClass: 'prev',
            lastClass: 'last',
            firstClass: 'first'
        }).on("page", function (event, num)
        {
            that.pageGridShow(num);
            that.page = num;
        });
    }
    pageGridShow(num)
    {
        this.todos_page = [];
        for (var i = ((num - 1) * 15); i < ((num - 1) * 15) + 15; i++)
        {
            if (this.todos.length >= i + 1)
            {
                this.todos_page.push(this.todos[i]);
            }
        }
    }
    sortGrid(type)
    {
        var arrSort = this.todos;
        this.todos = [];

        this.todos = this.sort_rarity(arrSort, type, $('#check_' + type)[0].checked);

        var arrCh = ['date', 'income', 'outcome', 'profit'];

        arrCh.forEach((item, index, arrCh) => {
            if (item != type)
            {
                $('#check_' + item)[0].checked = false;
            }
        });

        this.pageGridShow(this.page);
    }
    sort_rarity(A, type, order)
    {
        var n = A.length;
        for (var i = 0; i < n - 1; i++)
        {
            for (var j = 0; j < n - 1 - i; j++)
            {
                if (order == true)
                {
                    if (type == 'date')
                    {
                        var c = new Date(A[j + 1][type]);
                        var d = new Date(A[j][type]);

                        if (c < d)
                        {
                            var t = A[j + 1];
                            A[j + 1] = A[j];
                            A[j] = t;
                        }

                    } else
                    if (Number(A[j + 1][type]) < Number(A[j][type]))
                    {
                        var t = A[j + 1];
                        A[j + 1] = A[j];
                        A[j] = t;
                    }
                } else
                {
                    if (type == 'date')
                    {
                        var c = new Date(A[j + 1][type]);
                        var d = new Date(A[j][type]);

                        if (c > d)
                        {
                            var t = A[j + 1];
                            A[j + 1] = A[j];
                            A[j] = t;
                        }

                    } else
                    if (Number(A[j + 1][type]) > Number(A[j][type]))
                    {
                        var t = A[j + 1];
                        A[j + 1] = A[j];
                        A[j] = t;
                    }
                }
            }
        }
        return A;
    }
    createTodo()
    {
        this.todoService.postNewTodo(this.todoData)
                .subscribe((res) => {
                    this.convert(res);
                    this.todoData.date = '';
                    this.todoData.price = '';
                    this.todoData.persent = '';
                    this.todoData.come = '';
                });
    }
    deleteTodo(id)
    {
        this.todoService.deleteTodo(id)
                .subscribe((res) => {
                    this.todos = res;
                });
    }
    showNew()
    {
        $('#myModal').modal('show');
    }
    getTotal(param, todos)
    {
        var sum = 0;
        todos.forEach((item, i, todos) => {
            sum += Number(item[param]);
        }, sum);
        sum = sum.toFixed(2);
        return sum;
    }
}
;

TodoComponent.annotations = [
    new Component({
        selector: 'todo-app',
        providers: [TodoService, HTTP_PROVIDERS],
        templateUrl: 'templates/TodoComponent'
    })
];

TodoComponent.parameters = [[TodoService]];

export {TodoComponent};

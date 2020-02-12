import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employeeservice.service';
import { Router } from '@angular/router';
import { Employee } from '../entity/Employee';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html'
})
export class EmployeeListComponent implements OnInit {
  _listFilterBy: string;
  allEmployees: Employee[];
  filteredList: Employee[];

 
  constructor(private employeeService:EmployeeService, private router: Router) { }


  get listFilterBy(): string {
    return this._listFilterBy;
  }

 
  set listFilterBy(value: string) {
    this._listFilterBy = value;
    this.filteredList = this._listFilterBy ? this.performFilter(this._listFilterBy) : this.allEmployees;
  }

  performFilter(filterBy: string): Employee[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.allEmployees.filter((employee: Employee) => employee.firstname.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
     employee.lastname.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.allEmployees = this.employeeService.getAllEmployees();
    this.filteredList = this.allEmployees;
    this._listFilterBy = "";
  }

 
  addEmployee(){
    this.router.navigate(["AddEmployee"]);
  }

  refreshList(){
    this.allEmployees = this.employeeService.getAllEmployees();
    this.filteredList = this.allEmployees;
  }
}

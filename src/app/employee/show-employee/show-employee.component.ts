import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.scss'],
})
export class ShowEmployeeComponent implements OnInit {
  constructor(private service: SharedService) {}
  EmployeeList: any = [];
  ModalTitle: string = '';
  activeModalE: boolean = false;
  Employee: any;
  EmployeeFilter: any = [];

  ngOnInit(): void {
    this.refreshEmployeeList();
  }

  addClick() {
    this.Employee = {
      EmployeeId: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: '',
      PhotoFileName: '',
    };
    this.ModalTitle = 'Add Employee';
    this.activeModalE = true;
  }

  editClick(item: any) {
    this.Employee = item;
    this.ModalTitle = 'Edit Employee';
    this.activeModalE = true;
  }

  deleteClick(item: any) {
    if (confirm('Are You Sure ?')) {
      this.service.deleteEmployee(item.EmployeeId).subscribe((data) => {
        alert(data.toString());
        this.refreshEmployeeList();
      });
    }
  }

  closeClick() {
    this.activeModalE = false;
    this.refreshEmployeeList();
  }

  searchEmployee = (e: any) => {
    let Keyword = e.target.value;
    console.log(Keyword);
    this.EmployeeList = this.EmployeeFilter.filter((Employee: any) => {
      return (
        Employee.EmployeeId.toString()
          .trim()
          .toLowerCase()
          .includes(Keyword.toLowerCase()) ||
        Employee.EmployeeName.toString()
          .trim()
          .toLowerCase()
          .includes(Keyword.toLowerCase()) || 
        Employee.Department.toString()
          .trim()
          .toLowerCase()
          .includes(Keyword.toLowerCase()) ||
        Employee.DateOfJoining.toString()
          .trim()
          .toLowerCase()
          .includes(Keyword.toLowerCase()) ||
        Employee.PhotoFileName.toString()
          .trim()
          .toLowerCase()
          .includes(Keyword.toLowerCase())
      );
    });
  };

  refreshEmployeeList() {
    /* Phương thức subcribe này sẽ nhận được data bất đồng bộ */
    this.service.getEmployeesList().subscribe((data) => {
      this.EmployeeList = data;
      this.EmployeeFilter = data;
    });
  }
}

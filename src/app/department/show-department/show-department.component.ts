import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.scss'],
})
export class ShowDepartmentComponent implements OnInit {
  constructor(private service: SharedService) {}

  DepartmentList: any = [];
  ModalTitle: string = '';
  activeModal: boolean = false;
  department: any;
  DepartmentFilter: any = [];

  ngOnInit(): void {
    this.refreshDepartmentList();
  }

  addClick() {
    this.department = {
      DepartmentId: 0,
      DepartmentName: '',
    };
    this.ModalTitle = 'Add Department';
    this.activeModal = true;
  }

  editClick(item: any) {
    this.department = item;
    this.ModalTitle = 'Edit Department';
    this.activeModal = true;
  }

  deleteClick(item: any) {
    if (confirm('Are You Sure ?')) {
      this.service.deleteDepartment(item.DepartmentId).subscribe((data) => {
        alert(data.toString());
        this.refreshDepartmentList();
      });
    }
  }

  closeClick() {
    this.activeModal = false;
    this.refreshDepartmentList();
  }

  refreshDepartmentList() {
    /* Phương thức subcribe này sẽ nhận được data bất đồng bộ */
    this.service.getDepartmentList().subscribe((data) => {
      this.DepartmentList = data;
      this.DepartmentFilter = data;
      console.log(this.DepartmentFilter)
    });
  }

  searchDepartment = (e:any) => {
    let Keyword = e.target.value;
    console.log(Keyword);
    this.DepartmentList = this.DepartmentFilter.filter((Department:any)=>{
      return Department.DepartmentId.toString().trim().toLowerCase().includes(Keyword.toLowerCase()) || Department.DepartmentName.toString().trim().toLowerCase().includes(Keyword.toLowerCase())
    })
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss'],
})

export class AddEditEmployeeComponent implements OnInit {
  constructor(private service: SharedService) {}

  @Input() Employee: any;

  EmployeeId: string = '';
  EmployeeName: string = '';
  Department: string = '';
  DateOfJoining: string = '';
  PhotoFileName: string = '';
  PhotoFilePath: string = '';
  DepartmentList: any = [];

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList() {
    this.service.getAllDepartmentNames().subscribe((data: any) => {
      this.DepartmentList = data;
      console.log(this.DepartmentList)
      this.EmployeeId = this.Employee.EmployeeId;
      this.EmployeeName = this.Employee.EmployeeName;
      this.Department = this.Employee.Department;
      this.DateOfJoining = this.Employee.DateOfJoining;
      this.PhotoFileName = this.Employee.PhotoFileName;
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    });
  }

  addEmployee() {
    let val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };
    this.service.addEmployee(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  updateEmployee() {
    let val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };
    this.service.updateEmployee(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  uploadPhoto(event:any){
    let file = event.target.files[0];
    console.log(file);
    // Tạo đối tượng FormData
    const formData:FormData = new FormData();
    formData.append('uploadedFile',file,file.name);
    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName = data.toString();
      // Đường dẫn hình ảnh tải lên
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName
    })
  }
}

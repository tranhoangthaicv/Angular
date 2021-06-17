import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

{/* Xử lý bất đồng bộ  */}
import { Observable } from 'rxjs';

{/* Đánh dấu một đối tượng để đưa vào */}
@Injectable({
  /*Lưu trữ dữ liệu tham khảo */
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'http://127.0.0.1:8000';
  readonly PhotoUrl = 'http://127.0.0.1:8000/media/';
  constructor(private http:HttpClient) {}
  
  /* Thêm phương thức để dùng API từ Django */
  getDepartmentList(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/department');
  }

  addDepartment(val:any){
    return this.http.post(this.APIUrl + '/department/',val);
  }

  updateDepartment(val:any){
    return this.http.put(this.APIUrl + '/department/',val);
  }
  
  deleteDepartment(val:any){
    return this.http.delete(this.APIUrl + '/department/' + val);
  }

  getEmployeesList(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/employee');
  }

  addEmployee(val:any){
    return this.http.post(this.APIUrl + '/employee/',val);
  }

  updateEmployee(val:any){
    return this.http.put(this.APIUrl + '/employee/',val);
  }
  
  deleteEmployee(val:any){
    return this.http.delete(this.APIUrl + '/employee/' + val);
  }

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl + '/SaveFile', val);
  }

  getAllDepartmentNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/department/');
  }
}

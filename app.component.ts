import { Component } from '@angular/core';
import { DataService } from './data.service';
import { FormBuilder, FormGroup, NgForm, FormArray, Validators } from "@angular/forms";
import { formatDate } from "@angular/common";

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template:`<h1>Renuka<h1>`,
  
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {

  title = 'sample';

  cities: City[];
  BloodGroup: City;
  f: any;
  form: any;
  employee: any;
  employeeForm: any;
  showModal: boolean = false;
  employ: any;
  dataSaved: boolean = false;
  Id: any;
  pageSize = 5;
  pageEvent: any;
  length: any;
  pageSizeOptions: number[] = [5, 10, 15, 25];
  submitted: boolean = false;

  BloodGroups: City[] = [
    { name: 'A+ve', code: 'A+' },
    { name: 'B+ve', code: 'B+ve' },
    { name: 'AB+ve', code: 'AB+ve' },


  ];

  employees: any;
  Employees: any;
  InsurancDetailslist: any = [];
  model: any = {};
  ins: any;
  employeeDialog: boolean;
  active = true;


  constructor(private service: DataService,
    private formbuilder: FormBuilder) { }


  ngOnInit(): void {

    this.getInsurance();


  }
  close() {
    debugger;
    
    this.showModal = false;

  }
  clear() {
    debugger;
    this.model=[];

  }

  openDialog() {
    this.showModal = true;
      this.model=[];
  }


  getInsurance() {
    debugger;
    this.service.getemployees().subscribe(res => {
      this.Employees = res;

    });
  }


  getInsurancebyId(model) {
    debugger;
    this.model = model;
    this.model.DateOfBirth = formatDate(model.DateOfBirth, "yyyy-MM-dd", "en-US")
    this.showModal = true;
  
  }


  addData() {

    this.service.postEmployee(this.model).subscribe((res) => {
      this.Employees = res;
      // this.showModal=false;

      this.getInsurance();
    
    })
  }

 
  onSubmit1() {

    debugger
    this.submitted = true;

    this.addData();
    this.close();

  }


  //  onSubmit()
  //  {

  //      debugger;

  //      this.service.postEmployee(this.model).subscribe((resp) => {
  //        if (resp.IsSuccess) {

  //          // this.form.reset();

  //          this.showModal=false;
  //         this.getInsurance();

  //          }

  //        });
  //  }



  //  hideDialog() {
  //   this.employeeDialog = false;
  //  this.submitted = false;
  // }

  // openNew() {
  //   this.employee = {};
  //  this.submitted = false;
  //   this.employeeDialog = true;
  // }
  deleteInsurance(Id) {
    this.service.deleteInsById(Id).subscribe((res) => {
      confirm("  Are you sure you want to delete this ?")
      console.log(res);
      this.getInsurance()
    });
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  ValidateAlpha(evt: { which: any; keyCode: any; }): boolean {
    var keyCode = (evt.which) ? evt.which : evt.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)

      return false;
    return true;
  }
  // exportemployee: any;
  // exportExcel(): void {
  //   debugger
  //   this.service.postEmployee('/Employee/AllEmployeeForExcel').subscribe(result => {
  //     this.exportemployee = result;
  //     this.excelService.exportAsExcelFile(this.exportemployee, 'employee_data');

  //   });

}














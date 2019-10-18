import { Component, OnInit } from '@angular/core';
import { ModalService } from '../shared/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bodyText: string;
  addForm: any;
  gridApi;
  gridColumnApi;
  gridApiResult;
  gridColumnApiResult;
  rowCount = 0;
  constructor(private modalService: ModalService, private formBuilder: FormBuilder, private http: HttpClient) {

  }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      columnName: ['', Validators.required],
      columnType: ['', Validators.required],
      editable: ['', Validators.required]
    });
  }
  columnDefs = [
    { headerName: 'Column Name', field: 'columnName', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Column Type', field: 'columnType' },
    { headerName: 'Editable', field: 'editable' }
  ];

  rowData = [];
  defaultColDef: {
    enableRowGroup: true,
    enableValue: true,
    width: 100,
    sortable: true,
    resizable: true,
    filter: true,
    editable: true
  };
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  resultRowData = [];
  resultColumnDefs = [ ];

  onGridReadyResult(params){
    this.gridApiResult = params.api;
    this.gridColumnApiResult = params.columnApi;
  }
    openModal(id: string) {
      this.modalService.open(id);
    }

closeModal(id: string) {
  this.modalService.close(id);
}
get addFormControls(): any {
  return this.addForm['controls'];
}

onSubmit(id: string) {
  this.rowCount++;
  console.log(this.addForm.value);
  var newData = {
    id: 'r' + this.rowCount,
    columnName: this.addForm.value.columnName,
    columnType: this.addForm.value.columnType,
    editable: this.addForm.value.editable
  };
  this.gridApi.updateRowData({ add: [newData] });
  this.resultColumnDefs.push({ headerName: newData.columnName, field: newData.id });
  this.gridApiResult.setColumnDefs(this.resultColumnDefs);
  this.modalService.close(id);
}

delete (){
  var selectedRows = this.gridApi.getSelectedRows();
  this.gridApi.updateRowData({ remove: selectedRows });

}
}

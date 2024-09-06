import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  baseURL: string = "http://localhost:8888";

  constructor(private http: HttpClient) { }

  // get Request 
  getRecord(tableName: string) {
    return this.http.get(`${this.baseURL}/${tableName}`);
  }

  // delete Request
  deleteRecord(tableName: string,id:any){
    return this.http.delete(`${this.baseURL}/${tableName}/${id}`)
  }

  //post Request
  addRecord(tableName:string,data:any){
    return this.http.post(`${this.baseURL}/${tableName}`,data);

  }

  // make get request for single record
  getSingleRecord(tableName:string,id:any){
    return this.http.get(`${this.baseURL}/${tableName}/${id}`);
  }

  // put Request
  updatRecord(tableName:string,id:any,data:any){
    return this.http.put(`${this.baseURL}/${tableName}/${id}`,data);
  }
}

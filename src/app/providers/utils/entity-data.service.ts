import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export class EntityDataService <T> {
  constructor(protected httpClient: HttpClient, protected endPoint:string) {
  }
  public getAll$(): Observable<T> {
    return this.httpClient.get<T>(this.endPoint);
  }
  public getById$(id:number): Observable<T> {
    return this.httpClient.get<T>(`${this.endPoint}/${id}`);
  }
  public add$(entity:any): Observable<T> {
    return this.httpClient.post<T>(this.endPoint, entity);
  }
  public update$(id:number, entity:any): Observable<T> {
    return this.httpClient.put<T>(`${this.endPoint}/${id}`, entity);
  }
  public delete$(id:number): Observable<T> {
    return this.httpClient.delete<T>(`${this.endPoint}/${id}`);
  }
}

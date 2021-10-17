import { Injectable } from '@angular/core';
import { Person } from "./person.model";
import { PEOPLE } from "./mock-people";

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  getPeople(page: number, pageSize: number): Person[] {
    let startIdx = (page - 1) * pageSize;
    return PEOPLE.slice(startIdx, startIdx + pageSize);
  }
}

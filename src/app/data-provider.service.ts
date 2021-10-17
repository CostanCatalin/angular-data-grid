import { Injectable } from '@angular/core';
import { Person } from "./person.model";
import { PEOPLE } from "./mock-people";

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  getPeople(): Person[] {
    return PEOPLE;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Design } from '../models/design';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  private _designs: BehaviorSubject<Design[]>;

  private dataStore: {
    designs: Design[]
  }

  constructor(private http: HttpClient) {
    this.dataStore = { designs: [] };
    this._designs = new BehaviorSubject<Design[]>([]);
  }

  get designs(): Observable<Design[]> {
    return this._designs.asObservable();
  }
  
  designByName(slug: string) {
    return this.dataStore.designs.find(x => x.slug == slug);
  }

  loadAll() {
    const designsUrl = 'http://localhost:8081/api/designs/published'

    return this.http.get<Design[]>(designsUrl)
      .subscribe(data => {
        this.dataStore.designs = data;
        this._designs.next(Object.assign({}, this.dataStore).designs);
      }, error => {
        console.log("Failed to fetch designs");
      });
  }
}

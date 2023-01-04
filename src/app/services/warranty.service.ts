import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

export interface WarrantyInfo {
  status:
    | 'No Info'
    | 'Fetching Info'
    | 'In Warranty'
    | 'Out of Warranty'
    | 'Not Applicable';
  endDate: Date | null;
}

@Injectable({
  providedIn: 'root',
})
export class WarrantyService {
  private readonly randomNumberOfDaysFromNow = (upTo: number) =>
    Math.floor(Math.random() * upTo + 1) + 1 * 24 * 60 * 60 * 1000;

  private fakeWarrantyInfo: Array<WarrantyInfo> = [
    {
      status: 'In Warranty',
      endDate: new Date(Date.now() + this.randomNumberOfDaysFromNow(365)),
    },
    {
      status: 'Out of Warranty',
      endDate: new Date(Date.now() - this.randomNumberOfDaysFromNow(365)),
    },
    {
      status: 'Not Applicable',
      endDate: null,
    },
  ];

  public getWarrantyInfo(): Observable<WarrantyInfo> {
    const index = Math.floor(Math.random() * 3);
    const delayTimeInMs = Math.floor(Math.random() * 5000);
    console.log(`Index: ${index}, Delay: ${delayTimeInMs}ms`);

    return of(' ').pipe(
      delay(delayTimeInMs),
      map((_) => this.fakeWarrantyInfo[index]),
      tap((info) =>
        console.log(`Emitting warranty info: ${JSON.stringify(info)}`)
      )
    );
  }
}

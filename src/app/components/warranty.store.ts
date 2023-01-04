import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs/operators';

import { WarrantyInfo, WarrantyService } from '../services/warranty.service';

export interface WarrantyState {
  warrantyInfo: WarrantyInfo;
}

const initialState: WarrantyState = {
  warrantyInfo: {
    status: 'No Info',
    endDate: null,
  },
};

@Injectable()
export class WarrantyStore extends ComponentStore<WarrantyState> {
  public readonly warrantyInfo$ = this.select(
    ({ warrantyInfo }) => warrantyInfo
  );

  private readonly updateWarranyInfo = this.updater(
    (state, warrantyInfo: WarrantyInfo) => ({
      warrantyInfo: {
        ...warrantyInfo,
      },
    })
  );

  constructor(private readonly warrantyService: WarrantyService) {
    super(initialState);
    this.getWarrantyInfo();
  }

  public readonly getWarrantyInfo = this.effect((trigger$) => {
    return trigger$.pipe(
      tap(() =>
        this.updateWarranyInfo({
          ...initialState.warrantyInfo,
          status: 'Fetching Info',
        })
      ),
      switchMap(() =>
        this.warrantyService.getWarrantyInfo().pipe(
          tap((info) => console.log(`Receive info: ${JSON.stringify(info)}`)),
          tapResponse(
            (info: WarrantyInfo) => this.updateWarranyInfo(info),
            (err) => console.error('Error while retrieving info:', err)
          )
        )
      )
    );
  });
}


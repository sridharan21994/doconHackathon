import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class HopisService {
  private dataSource = {
    duration: ['1d', '2d', '3d', '4d', '5d', '6d', '1w', '10d', '2w', '15d', '3w', '4w'],
    durationType: ['Days', 'Weeks'],
    durationUnit: { d: 1, w: 7 },
    severity: ['Mild', 'Moderate', 'Severe'],
    description: ['To rule out', 'Suspected', 'Follow up', '?']
  };

  private get ownerID(): string {
    return '555';
  }

  constructor(private http: HttpClient) {}

  // Service
  getHopis(id: any, next?: (value) => void, error?: (error) => void): void {
    id.ownerID = this.ownerID;
    this.http.get('emr/hopi', { params: id }).subscribe(next, error);
  }

  upsertHopi(hopi: any, next?: (value) => void, error?: (error) => void): void {
    hopi.ownerID = this.ownerID;
    if (hopi.hopiID && hopi.owner !== 'master') {
      this.http.put(`emr/hopi/${hopi.hopiID}`, hopi).subscribe(next, error);
    } else {
      hopi.owner = 'doctor';
      this.http.post('emr/hopi', hopi).subscribe(next, error);
    }
  }

  deleteHopi(hopi: any, next?: (value) => void, error?: (error) => void) {
    const params = { ownerID: this.ownerID };
    this.http.delete(`emr/hopi/${hopi.hopiID}`, { params }).subscribe(next, error);
  }

  getAllDurations(suggest: string = null): any[] {
    const types = _.keyBy(this.dataSource.durationType, el => el.charAt(0).toLowerCase());
    const result = _.map(this.dataSource.duration, dur => {
      const label = _.join(_.compact([parseInt(dur, 10), types[dur.charAt(dur.length - 1)]]), ' ');
      const value = parseInt(dur, 10) * this.dataSource.durationUnit[dur.charAt(dur.length - 1)] || 1;
      return { label, value };
    });
    if (suggest !== null) {
      if (+suggest && +suggest < 100) {
        const suggested = [{ label: `${parseInt(suggest, 10)} Days`, value: parseInt(suggest, 10) }];
        return _.differenceBy(suggested, result, 'value');
      } else {
        return [];
      }
    }
    return result;
  }

  get quickDurations(): any[] {
    return _(this.dataSource.duration)
      .map(dur => ({
        label: dur,
        value: parseInt(dur, 10) * this.dataSource.durationUnit[dur.charAt(dur.length - 1)] || 1
      }))
      .chunk(6)
      .filter(el => el.length === 6)
      .take(2)
      .value();
  }

  get severities(): any[] {
    return this.dataSource.severity;
  }

  get descriptions(): any[] {
    return this.dataSource.description;
  }
}

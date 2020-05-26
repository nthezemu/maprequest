import {Entity, model, property, hasMany} from '@loopback/repository';
import {Comment} from './comment.model';
import {MailingList} from './mailing-list.model';

@model()
export class MapRequest extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  uuid?: string;

  @property({
    type: 'number',
  })
  time_type?: number;

  @property({
    type: 'string',
  })
  requestor_name?: string;

  @property({
    type: 'string',
  })
  requestor_phone?: string;

  @property({
    type: 'string',
  })
  requestor_email?: string;

  @property({
    type: 'string',
  })
  organisation?: string;

  @property({
    type: 'string',
  })
  funding_agency?: string;

  @property({
    type: 'string',
  })
  project_code?: string;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'string',
  })
  region?: string;

  @property({
    type: 'string',
  })
  district?: string;

  @property({
    type: 'string',
  })
  details?: string;

  @property({
    type: 'string',
  })
  name_of_existing_map?: string;

  @property({
    type: 'string',
  })
  map_url?: string;

  @property({
    type: 'string',
  })
  existing_map_aoi?: string;

  @property({
    type: 'string',
  })
  existing_map_aoi_details?: string;

  @property({
    type: 'string',
  })
  new_map_aoi?: string;

  @property({
    type: 'string',
  })
  new_map_aoi_details?: string;

  @property({
    type: 'string',
  })
  geolocated_dataset_path?: string;

  @property({
    type: 'date',
  })
  date_requested?: string;

  @property({
    type: 'number',
  })
  printing_format?: number;

  @property({
    type: 'number',
  })
  delivery_format?: number;

  @property({
    type: 'number',
  })
  confidentiality_level?: number;

  @property({
    type: 'number',
  })
  available_thru_maha?: number;

  @property({
    type: 'number',
  })
  status?: number;

  @hasMany(() => Comment, {keyTo: 'map_request'})
  maprequestcomment: Comment[];

  @hasMany(() => MailingList, {keyTo: 'map_request'})
  maprequestmailinglist: MailingList[];

  constructor(data?: Partial<MapRequest>) {
    super(data);
  }
}

export interface MapRequestRelations {
  // describe navigational properties here
}

export type MapRequestWithRelations = MapRequest & MapRequestRelations;

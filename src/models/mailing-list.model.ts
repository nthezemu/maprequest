import {Entity, model, property, belongsTo} from '@loopback/repository';
import {MapRequest} from './map-request.model';

@model()
export class MailingList extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @belongsTo(() => MapRequest, {name: 'mailinglistmaprequest'})
  map_request: number;

  constructor(data?: Partial<MailingList>) {
    super(data);
  }
}

export interface MailingListRelations {
  // describe navigational properties here
}

export type MailingListWithRelations = MailingList & MailingListRelations;

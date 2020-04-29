import {Entity, model, property, belongsTo} from '@loopback/repository';
import {MapRequest} from './map-request.model';
import {User} from './user.model';

@model()
export class Comment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'date',
  })
  done_on?: string;

  @property({
    type: 'string',
  })
  details?: string;

  @belongsTo(() => MapRequest, {name: 'commentmaprequest'})
  map_request: number;

  @belongsTo(() => User, {name: 'commentuser'})
  author: number;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
}

export type CommentWithRelations = Comment & CommentRelations;

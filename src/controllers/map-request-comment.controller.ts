import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  MapRequest,
  Comment,
} from '../models';
import {MapRequestRepository} from '../repositories';

export class MapRequestCommentController {
  constructor(
    @repository(MapRequestRepository) protected mapRequestRepository: MapRequestRepository,
  ) { }

  @get('/map-requests/{id}/comments', {
    responses: {
      '200': {
        description: 'Array of MapRequest has many Comment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comment)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Comment>,
  ): Promise<Comment[]> {
    return this.mapRequestRepository.maprequestcomment(id).find(filter);
  }

  @post('/map-requests/{id}/comments', {
    responses: {
      '200': {
        description: 'MapRequest model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MapRequest.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {
            title: 'NewCommentInMapRequest',
            exclude: ['id'],
            optional: ['map_request']
          }),
        },
      },
    }) comment: Omit<Comment, 'id'>,
  ): Promise<Comment> {
    return this.mapRequestRepository.maprequestcomment(id).create(comment);
  }

  @patch('/map-requests/{id}/comments', {
    responses: {
      '200': {
        description: 'MapRequest.Comment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {partial: true}),
        },
      },
    })
    comment: Partial<Comment>,
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return this.mapRequestRepository.maprequestcomment(id).patch(comment, where);
  }

  @del('/map-requests/{id}/comments', {
    responses: {
      '200': {
        description: 'MapRequest.Comment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return this.mapRequestRepository.maprequestcomment(id).delete(where);
  }
}

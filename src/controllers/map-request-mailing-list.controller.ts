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
  MailingList,
} from '../models';
import {MapRequestRepository} from '../repositories';

export class MapRequestMailingListController {
  constructor(
    @repository(MapRequestRepository) protected mapRequestRepository: MapRequestRepository,
  ) { }

  @get('/map-requests/{id}/mailing-lists', {
    responses: {
      '200': {
        description: 'Array of MapRequest has many MailingList',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MailingList)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MailingList>,
  ): Promise<MailingList[]> {
    return this.mapRequestRepository.maprequestmailinglist(id).find(filter);
  }

  @post('/map-requests/{id}/mailing-lists', {
    responses: {
      '200': {
        description: 'MapRequest model instance',
        content: {'application/json': {schema: getModelSchemaRef(MailingList)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof MapRequest.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MailingList, {
            title: 'NewMailingListInMapRequest',
            exclude: ['id'],
            optional: ['map_request']
          }),
        },
      },
    }) mailingList: Omit<MailingList, 'id'>,
  ): Promise<MailingList> {
    return this.mapRequestRepository.maprequestmailinglist(id).create(mailingList);
  }

  @patch('/map-requests/{id}/mailing-lists', {
    responses: {
      '200': {
        description: 'MapRequest.MailingList PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MailingList, {partial: true}),
        },
      },
    })
    mailingList: Partial<MailingList>,
    @param.query.object('where', getWhereSchemaFor(MailingList)) where?: Where<MailingList>,
  ): Promise<Count> {
    return this.mapRequestRepository.maprequestmailinglist(id).patch(mailingList, where);
  }

  @del('/map-requests/{id}/mailing-lists', {
    responses: {
      '200': {
        description: 'MapRequest.MailingList DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MailingList)) where?: Where<MailingList>,
  ): Promise<Count> {
    return this.mapRequestRepository.maprequestmailinglist(id).delete(where);
  }
}

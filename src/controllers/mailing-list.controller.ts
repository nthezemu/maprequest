import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {MailingList} from '../models';
import {MailingListRepository} from '../repositories';

export class MailingListController {
  constructor(
    @repository(MailingListRepository)
    public mailingListRepository : MailingListRepository,
  ) {}

  @post('/mailing-lists', {
    responses: {
      '200': {
        description: 'MailingList model instance',
        content: {'application/json': {schema: getModelSchemaRef(MailingList)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MailingList, {
            title: 'NewMailingList',
            exclude: ['id'],
          }),
        },
      },
    })
    mailingList: Omit<MailingList, 'id'>,
  ): Promise<MailingList> {
    return this.mailingListRepository.create(mailingList);
  }

  @get('/mailing-lists/count', {
    responses: {
      '200': {
        description: 'MailingList model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(MailingList) where?: Where<MailingList>,
  ): Promise<Count> {
    return this.mailingListRepository.count(where);
  }

  @get('/mailing-lists', {
    responses: {
      '200': {
        description: 'Array of MailingList model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MailingList, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MailingList) filter?: Filter<MailingList>,
  ): Promise<MailingList[]> {
    return this.mailingListRepository.find(filter);
  }

  @patch('/mailing-lists', {
    responses: {
      '200': {
        description: 'MailingList PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MailingList, {partial: true}),
        },
      },
    })
    mailingList: MailingList,
    @param.where(MailingList) where?: Where<MailingList>,
  ): Promise<Count> {
    return this.mailingListRepository.updateAll(mailingList, where);
  }

  @get('/mailing-lists/{id}', {
    responses: {
      '200': {
        description: 'MailingList model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MailingList, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MailingList, {exclude: 'where'}) filter?: FilterExcludingWhere<MailingList>
  ): Promise<MailingList> {
    return this.mailingListRepository.findById(id, filter);
  }

  @patch('/mailing-lists/{id}', {
    responses: {
      '204': {
        description: 'MailingList PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MailingList, {partial: true}),
        },
      },
    })
    mailingList: MailingList,
  ): Promise<void> {
    await this.mailingListRepository.updateById(id, mailingList);
  }

  @put('/mailing-lists/{id}', {
    responses: {
      '204': {
        description: 'MailingList PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mailingList: MailingList,
  ): Promise<void> {
    await this.mailingListRepository.replaceById(id, mailingList);
  }

  @del('/mailing-lists/{id}', {
    responses: {
      '204': {
        description: 'MailingList DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mailingListRepository.deleteById(id);
  }
}

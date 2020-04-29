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
import {MapRequest} from '../models';
import {MapRequestRepository} from '../repositories';

export class MapRequestController {
  constructor(
    @repository(MapRequestRepository)
    public mapRequestRepository : MapRequestRepository,
  ) {}

  @post('/map-requests', {
    responses: {
      '200': {
        description: 'MapRequest model instance',
        content: {'application/json': {schema: getModelSchemaRef(MapRequest)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MapRequest, {
            title: 'NewMapRequest',
            exclude: ['id'],
          }),
        },
      },
    })
    mapRequest: Omit<MapRequest, 'id'>,
  ): Promise<MapRequest> {
    return this.mapRequestRepository.create(mapRequest);
  }

  @get('/map-requests/count', {
    responses: {
      '200': {
        description: 'MapRequest model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(MapRequest) where?: Where<MapRequest>,
  ): Promise<Count> {
    return this.mapRequestRepository.count(where);
  }

  @get('/map-requests', {
    responses: {
      '200': {
        description: 'Array of MapRequest model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MapRequest, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MapRequest) filter?: Filter<MapRequest>,
  ): Promise<MapRequest[]> {
    return this.mapRequestRepository.find(filter);
  }

  @patch('/map-requests', {
    responses: {
      '200': {
        description: 'MapRequest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MapRequest, {partial: true}),
        },
      },
    })
    mapRequest: MapRequest,
    @param.where(MapRequest) where?: Where<MapRequest>,
  ): Promise<Count> {
    return this.mapRequestRepository.updateAll(mapRequest, where);
  }

  @get('/map-requests/{id}', {
    responses: {
      '200': {
        description: 'MapRequest model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MapRequest, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MapRequest, {exclude: 'where'}) filter?: FilterExcludingWhere<MapRequest>
  ): Promise<MapRequest> {
    return this.mapRequestRepository.findById(id, filter);
  }

  @patch('/map-requests/{id}', {
    responses: {
      '204': {
        description: 'MapRequest PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MapRequest, {partial: true}),
        },
      },
    })
    mapRequest: MapRequest,
  ): Promise<void> {
    await this.mapRequestRepository.updateById(id, mapRequest);
  }

  @put('/map-requests/{id}', {
    responses: {
      '204': {
        description: 'MapRequest PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mapRequest: MapRequest,
  ): Promise<void> {
    await this.mapRequestRepository.replaceById(id, mapRequest);
  }

  @del('/map-requests/{id}', {
    responses: {
      '204': {
        description: 'MapRequest DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mapRequestRepository.deleteById(id);
  }
}

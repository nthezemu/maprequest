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
  User,
  Comment,
} from '../models';
import {UserRepository} from '../repositories';

export class UserCommentController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/comments', {
    responses: {
      '200': {
        description: 'Array of User has many Comment',
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
    return this.userRepository.usercomment(id).find(filter);
  }

  @post('/users/{id}/comments', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {
            title: 'NewCommentInUser',
            exclude: ['id'],
            optional: ['author']
          }),
        },
      },
    }) comment: Omit<Comment, 'id'>,
  ): Promise<Comment> {
    return this.userRepository.usercomment(id).create(comment);
  }

  @patch('/users/{id}/comments', {
    responses: {
      '200': {
        description: 'User.Comment PATCH success count',
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
    return this.userRepository.usercomment(id).patch(comment, where);
  }

  @del('/users/{id}/comments', {
    responses: {
      '200': {
        description: 'User.Comment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return this.userRepository.usercomment(id).delete(where);
  }
}

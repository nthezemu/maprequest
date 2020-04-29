import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Comment, CommentRelations, MapRequest, User} from '../models';
import {InfileDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MapRequestRepository} from './map-request.repository';
import {UserRepository} from './user.repository';

export class CommentRepository extends DefaultCrudRepository<
  Comment,
  typeof Comment.prototype.id,
  CommentRelations
> {

  public readonly commentmaprequest: BelongsToAccessor<MapRequest, typeof Comment.prototype.id>;

  public readonly commentuser: BelongsToAccessor<User, typeof Comment.prototype.id>;

  constructor(
    @inject('datasources.infile_db') dataSource: InfileDbDataSource, @repository.getter('MapRequestRepository') protected mapRequestRepositoryGetter: Getter<MapRequestRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Comment, dataSource);
    this.commentuser = this.createBelongsToAccessorFor('commentuser', userRepositoryGetter,);
    this.registerInclusionResolver('commentuser', this.commentuser.inclusionResolver);
    this.commentmaprequest = this.createBelongsToAccessorFor('commentmaprequest', mapRequestRepositoryGetter,);
    this.registerInclusionResolver('commentmaprequest', this.commentmaprequest.inclusionResolver);
  }
}

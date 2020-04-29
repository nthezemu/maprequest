import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, Comment} from '../models';
import {InfileDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CommentRepository} from './comment.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly usercomment: HasManyRepositoryFactory<Comment, typeof User.prototype.id>;

  constructor(
    @inject('datasources.infile_db') dataSource: InfileDbDataSource, @repository.getter('CommentRepository') protected commentRepositoryGetter: Getter<CommentRepository>,
  ) {
    super(User, dataSource);
    this.usercomment = this.createHasManyRepositoryFactoryFor('usercomment', commentRepositoryGetter,);
    this.registerInclusionResolver('usercomment', this.usercomment.inclusionResolver);
  }
}

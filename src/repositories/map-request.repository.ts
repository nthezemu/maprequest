import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MapRequest, MapRequestRelations, Comment, MailingList} from '../models';
import {InfileDbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CommentRepository} from './comment.repository';
import {MailingListRepository} from './mailing-list.repository';

export class MapRequestRepository extends DefaultCrudRepository<
  MapRequest,
  typeof MapRequest.prototype.id,
  MapRequestRelations
> {

  public readonly maprequestcomment: HasManyRepositoryFactory<Comment, typeof MapRequest.prototype.id>;

  public readonly maprequestmailinglist: HasManyRepositoryFactory<MailingList, typeof MapRequest.prototype.id>;

  constructor(
    @inject('datasources.infile_db') dataSource: InfileDbDataSource, @repository.getter('CommentRepository') protected commentRepositoryGetter: Getter<CommentRepository>, @repository.getter('MailingListRepository') protected mailingListRepositoryGetter: Getter<MailingListRepository>,
  ) {
    super(MapRequest, dataSource);
    this.maprequestmailinglist = this.createHasManyRepositoryFactoryFor('maprequestmailinglist', mailingListRepositoryGetter,);
    this.registerInclusionResolver('maprequestmailinglist', this.maprequestmailinglist.inclusionResolver);
    this.maprequestcomment = this.createHasManyRepositoryFactoryFor('maprequestcomment', commentRepositoryGetter,);
    this.registerInclusionResolver('maprequestcomment', this.maprequestcomment.inclusionResolver);
  }
}

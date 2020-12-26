import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from "@loopback/repository";
import { MailingList, MailingListRelations, MapRequest } from "../models";
import { MysqlDsDataSource } from "../datasources";
import { inject, Getter } from "@loopback/core";
import { MapRequestRepository } from "./map-request.repository";

export class MailingListRepository extends DefaultCrudRepository<
  MailingList,
  typeof MailingList.prototype.id,
  MailingListRelations
> {
  public readonly mailinglistmaprequest: BelongsToAccessor<
    MapRequest,
    typeof MailingList.prototype.id
  >;

  constructor(
    @inject("datasources.mysqlDs") dataSource: MysqlDsDataSource,
    @repository.getter("MapRequestRepository")
    protected mapRequestRepositoryGetter: Getter<MapRequestRepository>
  ) {
    super(MailingList, dataSource);
    this.mailinglistmaprequest = this.createBelongsToAccessorFor(
      "mailinglistmaprequest",
      mapRequestRepositoryGetter
    );
    this.registerInclusionResolver(
      "mailinglistmaprequest",
      this.mailinglistmaprequest.inclusionResolver
    );
  }
}

import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { RecentSearchInterceptor } from "../interceptors/recent-search.interceptor";
import { JobsService } from "../services/jobs.service";
import { RecentSearchService } from "../services/recent-search.service";

@Controller("jobs")
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly recentSearchService: RecentSearchService
  ) {}

  @Get("search")
  @UseInterceptors(RecentSearchInterceptor)
  search(@Query("query") query: string) {
    return this.jobsService.search(query || "");
  }

  @Get("recent-search")
  public getRecentSearch(@Query("token") token: string) {
    return this.recentSearchService.find(token);
  }
}

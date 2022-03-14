// Global
import {
  GraphQLSitemapService,
  GraphQLSitemapServiceConfig,
  StaticPath,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { debug, getAppRootId } from '@sitecore-jss/sitecore-jss';
import { GetStaticPathsContext } from 'next';
// Config
import config from 'temp/config';

const queryError =
  'Valid value for rootItemId not provided and failed to auto-resolve app root item.';
const languageError = 'The list of languages cannot be empty';

// Describes the data for fetchStaticSitemap
export type StaticSitemapResult = {
  lastUpdated?: {
    value: string;
  };
  language: {
    name: string;
  };
  url: {
    path: string;
  };
};

export class ExtendedSitemapService extends GraphQLSitemapService {
  protected get query(): string {
    return /* GraphQL */ `
      query SitemapQuery(
        $rootItemId: String!
        $language: String!
        $pageSize: Int = 100
        $hasLayout: String = "true"
        $after: String
      ) {
        search(
          where: {
            AND: [
              { name: "_latestVersion", value: "true", operator: EQ }
              { name: "_path", value: $rootItemId, operator: CONTAINS }
              { name: "_language", value: $language }
              { name: "_hasLayout", value: $hasLayout }
            ]
          }
          first: $pageSize
          after: $after
        ) {
          total
          pageInfo {
            endCursor
            hasNext
          }
          results {
            ... on _BasePage {
              lastUpdated {
                value
              }
            }
            language {
              name
            }
            url {
              path
            }
          }
        }
      }
    `;
  }

  /**
   * This is our own custom implementation of JSS's fetchSitemap, where we are
   * fetching a flat list of all pages that are descendants of the specified root item and have a
   * version in the specified language(s).
   *
   * However, unlike the JSS SDK, this method is public and does not manipulate the data
   * before returning it, so that we can generate sitemaps.
   *
   * @param {string[]} languages Fetch pages that have versions in this language(s).
   * @returns {StaticSitemapResult[]} list of pages
   * @throws {RangeError} if the list of languages is empty.
   * @throws {Error} if the app root was not found for the specified site and language.
   */
  public async fetchStaticSitemap(languages: string[]): Promise<StaticSitemapResult[]> {
    if (!languages.length) {
      throw new RangeError(languageError);
    }

    // If the caller does not specify a root item ID, then we try to figure it out
    const rootItemId =
      this.options.rootItemId ||
      // @ts-ignore We want to use the graphQLClient method from the SDK even though
      // it's private, it really shouldn't be. We do not want to override this.
      (await getAppRootId(this.graphQLClient, this.options.siteName, languages[0]));

    if (!rootItemId) {
      throw new Error(queryError);
    }

    // Fetch paths using all locales
    const pages: StaticSitemapResult[] = await Promise.all(
      languages.map((language) => {
        debug.sitemap('fetching sitemap data for %s', language);
        // @ts-ignore We want to use the searchService method from the SDK even though
        // it's private, it really shouldn't be. We do not want to override this.
        return this.searchService
          .fetch(this.query, {
            rootItemId,
            language,
            pageSize: this.options.pageSize,
          })
          .then((results: StaticSitemapResult[]) => results);
      })
    );

    // merge promises results into single result
    return pages.flat().filter((x) => x.url && !x.url.path.endsWith(',-w-,')); //[...newLocal];
  }

  constructor(public options: GraphQLSitemapServiceConfig) {
    super(options);
  }
}

export class SitecoreSitemapFetcher {
  // @TODO: Get this from some config
  private GRAPHQL_ROOT_ITEM_ID = `{680BC5BA-187E-417D-A2DD-6026039DA325}`;

  private _graphqlSitemapService: ExtendedSitemapService;

  constructor() {
    this._graphqlSitemapService = new ExtendedSitemapService({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      /*
      The Sitemap Service needs a root item ID in order to fetch the list of pages for the current
      app. If your Sitecore instance only has 1 JSS App, you can specify the root item ID here;
      otherwise, the service will attempt to figure out the root item for the current JSS App using GraphQL and app name.
      rootItemId: '{GUID}'
      */
      rootItemId: this.GRAPHQL_ROOT_ITEM_ID,
    });
  }

  /**
   * Generates SitecoreSitemap for given mode (SSG)
   * @param {GetStaticPathsContext} context
   */
  async fetch(context?: GetStaticPathsContext): Promise<StaticPath[]> {
    const foundRoutes = await this._graphqlSitemapService.fetchSSGSitemap(context?.locales || []);
    // Ignore wildcard item
    return foundRoutes.filter((x) => !x.params.path.some((p) => p === ',-w-,'));
  }

  /**
   * Generates SitecoreSitemap for Sitemap.xml
   * @param {GetStaticPathsContext} context
   */
  async fetchForStaticSitemap(context?: GetStaticPathsContext): Promise<StaticSitemapResult[]> {
    return this._graphqlSitemapService.fetchStaticSitemap(context?.locales || []);
  }
}

export const sitemapFetcher = new SitecoreSitemapFetcher();

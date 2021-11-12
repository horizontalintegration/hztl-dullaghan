import type { DullahanCli } from './cli/dullahan-cli';
import type { MockPlaceholder } from './mock-placeholder/mock-placeholder';

export namespace Dullahan {
  export type Config = DullahanCli.Config & MockPlaceholder.Config & {};
}

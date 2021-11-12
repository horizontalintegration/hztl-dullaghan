// Interfaces
import type { Dullahan } from './dullahan';
// Config partials
import mockPlaceholder from './mock-placeholder/mock-placeholder.dullahan.config';
import scaffold from './cli/lib/scaffold/scaffold.dullahan.config';

const config: Dullahan.Config = {
  ...mockPlaceholder,
  ...scaffold,
};

export default config;

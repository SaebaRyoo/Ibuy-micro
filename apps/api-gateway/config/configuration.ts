import { registerAs } from '@nestjs/config';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';

export default registerAs('API_GATEWAY', () => getConfig());

export const getConfig = () => {
  const YAML_CONFIG_FILENAME = `${process.env.NODE_ENV || 'development'}.yaml`;

  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf-8'),
  ) as Record<string, any>;
};

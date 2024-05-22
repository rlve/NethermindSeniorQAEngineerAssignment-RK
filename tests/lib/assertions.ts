import Ajv from 'ajv';
import { BlockSchema } from './block-schema';

export function isHex(num: string) {
  const matchResult = num.match(/^0x[0-9a-f]+$/i);

  return Boolean(matchResult);
}

export function hasValidSchema(result: any) {
  const ajv = new Ajv();
  const validate = ajv.compile(BlockSchema);
  const valid = validate(result);

  if (!valid) console.log(validate.errors);

  return valid;
}

import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

import schema from './options.json';
//一个非常简单的loader
//将文件内容转为字符串输出到模块中
export default function rawLoader(source) {
  const options = getOptions(this);

  validateOptions(schema, options, {
    name: 'Raw Loader',
    baseDataPath: 'options',
  });
  // 将javascript对象转为字符串
  const json = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  const esModule =
    typeof options.esModule !== 'undefined' ? options.esModule : true;

  return `${esModule ? 'export default' : 'module.exports ='} ${json};`;
}

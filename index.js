// @ts-check
import { toVFile } from "to-vfile";

/**
 * @import { Plugin, Processor, Transformer } from "unified";
 */

/**
 * @template T
 * @typedef {(this: Processor, { markdownAST, markdownNode }: {markdownAST: any; markdownNode: any; }, options: T) => any} GatsbyRemarkPlugin
 */

/**
 * @template T
 * @param {Plugin} remarkPlugin
 * @returns {GatsbyRemarkPlugin<T>}
 */
function toGatsbyRemarkPlugin(remarkPlugin) {
  return function ({ markdownAST, markdownNode }, /** @type {T} */ options) {
    const file = toVFile(markdownNode.fileAbsolutePath);
    /** @type {Transformer | void} */
    const builtPlugin = remarkPlugin.call(this, options);

    if (builtPlugin instanceof Function) {
      return builtPlugin(markdownAST, file);
    }
  };
}

export default toGatsbyRemarkPlugin;

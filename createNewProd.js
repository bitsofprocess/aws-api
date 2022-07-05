"use strict";

module.exports.createNewProd = async (sourceItem, destItem, excludeKeys) => {
  let newItem = await {
    ...sourceItem,
  };

  for (let i = 0; i < excludeKeys.length; i++) {
    eval("newItem." + excludeKeys[i] + "=" + "destItem." + excludeKeys[i]);
  }

    return newItem;
  
};

module.exports = {
  findOne: async (collection, condition, selectAttribute) => {
    try {
      return collection.findOne({
        attributes: selectAttribute,
        where: condition,
      });
    } catch (err) {
      throw err;
    }
  },

  findAll: async (collection, selectAttribute, condition, order) => {
    try {
      return collection.findAll({
        attributes: selectAttribute,
        where: condition,
        order,
      });
    } catch (err) {
      throw err;
    }
  },

  create: async (collection, insertData) => {
    try {
      return collection.create(insertData);
    } catch (err) {
      throw err;
    }
  },

  update: async (collection, updateData, condition) => {
    try {
      return collection.update(updateData, {
        where: condition,
      });
    } catch (err) {
      throw err;
    }
  },

  destroy: async (collection, condition) => {
    try {
      return collection.destroy({
        where: condition,
      });
    } catch (err) {
      throw err;
    }
  },
};

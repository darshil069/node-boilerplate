const { GENDER_STATUS, ROLE_STATUS } = require('../utils/enums');

module.exports = (sequelize, Sequelize) => {
  const userModel = sequelize.define(
    'user',
    {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      phone_no: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM(
          GENDER_STATUS.MALE,
          GENDER_STATUS.FEMALE,
          GENDER_STATUS.OTHER,
        ),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM(ROLE_STATUS.ADMIN, ROLE_STATUS.CUSTOMER),
        default: ROLE_STATUS.CUSTOMER,
        allowNull: false,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN(1),
        allowNull: true,
        default: false,
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false },
  );
  return userModel;
};

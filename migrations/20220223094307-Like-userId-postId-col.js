'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.addColumn(
                'Likes',
                'userId',
                {
                    type: Sequelize.DataTypes.STRING,
                    reference: {
                        model: {
                            tableName: 'Users',
                            key: 'userId',
                        },
                    },
                },
                { transaction }
            );
            await queryInterface.addColumn(
                'Likes',
                'postId',
                {
                    type: Sequelize.DataTypes.INTEGER,
                    reference: {
                        model: {
                            tableName: 'Boards',
                            key: 'postId',
                        },
                    },
                },
                { transaction }
            );
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
    async down(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeColumn('Likes', 'userId', {
                transaction,
            });
            await queryInterface.removeColumn('Likes', 'postId', {
                transaction,
            });
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
};

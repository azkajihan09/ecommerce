'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        const result = await super.create(ctx);
        console.log('result', result);
        const midtransClient = require('midtrans-client');
        // Create Snap API instance
        let snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: 'SB-Mid-server-4Nfy_mltEtT3ZfE7v5gavo-m',
            clientKey: 'SB-Mid-client-fMyB50Ym9EfswgGi'
        });

        let parameter = {
            "transaction_details": {
                "order_id": result.data.id,
                "gross_amount": result.data.attributes.totalPrice
            }, "credit_card": {
                "secure": true
            }
        };


        let response = await snap.createTransaction(parameter)
        return response;
    }
}));

import { DefaultJobQueuePlugin, DefaultSearchPlugin, VendureConfig } from '@vendure/core';
import { AssetsPlugin } from './assets';
import { AdminUiPlugin } from './admin';
import { EmailPlugin } from './email';
import { CoinbasePlugin } from '@pinelab/vendure-plugin-coinbase';
import { StripePlugin } from '@vendure/payments-plugin/package/stripe';
export const plugins: VendureConfig['plugins'] = [
    AssetsPlugin,
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    EmailPlugin,
    AdminUiPlugin,
    StripePlugin.init({
        // This prevents different customers from using the same PaymentIntent
        storeCustomersInStripe: true,
    }),
    CoinbasePlugin,
];

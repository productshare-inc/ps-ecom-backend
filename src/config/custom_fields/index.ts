import { CustomFields, LanguageCode } from "@vendure/core";

export const customFields: CustomFields = {
    Customer: [
        {
            name: "linkedAccounts",
            type: "text",
            nullable: true,
            readonly: true,
            label: [{
                languageCode: LanguageCode.en,
                value: "Linked accounts"
            }],
            ui: { component: 'json-editor-form-input' },
        },
        {
            name: "privy_id",
            type: "text",
            nullable: true,
            readonly: true,
            unique: true,
            // label: [{
            //     languageCode: LanguageCode.en,
            //     value: "privy_id"
            // }],
            ui: { component: 'json-editor-form-input' }
        }
    ]
}
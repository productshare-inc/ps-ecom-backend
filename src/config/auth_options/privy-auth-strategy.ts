import {
  AuthenticationStrategy,
  CustomerService,
  UserService,
  ExternalAuthenticationService,
  Injector,
  RequestContext,
  User,
} from "@vendure/core";
import { PrivyClient } from "@privy-io/server-auth";
import { DocumentNode } from "@apollo/client";
import gql from "graphql-tag";

export type PrivyAuthData = {
  privyIdToken: string;
};

export class PrivyAuthenticationStrategy
  implements AuthenticationStrategy<PrivyAuthData>
{
  readonly name = "privy";
  private client: PrivyClient;
  private externalAuthenticationService: ExternalAuthenticationService;
  private customerService: CustomerService;
  private userService: UserService;

  constructor(
    private appId: string,
    private appSecret: string,
  ) {
    // The clientId is obtained by creating a new OAuth client ID as described
    // in the Google guide linked above.
    this.client = new PrivyClient(this.appId, this.appSecret);
  }

  init(injector: Injector) {
    // The ExternalAuthenticationService is a helper service which encapsulates much
    // of the common functionality related to dealing with external authentication
    // providers.
    this.externalAuthenticationService = injector.get(
      ExternalAuthenticationService,
    );
    this.customerService = injector.get(CustomerService);
    this.userService = injector.get(UserService);
  }

  defineInputType(): DocumentNode {
    // Here we define the expected input object expected by the `authenticate` mutation
    // under the "google" key.
    return gql`
      input PrivyAuthInput {
        privyIdToken: String!
      }
    `;
  }

  async authenticate(
    ctx: RequestContext,
    data: PrivyAuthData,
  ): Promise<User | false> {
    const users = await this.client.getUsers();
    console.log("authenticate is running"); //, users);
    const privyUser = await this.client.getUserById(data.privyIdToken);
    console.log("privyUser", privyUser);
    //const email = (privyUser.linkedAccounts?.[0] as any)?.address;
    const email = privyUser.email ? privyUser.email.address : "undefined";
    if (!privyUser || !privyUser.id) {
      return false;
    }

    const vendureUser =
      await this.externalAuthenticationService.findCustomerUser(
        ctx,
        this.name,
        privyUser.id,
      );
    if (vendureUser) {
      console.log("vendureUser", vendureUser);
      let customer = await this.customerService.findOneByUserId(
        ctx,
        vendureUser.id,
      );
      console.log("Customer", customer);

      if (customer && customer.emailAddress !== email) {
        console.log("updating customer email address to:", email);
        await this.customerService.update(ctx, {
          id: customer.id,
          emailAddress: email,
          customFields: {
            linkedAccounts: JSON.stringify(privyUser.linkedAccounts, null, 2),
            privy_id: privyUser.id,
          },
        });
      }
      return vendureUser;
    }
    const user = await this.externalAuthenticationService.createCustomerAndUser(
      ctx,
      {
        strategy: this.name,
        externalIdentifier: privyUser.id,
        verified: !privyUser.isGuest,
        emailAddress: email,
        firstName: "",
        lastName: "",
      },
    );
    const customer = await this.customerService.findOneByUserId(ctx, user.id);
    if (customer) {
      await this.customerService.update(ctx, {
        id: customer.id,
        emailAddress: email,
        customFields: {
          linkedAccounts: JSON.stringify(privyUser.linkedAccounts, null, 2),
          privy_id: privyUser.id,
        },
      });
    }
    return user;
  }
}

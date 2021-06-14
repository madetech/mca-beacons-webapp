import axios, { AxiosResponse } from "axios";
import { IAccountHolderDetailsResponseBody } from "../lib/accountHolder/accountHolderDetailsResponseBody";
import { IAccountHolderIdResponseBody } from "../lib/accountHolder/accountHolderIdResponseBody";

export class AccountHolderApiGateway {
  private readonly apiUrl: string;
  private readonly accountHolderIdEndpoint = "account-holder/auth-id";
  private readonly accountHolderDetailsEndpoint = "account-holder";

  constructor() {
    this.apiUrl = process.env.API_URL;
  }

  public async getAccountHolderId(
    authId: string,
    accessToken: string
  ): Promise<string> {
    const url = `${this.apiUrl}/${this.accountHolderIdEndpoint}/${authId}`;
    try {
      const response = await axios.get<
        any,
        AxiosResponse<IAccountHolderIdResponseBody>
      >(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data.id;
    } catch (error) {
      /* eslint-disable no-console */
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  public async getAccountHolderDetails(
    accountHolderId: string,
    accessToken: string
  ): Promise<IAccountHolderDetailsResponseBody> {
    const url = `${this.apiUrl}/${this.accountHolderDetailsEndpoint}/${accountHolderId}`;
    try {
      const response = await axios.get<
        any,
        AxiosResponse<IAccountHolderDetailsResponseBody>
      >(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return response.data;
    } catch (error) {
      /* eslint-disable no-console */
      console.error(JSON.stringify(error));
      throw error;
    }
  }
}
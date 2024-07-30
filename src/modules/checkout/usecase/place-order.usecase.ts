import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../client-adm/facade/client-adm.facade.interface";
import { PlaceOderOutputDto, PlaceOrderInputDto } from "./place-order.dto";

export default class PlacerOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface;

  constructor(clientFacade: ClientAdmFacadeInterface) {
    this._clientFacade = clientFacade;
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOderOutputDto> {
    const client = await this._clientFacade.find({ id: input.clientId });
    if (!client) {
      throw new Error("Client not found");
    }

    await this.validateProducts(input);
    
    return {
      id: "",
      invoiceId: "",
      status: "",
      total: 0,
      products: [],
    };
  }
  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if (input.products.length === 0) {
      throw new Error("No products selected");
    }
  }
}

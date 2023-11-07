import UseCaseInterface from "../../../usecase/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UsecaseProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export default class ProductAdmFaca implements ProductAdmFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;

  constructor(usecasesProps: UsecaseProps) {
    this._addUseCase = usecasesProps.addUseCase;
    this._checkStockUseCase = usecasesProps.stockUseCase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this._addUseCase.execute(input);
  }

  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUseCase.execute(input);
  }
}

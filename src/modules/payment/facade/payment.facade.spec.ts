import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacade from "./payment.facade";
import PaymentFacadeFactory from "../factory/payment.facade.factory";

describe("PaymentFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a transaction", async () => {
    // const repository = new TransactionRepository();
    // const usecase = new ProcessPaymentUseCase(repository);
    // const facade = new PaymentFacade(usecase);

    const facade = PaymentFacadeFactory.create();

    const input = {
        orderId: "order-1",
        amount: 100
    }

    const ouput = await facade.process(input);

    expect(ouput.transactionId).toBeDefined();
    expect(ouput.orderId).toBe(input.orderId);
    expect(ouput.amount).toBe(input.amount);
    expect(ouput.status).toBe("approved");
  })
});

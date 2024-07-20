import Transaction from "../domain/transaction";

export default interface PaymentGatway {
  save(input: Transaction): Promise<Transaction>;
}

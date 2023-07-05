const anchor = require("@coral-xyz/anchor");
const assert = require("assert");

describe("mysolanaapp", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Mysolanaapp;

  it("shoudl be able initialize", async () => {
    const base_account = anchor.web3.Keypair.generate();
    await program.rpc.initialize({
      accounts: {
        baseAccount: base_account.publicKey,
        signer: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [base_account],
    });

    // fet base account
    const baseAccUpdate = await program.account.baseAccount.fetch(
      base_account.publicKey
    );
    assert.ok(baseAccUpdate.count.toString() === "0");
    _baseAccount = base_account;
    console.log("base account: ", baseAccUpdate);
  });

  it("should increase counter", async () => {
    let base_account = _baseAccount;
    await program.rpc.increaseNumber({
      accounts: {
        baseAccount: base_account.publicKey,
      },
    });

    const baseAccountIncreased = await program.account.baseAccount.fetch(
      base_account.publicKey
    );
    console.log("base account increased: ", baseAccountIncreased);
  });
});

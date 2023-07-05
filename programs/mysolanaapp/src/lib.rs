use anchor_lang::prelude::*;

declare_id!("72fJ18jk36MnJkwi1e1YkeUC7giAUU7UJ2DbzkXHMJBt");

#[program]
pub mod mysolanaapp {
    use super::*;

    pub fn initialize(ctx: Context<Create>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count = 0;
        Ok(())
    }

    pub fn increase_number(ctx: Context<Increment>) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        base_account.count += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = signer, space =16 + 16)]
    pub base_account: Account<'info, BaseAccount>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
    
}

#[account]
pub struct BaseAccount {
    pub count: u64,
}
impl BaseAccount {
    pub const SIZE: u32 = 8 + // Anchor discriminator
	8 ; // count - u64
}



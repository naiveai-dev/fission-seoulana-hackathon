use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount, Mint};

declare_id!("");

#[program]
pub mod fission_quest {
    use super::*;

    pub fn create_quest(
        ctx: Context<CreateQuest>,
        quest_id: String,
        title: String,
        description: String,
        reward_points: u32,
    ) -> Result<()> {
        let quest = &mut ctx.accounts.quest_account;
        let admin = &ctx.accounts.admin;

        if quest_id.len() > 50 {
            return Err(error!(ErrorCode::QuestIdTooLong));
        }

        quest.admin = admin.key();
        quest.quest_id = quest_id;
        quest.title = title;
        quest.description = description;
        quest.reward_points = reward_points;
        quest.is_active = true;
        quest.completion_count = 0;

        msg!("Quest created: {}", quest.quest_id);
        Ok(())
    }

    pub fn toggle_quest_status(ctx: Context<ToggleQuestStatus>) -> Result<()> {
        let quest = &mut ctx.accounts.quest_account;
        quest.is_active = !quest.is_active;

        msg!(
            "Quest status changed: {} - {}",
            quest.quest_id,
            if quest.is_active { "Activated" } else { "Deactivated" }
        );
        Ok(())
    }

    pub fn initialize_user_profile(ctx: Context<InitializeUserProfile>) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        let user = &ctx.accounts.user;

        user_profile.user = user.key();
        user_profile.total_points = 0;
        user_profile.completed_quests_count = 0;

        msg!("User profile initialized: {}", user.key());
        Ok(())
    }

    pub fn complete_quest(
        ctx: Context<CompleteQuest>,
        _user_quest_status_bump: u8,
    ) -> Result<()> {
        let quest = &mut ctx.accounts.quest_account;
        let user_profile = &mut ctx.accounts.user_profile;
        let user_quest_status = &mut ctx.accounts.user_quest_status;
        let user = &ctx.accounts.user;

        if !quest.is_active {
            return Err(error!(ErrorCode::QuestNotActive));
        }

        if user_quest_status.completed {
            return Err(error!(ErrorCode::QuestAlreadyCompleted));
        }

        user_quest_status.user = user.key();
        user_quest_status.quest_id = quest.quest_id.clone();
        user_quest_status.completed = true;
        user_quest_status.completed_at = Clock::get()?.unix_timestamp;

        user_profile.total_points += quest.reward_points;
        user_profile.completed_quests_count += 1;
        quest.completion_count += 1;

        msg!("Quest completed: {} by {}", quest.quest_id, user.key());
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(quest_id: String)]
pub struct CreateQuest<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        init,
        payer = admin,
        space = Quest::LEN,
        seeds = [b"quest", quest_id.as_bytes()],
        bump
    )]
    pub quest_account: Account<'info, Quest>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ToggleQuestStatus<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        mut,
        constraint = quest_account.admin == admin.key() @ ErrorCode::Unauthorized
    )]
    pub quest_account: Account<'info, Quest>,
}

#[derive(Accounts)]
pub struct InitializeUserProfile<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = UserProfile::LEN,
        seeds = [b"user-profile", user.key().as_ref()],
        bump
    )]
    pub user_profile: Account<'info, UserProfile>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CompleteQuest<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        constraint = nft_token_account.owner == user.key() @ ErrorCode::NotNFTOwner,
        constraint = nft_token_account.amount >= 1 @ ErrorCode::NoNFTTokens,
    )]
    pub nft_token_account: Account<'info, TokenAccount>,

    pub nft_mint: Account<'info, Mint>,

    #[account(mut)]
    pub quest_account: Account<'info, Quest>,

    #[account(
        mut,
        seeds = [b"user-profile", user.key().as_ref()],
        bump,
        constraint = user_profile.user == user.key() @ ErrorCode::Unauthorized
    )]
    pub user_profile: Account<'info, UserProfile>,

    #[account(
        init_if_needed,
        payer = user,
        space = UserQuestStatus::LEN,
        seeds = [
            b"user-quest",
            user.key().as_ref(),
            quest_account.quest_id.as_bytes()
        ],
        bump
    )]
    pub user_quest_status: Account<'info, UserQuestStatus>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Quest {
    pub admin: Pubkey,
    pub quest_id: String,
    pub title: String,
    pub description: String,
    pub reward_points: u32,
    pub is_active: bool,
    pub completion_count: u32,
}

impl Quest {
    const LEN: usize = 8 + 32 + 4 + 50 + 4 + 100 + 4 + 500 + 4 + 1 + 4;
}

#[account]
pub struct UserProfile {
    pub user: Pubkey,
    pub total_points: u32,
    pub completed_quests_count: u32,
}

impl UserProfile {
    const LEN: usize = 8 + 32 + 4 + 4;
}

#[account]
pub struct UserQuestStatus {
    pub user: Pubkey,
    pub quest_id: String,
    pub completed: bool,
    pub completed_at: i64,
}

impl UserQuestStatus {
    const LEN: usize = 8 + 32 + 4 + 50 + 1 + 8;
}

#[error_code]
pub enum ErrorCode {
    #[msg("You are not authorized")]
    Unauthorized,

    #[msg("Quest already completed")]
    QuestAlreadyCompleted,

    #[msg("This quest is currently inactive")]
    QuestNotActive,

    #[msg("You are not the owner of the NFT")]
    NotNFTOwner,

    #[msg("No NFT tokens found")]
    NoNFTTokens,

    #[msg("Quest ID is too long")]
    QuestIdTooLong,
}

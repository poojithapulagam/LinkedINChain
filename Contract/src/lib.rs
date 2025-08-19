use anchor_lang::prelude::*;

// Declare the program ID. This must match the ID in your Cargo.toml and deploy.
declare_id!("DbcoQDkofHjxXSwivieFFYox8LFAnuuz3uaT5NNQZ5ga");

/// The main program module for Solana X.
/// Contains the instructions for creating profiles and sending posts.
#[program]
pub mod solana_x {
    use super::*;

    /// Instruction to create a new user profile.
    ///
    /// # Arguments
    ///
    /// * ctx: The context containing the accounts required for this instruction.
    /// * name: The name of the profile, a String.
    ///
    /// # Constraints
    ///
    /// * The name must not exceed 50 characters.
    pub fn create_profile(ctx: Context<CreateProfile>, name: String) -> Result<()> {
        // Ensure the provided name does not exceed the maximum allowed length.
        require!(name.chars().count() <= 50, ErrorCode::NameTooLong);

        // Get mutable references to the profile account and the owner's signer.
        let profile: &mut Account<Profile> = &mut ctx.accounts.profile;
        let owner: &Signer = &ctx.accounts.owner;

        // Assign the owner's public key to the profile.
        profile.owner = *owner.key;
        // Assign the provided name to the profile.
        profile.name = name;
        // Store the bump seed used to create the Program Derived Address (PDA) for the profile.
        // FIX: Directly access the bump using dot notation instead of .get().
        profile.bump = ctx.bumps.profile;

        Ok(()) // Return success.
    }

    /// Instruction to send a new post.
    ///
    /// # Arguments
    ///
    /// * ctx: The context containing the accounts required for this instruction.
    /// * content: The content of the post, a String.
    ///
    /// # Constraints
    ///
    /// * The content must not exceed 280 characters.
    pub fn send_post(ctx: Context<SendPost>, content: String) -> Result<()> {
        // Ensure the provided content does not exceed the maximum allowed length.
        require!(content.chars().count() <= 280, ErrorCode::ContentTooLong);

        // Get mutable references to the post account and the author's signer.
        let post: &mut Account<Post> = &mut ctx.accounts.post;
        let author: &Signer = &ctx.accounts.author;
        // Get the current timestamp from the Solana clock.
        let clock: Clock = Clock::get().unwrap();

        // Assign the author's public key to the post.
        post.author = *author.key;
        // Assign the current timestamp to the post.
        post.timestamp = clock.unix_timestamp;
        // Assign the provided content to the post.
        post.content = content;

        Ok(()) // Return success.
    }
}

/// Accounts required for the create_profile instruction.
#[derive(Accounts)]
pub struct CreateProfile<'info> {
    /// The signer account, also the payer for the new profile account.
    #[account(mut)]
    pub owner: Signer<'info>,
    /// The profile account, initialized as a Program Derived Address (PDA).
    #[account(
        init, // Initializes a new account.
        payer = owner, // The 'owner' account pays for the rent of this new account.
        space = Profile::LEN, // Allocates space for the Profile data.
        seeds = [b"profile", owner.key().as_ref()], // Defines the seeds for the PDA.
        bump, // Stores the bump seed in the account data.
    )]
    pub profile: Account<'info, Profile>,
    /// The Solana System Program, required for creating new accounts.
    pub system_program: Program<'info, System>,
}

/// Accounts required for the send_post instruction.
#[derive(Accounts)]
pub struct SendPost<'info> {
    /// The signer account, also the payer for the new post account.
    #[account(mut)]
    pub author: Signer<'info>,
    /// The post account, initialized as a new account.
    #[account(
        init, // Initializes a new account.
        payer = author, // The 'author' account pays for the rent of this new account.
        space = Post::LEN // Allocates space for the Post data.
    )]
    pub post: Account<'info, Post>,
    /// The Solana System Program, required for creating new accounts.
    pub system_program: Program<'info, System>,
}

/// The Profile account structure.
#[account]
pub struct Profile {
    pub owner: Pubkey, // The public key of the profile owner.
    pub name: String,  // The name associated with the profile.
    pub bump: u8,      // The bump seed for the PDA.
}

/// The Post account structure.
#[account]
pub struct Post {
    pub author: Pubkey,  // The public key of the post author.
    pub timestamp: i64,  // The Unix timestamp when the post was created.
    pub content: String, // The content of the post.
}

// --- Constants for calculating account sizes ---

/// Length of the Anchor discriminator (8 bytes, automatically added to accounts).
const DISCRIMINATOR_LENGTH: usize = 8;
/// Length of a Solana public key (32 bytes).
const PUBLIC_KEY_LENGTH: usize = 32;
/// Length of a Unix timestamp (i64, 8 bytes).
const TIMESTAMP_LENGTH: usize = 8;
/// Length prefix for a String (4 bytes, stores the string's byte length).
const STRING_LENGTH_PREFIX: usize = 4;
/// Maximum byte length for the name string (50 characters * 4 bytes/char max for UTF-8).
const MAX_NAME_LENGTH: usize = 50 * 4;
/// Maximum byte length for the content string (280 characters * 4 bytes/char max for UTF-8).
const MAX_CONTENT_LENGTH: usize = 280 * 4;
/// Length of a single byte (u8) for the bump seed.
const BUMP_LENGTH: usize = 1;

/// Implementation block for Profile to define its constant size.
impl Profile {
    /// The total space required for a Profile account.
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Owner (Pubkey).
        + STRING_LENGTH_PREFIX + MAX_NAME_LENGTH // Name (String).
        + BUMP_LENGTH; // Bump (u8).
}

/// Implementation block for Post to define its constant size.
impl Post {
    /// The total space required for a Post account.
    const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author (Pubkey).
        + TIMESTAMP_LENGTH // Timestamp (i64).
        + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content (String).
}

/// Custom error codes for the program.
#[error_code]
pub enum ErrorCode {
    /// Error: The provided name for the profile is too long.
    #[msg("The provided name should be 50 characters long maximum")]
    NameTooLong,
    /// Error: The provided content for the post is too long.
    #[msg("The provided content should be 280 characters long maximum")]
    ContentTooLong,
}

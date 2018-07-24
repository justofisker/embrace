# embrace
An open-source multipurpose Discord bot

## Commands

Name | Parameter | Aliases | Can Disable* | User Permission Needed
--- | --- | --- | --- | ---
Help | [command] | | Yes |
Ping | | p | Yes |
Invite | | | Yes |
Cat | | kitty, cedar | Yes |
Dog | | puppy, pupper | Yes |
Embrace | [user] | | Yes |
8Ball | <question> | magic8, magic8ball | Yes |
Coin | | flip | Yes |
Prefix | | | No |
Set | [option] [value] | | No | MANAGE_GUILD
Enable | [command] | | No | MANAGE_GUILD
Disable | [command] | | No | MANAGE_GUILD
Stop** | | | No |

\* The command can be disabled by server administrator.

\** Stop can only be used by a user with the same ID as the one delcared in `src/settings.json` as ownerID

# Update renovate config for all your repositories

## Setup

1. `git clone git@github.com:runely/update-renovate-config.git`
1. `npm i`
1. Create a `renovate_preset.json` file or rename `renovate_preset_example.json`, containing your new `renovate` config to be used in all your repos
1. [Create a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token) with `repo scope`
1. Create a `.env` file:
    ```bash
    GITHUB_USERNAME=<GitHub username where personal-access-token is created>
    GITHUB_PERSONAL_ACCESS_TOKEN=<personal-access-token>
    RENOVATE_CONFIG=<Full path to renovate_preset.json file>
    RENOVATE_COMMIT_MESSAGE=<Your own commit message. If set to empty or removed, a default commit message will be used>
    ```

## Usage

1. For now you must create a `repos.json` file in the `data` folder containing an array of all your repos fetched through the [GitHub API](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api#repositories)
1. Run `npm run get-renovate-repos` to find which repos actually use **renovate**
1. Run `npm run clone-repos` to clone down a fresh copy of all repos. They will be saved in `./repos` folder
1. Run `npm run update-repos` to update `renovate` config in all repos

# :exclamation: FYI

This tool will only modify and commit to a repository if:
- It's not archived
- It already has a `renovate.json` file
- `renovate.json` file is different from `renovate_preset.json` setup earlier

## ToDo

- Implement functionallity to fetch all your repos automatically (handling pagination)

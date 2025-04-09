# Deploying ACUL Boilerplate Screens via GitHub Actions

This document outlines the steps required to configure and use the provided GitHub Actions workflow (`.github/workflows/acul-deploy.yml`) to automatically build, deploy, and configure your customized ACUL screens.

## Overview

The workflow performs the following actions:

1.  Checks out your code.
2.  Sets up Node.js.
3.  Installs dependencies (`npm ci`).
4.  Builds the ACUL screen application (`npm run build`).
5.  Configures AWS credentials using OpenID Connect (OIDC).
6.  Discovers the ACUL screens built in the `dist/` directory.
7.  Uploads the contents of the `dist/` directory to a specified S3 bucket.
8.  Installs the Auth0 CLI.
9.  Logs into the Auth0 CLI using configured M2M application credentials.
10. For each discovered screen, generates the necessary `settings.json` with dynamic asset URLs (pointing to your CDN).
11. Configures the corresponding Auth0 Universal Login prompt to use "Advanced" rendering mode with the generated settings.
12. Provides a summary of the deployment.

This enables a CI/CD process where pushing changes to your ACUL screens automatically updates them in your Auth0 tenant.

## Prerequisites

Before using this workflow, you need the following resources configured:

1.  **Auth0 Tenant** with a **Custom Domain** configured and verified.
    - _Why?_ Advanced ACUL rendering mode requires a custom domain.
    - _Where?_ `Auth0 Dashboard > Branding > Custom Domains`
2.  **AWS S3 Bucket** to store the built screen assets.
    - _Why?_ A publicly accessible location is needed to serve the assets.
    - Ensure the bucket has appropriate public read access configured (either fully public or restricted to your CDN).
3.  **(Optional but Recommended) CDN:** A Content Delivery Network (e.g., AWS CloudFront) pointing to your S3 bucket.
    - _Why?_ Improves performance and provides HTTPS.
    - The workflow assumes filenames include content hashes, so explicit CDN cache invalidation is _not_ performed.
4.  **Auth0 Machine-to-Machine (M2M) Application** for the workflow to interact with the Auth0 Management API.
    - _Setup Guide:_ See below.
5.  **AWS IAM Role** that the GitHub Actions workflow can assume via OIDC.
    - _Setup Guide:_ See below.
6.  **GitHub Repository Secrets** containing credentials and configuration values.
    - _Setup Guide:_ See below.

## Setup Guides

### 1. Auth0 M2M Application Setup

This application allows the GitHub workflow (via the Auth0 CLI) to securely update your Universal Login settings.

1.  Navigate to your Auth0 Dashboard: `Applications > Applications`.
2.  Click **Create Application**.
3.  Choose **Machine to Machine Applications** and give it a descriptive name (e.g., `GitHub ACUL Deployer`).
4.  Click **Create**.
5.  **Authorize API Access:** Go to the **APIs** tab for the new M2M application.
6.  In the dropdown, select **Auth0 Management API**.
7.  Toggle the switch to authorize access.
8.  Expand the permissions list by clicking the down arrow next to the authorized API.
9.  Grant the following specific permissions:
    - `read:branding_settings`
    - `update:branding_settings`
    - `read:prompts`
    - `update:prompts`
10. Click **Update**.
11. **Retrieve Credentials:** Go back to the **Settings** tab of the M2M application.
12. Note down the **Domain**, **Client ID**, and **Client Secret**. These will be used for GitHub Secrets.

### 2. AWS IAM Role for GitHub Actions OIDC

This role grants the GitHub workflow permission to upload files to your S3 bucket.

1.  Navigate to the AWS IAM Console: `Roles > Create role`.
2.  **Select trusted entity:** Choose **Web identity**.
3.  **Identity provider:** Select `token.actions.githubusercontent.com` (if it doesn't exist, you may need to create it first under `Identity providers`).
4.  **Audience:** Enter `sts.amazonaws.com`.
5.  **GitHub organization/repository (Optional but Recommended):** Add your GitHub organization and optionally the specific repository (`your-org/your-repo`) to restrict which workflows can assume this role.
6.  Click **Next**.
7.  **Add permissions:** Attach an IAM policy that grants the necessary S3 permissions. You can create a new policy or use an existing one. The minimum required permissions are:
    - `s3:PutObject`
    - `s3:GetObject`
    - `s3:DeleteObject`
    - `s3:ListBucket`
    - **Resource:** Ensure these permissions target your specific S3 bucket ARN (e.g., `arn:aws:s3:::your-acul-bucket-name/*` for object actions and `arn:aws:s3:::your-acul-bucket-name` for `ListBucket`).
    - _Example Policy JSON:_
      ```json
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
            "Resource": "arn:aws:s3:::<YOUR-BUCKET-NAME>/*"
          },
          {
            "Effect": "Allow",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::<YOUR-BUCKET-NAME>"
          }
        ]
      }
      ```
      _(Replace `<YOUR-BUCKET-NAME>` with your actual bucket name)_
8.  Click **Next**.
9.  **Name, review, and create:** Give the role a descriptive name (e.g., `GitHubActions-ACUL-S3-UploadRole`). Review the settings and click **Create role**.
10. **Retrieve Role ARN:** Once created, view the role and copy its **ARN**. This will be used for a GitHub Secret.

### 3. Required GitHub Secrets

Configure the following secrets in your GitHub repository (`Settings > Secrets and variables > Actions > Repository secrets`):

- `AWS_S3_ARN`: The full ARN of the IAM Role created in the previous step.
  - _Example:_ `arn:aws:iam::123456789012:role/GitHubActions-ACUL-S3-UploadRole`
- `S3_BUCKET_NAME`: The exact name of your S3 bucket where assets will be uploaded.
  - _Example:_ `my-acul-boilerplate-assets`
- `AWS_REGION` (Optional): The AWS region where your S3 bucket resides. Defaults to `us-east-1` if not provided.
  - _Example:_ `ap-southeast-2`
- `S3_CDN_URL`: The **base URL** from which your assets will be served (your CDN distribution URL or the S3 public URL if not using a CDN). **IMPORTANT:** Do **NOT** include a trailing slash (`/`) at the end.
  - _Example (CloudFront):_ `https://d111111abcdef8.cloudfront.net`
  - _Example (S3 Public):_ `https://my-acul-boilerplate-assets.s3.us-east-1.amazonaws.com`
- `S3_CDN_URL`: The **base URL** from which your assets will be served (your CDN distribution URL or the S3 public URL if not using a CDN). **IMPORTANT:** Do **NOT** include a trailing slash (`/`) at the end.
  - _Example (CloudFront):_ `https://d111111abcdef8.cloudfront.net`
  - _Example (S3 Public):_ `https://my-acul-boilerplate-assets.s3.us-east-1.amazonaws.com`
- `AUTH0_DOMAIN`: Your Auth0 tenant domain (copied from the M2M application settings).
  - _Example:_ `https://www.custom_domain.com`
- `AUTH0_CLIENT_ID`: The Client ID of the Auth0 M2M application created earlier.
- `AUTH0_CLIENT_SECRET`: The Client Secret of the Auth0 M2M application.

## Usage

1.  **Push Changes:** Once the prerequisites are met and secrets are configured, pushing changes to the `main` or `master` branch within the `packages/auth0-acul-js/examples/acul-boilerplate/` path (relative to the monorepo root) will automatically trigger the workflow.
2.  **Manual Trigger:** You can also manually trigger the workflow from the GitHub Actions tab in your repository.

## Troubleshooting

- **Workflow Fails on Auth0 Login:** Double-check `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, and `AUTH0_CLIENT_SECRET` secrets. Ensure the M2M application has the correct Management API permissions granted.
- **Workflow Fails on S3 Upload:** Verify the `AWS_S3_ARN` secret is correct. Check the IAM Role's trust policy (ensure it trusts your GitHub org/repo) and attached permissions policy (ensure it allows the required S3 actions on the correct bucket).
- **Workflow Fails Configuring Screens:** Examine the workflow logs for the specific error message from the Auth0 CLI. Ensure the `S3_CDN_URL` is correct and accessible. Verify the M2M application has the required `update:prompts` permission.
- **Screens Don't Update Visually:** Ensure your browser cache is cleared. Double-check the `S3_CDN_URL` points to the correct location where assets are being uploaded. Verify the Auth0 prompt configuration in the dashboard reflects the new asset URLs.
- **Working Directory Note:** The workflow is configured with `WORKING_DIR: packages/auth0-acul-js/examples/acul-boilerplate`. This assumes the workflow is running from the root of the `universal-login` monorepo. If you are running this workflow from a repository containing _only_ the boilerplate code, you might need to adjust `WORKING_DIR` to `.` in the workflow file.

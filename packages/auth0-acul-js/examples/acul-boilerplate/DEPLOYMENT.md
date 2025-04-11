# Deploying ACUL Boilerplate Screens via GitHub Actions

This document provides a comprehensive guide to set up the infrastructure and configuration required to deploy Auth0 Custom Universal Login (ACUL) screens using GitHub Actions.

## Overview

The deployment workflow automatically:

1. Builds your custom login screens
2. Deploys the assets to AWS S3
3. Configures the screens in your Auth0 tenant
4. Serves the assets through a CDN for optimal performance

In technical terms, the workflow performs these actions:
1. Checks out your code
2. Sets up Node.js and installs dependencies
3. Builds the ACUL screen application
4. Configures AWS credentials using OpenID Connect (OIDC)
5. Discovers ACUL screens in the `dist/` directory
6. Uploads assets to your S3 bucket
7. Configures Auth0 for each discovered screen with dynamic asset URLs
8. Provides a deployment summary

## Prerequisites

Before setting up the workflow, ensure you have:

- An Auth0 tenant with administrative access
- An AWS account with permissions to create IAM roles and S3 buckets
- A GitHub repository containing your ACUL code

## Step-by-Step Setup Guide

### 1. Auth0 Configuration

#### 1.1. Set Up a Custom Domain (Required)

Advanced ACUL rendering requires a custom domain:

1. Navigate to: `Auth0 Dashboard > Branding > Custom Domains`
2. Click **Add Domain**
3. Follow the verification steps to set up your domain
4. Ensure the domain is verified and active before proceeding

#### 1.2. Create a Machine-to-Machine (M2M) Application

This application allows the workflow to interact with Auth0's Management API:

1. Go to `Auth0 Dashboard > Applications > Applications`
2. Click **Create Application**
3. Select **Machine to Machine Applications**
4. Name it descriptively (e.g., "GitHub ACUL Deployment")
5. Click **Create**
6. Under the **APIs** tab, select **Auth0 Management API**
7. Toggle the switch to authorize access
8. Expand the permissions list and grant these specific permissions:
   - `read:branding_settings`
   - `update:branding_settings`
   - `read:prompts`
   - `update:prompts`
9. Click **Update**
10. Go to the **Settings** tab and note down:
    - Domain
    - Client ID
    - Client Secret (you'll need these for GitHub secrets)

### 2. AWS Infrastructure Setup

#### 2.1. Create an S3 Bucket

1. Sign in to the AWS Console and navigate to S3
2. Click **Create bucket**
3. Enter a globally unique name for your bucket
4. Select your preferred AWS region
5. For public assets (simplest approach):
   - Uncheck "Block all public access"
   - Acknowledge the warning
6. Enable versioning (recommended)
7. Click **Create bucket**

#### 2.2. Configure S3 Bucket Permissions

There are two main approaches to configure your S3 bucket:

For public assets (Option 1 - Simpler):

1. Select your newly created bucket
2. Go to the **Permissions** tab
3. Click **Bucket policy**
4. Add a policy that allows public read access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

For CloudFront with private S3 (Option 2 - Recommended for security):

1. Keep your S3 bucket private (Block all public access)
2. Continue with CloudFront setup below, then return to add the CloudFront access policy
3. This approach keeps your S3 bucket secure while CloudFront provides public access to the assets

#### 2.3. Set Up CloudFront (Recommended)

CloudFront acts as a secure gateway to your S3 assets. It allows end users to access your content through CloudFront's public URLs while keeping your S3 bucket private and secure:

1. Go to the CloudFront console
2. Click **Create Distribution**
3. For **Origin Domain**, select your S3 bucket
4. For **Origin Access**:
   - Select "Origin access control settings (recommended)"
   - Create a new OAC with default settings
5. Under **Default Cache Behavior**:
   - For **Viewer Protocol Policy**, select "Redirect HTTP to HTTPS"
   - For **Cache Policy**, select "CachingOptimized" 
6. Under **Settings**:
   - Set **Default Root Object** to `index.html`
   - Choose your desired **Price Class**
7. Click **Create Distribution**
8. **Note the CloudFront domain name** (e.g., `d1234abcdef.cloudfront.net`) - this will be your public URL for accessing assets

9. Update your S3 bucket policy with CloudFront access:
   - Go back to your S3 bucket permissions
   - Add the CloudFront access policy (AWS will suggest this policy when you create the distribution):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::YOUR-ACCOUNT-ID:distribution/YOUR-DISTRIBUTION-ID"
        }
      }
    }
  ]
}
```

This configuration means:
- Your S3 bucket remains private (no direct public access)
- CloudFront has permission to access objects in your bucket
- Users access your content through CloudFront URLs, not direct S3 URLs
- You get the security benefits of a private bucket while still having publicly accessible content

#### 2.4. Create IAM Role for GitHub Actions

1. Go to the IAM Console and select **Roles**
2. Click **Create role**
3. Select **Web identity** as the trusted entity type
4. For **Identity Provider**, select or add `token.actions.githubusercontent.com`
5. For **Audience**, enter `sts.amazonaws.com`
6. Under **GitHub organization/repository**:
   - Enter your GitHub organization name
   - Optionally specify the repository name for enhanced security
7. Click **Next**
8. Create or attach a policy with these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME"
    }
  ]
}
```

9. Give the role a descriptive name (e.g., "GitHubActions-ACUL-Deployment")
10. Click **Create role**
11. View the role and copy its ARN for GitHub secrets

### 3. GitHub Repository Configuration

#### 3.1. Add GitHub Secrets

Go to your repository, then:
1. Navigate to `Settings > Secrets and variables > Actions`
2. Click **New repository secret**
3. Add the following secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `AWS_S3_ARN` | `arn:aws:iam::123456789012:role/GitHubActions-ACUL-Deployment` | The ARN of your IAM role |
| `S3_BUCKET_NAME` | `your-acul-assets-bucket` | Your S3 bucket name |
| `AWS_REGION` | `us-east-1` | Region where your bucket is located |
| `S3_CDN_URL` | `https://d1234abcdef.cloudfront.net` or `https://your-bucket.s3.region.amazonaws.com` | Base URL for assets (no trailing slash) |
| `AUTH0_DOMAIN` | `your-domain.auth0.com` | Your Auth0 domain |
| `AUTH0_CLIENT_ID` | `abcdef123456789` | M2M application client ID |
| `AUTH0_CLIENT_SECRET` | `your-secret-here` | M2M application client secret |

#### 3.2. Add Workflow File

The workflow file (`.github/workflows/acul-deploy.yml`) should be placed in your repository. If you're working with a monorepo, ensure the `WORKING_DIR` environment variable points to your ACUL project location.

### 4. Deployment Options & Considerations

#### 4.1. Hosting Alternatives

1. **S3 with Public Access (Basic)**
   - Pros: Simpler setup
   - Cons: No HTTPS unless using bucket website endpoints with CloudFront, less performant globally

2. **S3 with CloudFront (Recommended)**
   - Pros: Better security, HTTPS, global performance, lower latency
   - Cons: More complex setup, additional service to manage

3. **Other CDN Providers**
   - You can use any CDN that can serve assets from S3 or public URLs
   - Update the `S3_CDN_URL` to point to your chosen CDN

#### 4.2. Asset Handling and Caching

The CI/CD pipeline leverages content-based hashing for all assets:
- Each file gets a unique hash in its filename based on content
- When the content changes, the hash changes
- This enables long cache times without stale content
- No CDN invalidation is required for most deployments

#### 4.3. Partial Deployments

The workflow is designed to be resilient:
- Each screen is processed independently
- If one screen fails to deploy, others can still succeed
- The workflow only fails completely if all screens fail
- This allows for progressive updates and improvements

## Usage

### Automatic Deployment

1. Push changes to your repository's main branch
2. The workflow will automatically run if files within the monitored directory change
3. Monitor the workflow in the GitHub Actions tab

### Manual Deployment

1. Navigate to the Actions tab in your GitHub repository
2. Select the deployment workflow
3. Click "Run workflow"
4. Select your branch and click "Run workflow"

## Troubleshooting

### Common Issues

#### Authentication Failures

- **Symptom:** Workflow fails with Auth0 authentication errors
- **Check:** Verify `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, and `AUTH0_CLIENT_SECRET` values
- **Solution:** Ensure the M2M application has the correct permissions

#### S3 Upload Failures

- **Symptom:** Workflow fails while uploading to S3
- **Check:** Verify `AWS_S3_ARN` and IAM role trust relationships
- **Solution:** Confirm the IAM role allows the GitHub Actions workflow to assume it and has the necessary S3 permissions

#### Screen Configuration Failures

- **Symptom:** Assets upload but screens fail to configure in Auth0
- **Check:** Look for specific error messages in the workflow logs
- **Solution:** Verify that your Auth0 tenant has a custom domain set up and M2M application has `update:prompts` permission

#### Assets Not Loading

- **Symptom:** Screens update but assets don't load
- **Check:** Browser console for 404 errors on assets
- **Solution:** Verify `S3_CDN_URL` is correct and assets are publicly accessible

### Logs and Monitoring

- The GitHub Actions workflow provides detailed logs for each step
- Each screen deployment includes asset discovery information
- Successful and failed deployments are tracked and reported
- The workflow outputs a summary at the end with links to deployed screens

## Working Directory Note

If you're using this workflow in a monorepo, the default setting assumes:
```yaml
env:
  WORKING_DIR: packages/auth0-acul-js/examples/acul-boilerplate
```

If your ACUL code is in the repository root, change this to:
```yaml
env:
  WORKING_DIR: .
```

Adjust this path according to your repository structure.

# Auth0 ACUL GitHub Actions

This directory contains example GitHub Actions that you can use as templates for your own Auth0 ACUL implementation.

## Purpose

These actions are intentionally duplicated from the root `.github/actions` directory of the SDK repository. While the root actions are used for testing the SDK itself, the actions in this directory serve as practical examples that you can copy into your own repository.

## Available Actions

- **configure-auth0-screens**: Configures Auth0 Universal Login screens using the Auth0 CLI
- **deployment-summary**: Generates a deployment summary report
- **discover-screens**: Discovers available ACUL screens in your application
- **setup-auth0-cli**: Sets up the Auth0 CLI with proper authentication
- **upload-acul-to-s3**: Uploads ACUL assets to an S3 bucket

## Usage

To use these actions in your own project:

1. Copy the entire `.github` directory to the root of your repository
2. Update the workflow file (`.github/workflows/acul-deploy.yml`) to match your project structure
3. Configure the required secrets in your GitHub repository
4. Modify the actions if needed to fit your specific deployment requirements

For detailed instructions on deployment, please refer to the [DEPLOYMENT.md](../../DEPLOYMENT.md) document.
#!/usr/bin/env node

/**
 * Remove duplicate entries from Mintlify navigation.json files
 *
 * Usage:
 *   node remove-nav-duplicates.js [path-to-navigation.json]
 *
 * If no path is provided, processes both:
 *   - docs/customize/login-pages/advanced-customizations/reference/js-sdk/navigation.json
 *   - docs/customize/login-pages/advanced-customizations/reference/react-sdk/navigation.json
 */

const fs = require('fs');
const path = require('path');

// Default navigation files
const DEFAULT_NAV_FILES = [
  'docs/customize/login-pages/advanced-customizations/reference/js-sdk/navigation.json',
  'docs/customize/login-pages/advanced-customizations/reference/react-sdk/navigation.json',
];

// Function to remove duplicates while preserving order
function removeDuplicates(arr) {
  const seen = new Set();
  return arr.filter(item => {
    if (seen.has(item)) {
      return false;
    }
    seen.add(item);
    return true;
  });
}

// Function to process a single navigation file
function processNavFile(navFilePath) {
  const absolutePath = path.isAbsolute(navFilePath)
    ? navFilePath
    : path.join(process.cwd(), navFilePath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ File not found: ${absolutePath}`);
    return false;
  }

  try {
    const navData = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));
    let totalRemoved = 0;

    // Process each group
    if (navData.pages) {
      for (const pageGroup of navData.pages) {
        if (pageGroup.pages && Array.isArray(pageGroup.pages)) {
          const originalCount = pageGroup.pages.length;
          pageGroup.pages = removeDuplicates(pageGroup.pages);
          const newCount = pageGroup.pages.length;
          const removed = originalCount - newCount;

          if (removed > 0) {
            console.log(`  ✓ ${pageGroup.group}: Removed ${removed} duplicate(s) (${originalCount} → ${newCount})`);
            totalRemoved += removed;
          }
        }
      }
    }

    // Write the cleaned navigation file
    fs.writeFileSync(absolutePath, JSON.stringify(navData, null, 2) + '\n');

    if (totalRemoved > 0) {
      console.log(`✅ ${path.relative(process.cwd(), absolutePath)}: Cleaned (${totalRemoved} duplicates removed)\n`);
    } else {
      console.log(`ℹ️  ${path.relative(process.cwd(), absolutePath)}: No duplicates found\n`);
    }

    return true;
  } catch (error) {
    console.error(`❌ Error processing ${absolutePath}:`, error.message);
    return false;
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length > 0) {
  // Process specified files
  console.log('Processing specified navigation files...\n');
  let successCount = 0;
  for (const filePath of args) {
    if (processNavFile(filePath)) {
      successCount++;
    }
  }
  if (successCount === args.length) {
    console.log('🎉 All files processed successfully!');
  }
} else {
  // Process default files
  console.log('Processing default navigation files...\n');
  let successCount = 0;
  for (const filePath of DEFAULT_NAV_FILES) {
    if (processNavFile(filePath)) {
      successCount++;
    }
  }
  if (successCount === DEFAULT_NAV_FILES.length) {
    console.log('🎉 All files processed successfully!');
  }
}

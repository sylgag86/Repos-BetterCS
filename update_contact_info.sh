#!/bin/bash

# Update address
find client/public -type f -name "*.html" -exec sed -i 's|123 Business Ave, Suite 100<br>New York, NY 10001|169 Madison Ave STE 15717<br>New York, NY 10016|g' {} \;

# Update phone
find client/public -type f -name "*.html" -exec sed -i 's|(555) 123-4567|844-985-4567|g' {} \;

echo "Updated contact information in all HTML files."

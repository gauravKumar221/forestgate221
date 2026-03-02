'use client';

import { PageHeader } from './PageHeader';

/**
 * PrivacyBanner - Legacy alias for PageHeader.
 * Recommending migration to PageHeader for generic usage.
 */
export function PrivacyBanner() {
  return (
    <PageHeader 
      title="Privacy Policy" 
      imageUrl="/assets/images/privicy.png"
      breadcrumbLabel="Privacy Policy"
    />
  );
}

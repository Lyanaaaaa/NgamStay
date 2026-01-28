import React from 'react';
import Icon from './Icon';
import { ListingStatus } from '../types';

interface PMVerificationBadgeProps {
  status: ListingStatus;
  isVerifiedPM: boolean;
}

const PMVerificationBadge: React.FC<PMVerificationBadgeProps> = ({ status, isVerifiedPM }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case ListingStatus.DRAFT:
        return {
          iconType: 'eye' as const,
          text: 'Draft',
          bgColor: 'bg-gray-100 dark:bg-gray-700',
          textColor: 'text-gray-600 dark:text-gray-400',
          iconColor: 'text-gray-500'
        };
      case ListingStatus.PENDING_REVIEW:
        return {
          iconType: 'clock' as const,
          text: 'Under Review',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          textColor: 'text-yellow-700 dark:text-yellow-400',
          iconColor: 'text-yellow-600 dark:text-yellow-500'
        };
      case ListingStatus.APPROVED:
      case ListingStatus.PUBLISHED:
        if (isVerifiedPM) {
          return {
            iconType: 'shield' as const,
            text: 'Verified Listing',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
            textColor: 'text-green-700 dark:text-green-400',
            iconColor: 'text-green-600 dark:text-green-500'
          };
        }
        return {
          iconType: 'check-circle' as const,
          text: 'Published',
          bgColor: 'bg-brand-light/10',
          textColor: 'text-brand-dark dark:text-brand-light',
          iconColor: 'text-brand-light'
        };
      case ListingStatus.OCCUPIED:
        return {
          iconType: 'check-circle' as const,
          text: 'Occupied',
          bgColor: 'bg-gray-100 dark:bg-gray-700',
          textColor: 'text-gray-600 dark:text-gray-400',
          iconColor: 'text-gray-500'
        };
      case ListingStatus.REJECTED:
        return {
          iconType: 'x-circle' as const,
          text: 'Needs Attention',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          textColor: 'text-red-700 dark:text-red-400',
          iconColor: 'text-red-600 dark:text-red-500'
        };
      default:
        return {
          iconType: 'eye' as const,
          text: 'Unknown',
          bgColor: 'bg-gray-100 dark:bg-gray-700',
          textColor: 'text-gray-600 dark:text-gray-400',
          iconColor: 'text-gray-500'
        };
    }
  };

  const config = getBadgeConfig();
  const iconType = config.iconType;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bgColor}`}>
      <Icon type={iconType} className={`w-3.5 h-3.5 ${config.iconColor}`} />
      <span className={`text-xs font-bold ${config.textColor}`}>{config.text}</span>
    </div>
  );
};

export default PMVerificationBadge;

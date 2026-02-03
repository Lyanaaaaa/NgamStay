import React from 'react';
import Icon from './Icon';
import PMVerificationBadge from './PMVerificationBadge';
import { Listing, ListingStatus } from '../types';

interface PMListingCardProps {
  listing: Listing;
  isVerifiedPM: boolean;
  onEdit: (listing: Listing) => void;
  onToggleAvailability: (listingId: string) => void;
}

const PMListingCard: React.FC<PMListingCardProps> = ({
  listing,
  isVerifiedPM,
  onEdit,
  onToggleAvailability
}) => {
  const canToggleAvailability = [ListingStatus.PUBLISHED, ListingStatus.OCCUPIED].includes(listing.status);
  // Allow editing for all statuses - property managers can fix mistakes even during review
  const canEdit = true;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-brand-light dark:hover:border-brand-light transition-all duration-300 group">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={listing.images[0] || 'https://picsum.photos/800/600'}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <PMVerificationBadge status={listing.status} isVerifiedPM={isVerifiedPM} />
        </div>
        {listing.promotionalPrice && listing.promotionalPrice < listing.price && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            Special Price!
          </div>
        )}
        {!listing.isAvailable && listing.status === ListingStatus.PUBLISHED && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold px-4 py-2 rounded-xl">
              Marked Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Location */}
        <div className="mb-4">
          <h3 className="font-serif text-lg text-gray-900 dark:text-white mb-2 line-clamp-1">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Icon type="map-pin" className="w-4 h-4" />
            <span className="line-clamp-1">{listing.location}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Icon type="bed" className="w-4 h-4" />
            <span>{listing.beds}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon type="bath" className="w-4 h-4" />
            <span>{listing.baths}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon type="maximize" className="w-4 h-4" />
            <span>{listing.sqft} sqft</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          {listing.promotionalPrice && listing.promotionalPrice < listing.price ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-brand-light">
                RM {listing.promotionalPrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                RM {listing.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">/month</span>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900 dark:text-white">
                RM {listing.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
            </div>
          )}
        </div>

        {/* Status Info */}
        {listing.status === ListingStatus.PENDING_REVIEW && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
            <p className="text-xs text-yellow-700 dark:text-yellow-400">
              Your listing is under manual review. We'll notify you within 24-48 hours.
            </p>
          </div>
        )}

        {listing.status === ListingStatus.REJECTED && listing.reviewNotes && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <p className="text-xs font-semibold text-red-700 dark:text-red-400 mb-1">Review Feedback:</p>
            <p className="text-xs text-red-600 dark:text-red-400">{listing.reviewNotes}</p>
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Icon type="calendar" className="w-3 h-3" />
            <span>Listed {formatDate(listing.createdAt)}</span>
          </div>
          {listing.status === ListingStatus.PUBLISHED && (
            <div className="flex items-center gap-1">
              <Icon type="eye" className="w-3 h-3" />
              <span>0 views</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => onEdit(listing)}
            disabled={!canEdit}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold transition-all duration-200 ${
              canEdit
                ? 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            <Icon type="edit" className="w-4 h-4" />
            <span className="text-sm">Edit</span>
          </button>

          {canToggleAvailability && (
            <button
              onClick={() => onToggleAvailability(listing.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold transition-all duration-200 ${
                listing.isAvailable
                  ? 'bg-brand-light text-white hover:bg-brand-mid'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
              }`}
            >
              {listing.isAvailable ? (
                <>
                  <Icon type="toggle-right" className="w-4 h-4" />
                  <span className="text-sm">Available</span>
                </>
              ) : (
                <>
                  <Icon type="toggle-left" className="w-4 h-4" />
                  <span className="text-sm">Unavailable</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PMListingCard;

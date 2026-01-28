import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { Listing, ListingStatus, PMUser } from '../types';

interface PMListingFormProps {
  user: PMUser;
  listing?: Listing | null;
  onSave: (listing: Partial<Listing>, isDraft: boolean) => void;
  onCancel: () => void;
}

const PMListingForm: React.FC<PMListingFormProps> = ({ user, listing, onSave, onCancel }) => {
  const isEditing = !!listing;
  const [step, setStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    title: listing?.title || '',
    location: listing?.location || '',
    neighborhood: listing?.neighborhood || '',
    type: listing?.type || 'Condo',
    beds: listing?.beds || 1,
    baths: listing?.baths || 1,
    sqft: listing?.sqft || 500,
    price: listing?.price || 1000,
    promotionalPrice: listing?.promotionalPrice || undefined,
    utilities: listing?.utilities || '',
    deposit: listing?.deposit || '',
    leaseTerms: listing?.leaseTerms || '',
    amenities: listing?.amenities || [],
    lifestyleTags: listing?.lifestyleTags || [],
    images: listing?.images || [],
    isAvailable: listing?.isAvailable ?? true
  });

  const [amenityInput, setAmenityInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const propertyTypes = ['Condo', 'Serviced Apartment', 'Duplex', 'Room Rental', 'Landed House', 'Studio'];
  const commonAmenities = ['Gym', 'Pool', 'Security', 'Parking', 'Playground', 'BBQ Area', 'Tennis Court', 'Jogging Track'];
  const commonTags = ['Near MRT', 'Pet Friendly', 'Furnished', 'High Floor', 'City View', 'Quiet Area', 'Family Friendly'];

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addAmenity = (amenity: string) => {
    if (amenity && !formData.amenities.includes(amenity)) {
      updateField('amenities', [...formData.amenities, amenity]);
      setAmenityInput('');
    }
  };

  const removeAmenity = (amenity: string) => {
    updateField('amenities', formData.amenities.filter(a => a !== amenity));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.lifestyleTags.includes(tag)) {
      updateField('lifestyleTags', [...formData.lifestyleTags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    updateField('lifestyleTags', formData.lifestyleTags.filter(t => t !== tag));
  };

  const addImagePlaceholder = () => {
    const newImage = `https://picsum.photos/seed/${Date.now()}/800/600`;
    updateField('images', [...formData.images, newImage]);
  };

  const removeImage = (index: number) => {
    updateField('images', formData.images.filter((_, i) => i !== index));
  };

  const handleSaveDraft = () => {
    onSave({
      ...formData,
      id: listing?.id || `listing_${Date.now()}`,
      pmUserId: user.id,
      status: ListingStatus.DRAFT,
      createdAt: listing?.createdAt || new Date(),
      updatedAt: new Date(),
      isVerified: user.isVerified,
      rating: 0,
      coords: { x: Math.random() * 100, y: Math.random() * 100 }
    }, true);
  };

  const handleSubmit = () => {
    const newStatus = user.isVerified ? ListingStatus.PUBLISHED : ListingStatus.PENDING_REVIEW;

    onSave({
      ...formData,
      id: listing?.id || `listing_${Date.now()}`,
      pmUserId: user.id,
      status: newStatus,
      createdAt: listing?.createdAt || new Date(),
      updatedAt: new Date(),
      publishedAt: newStatus === ListingStatus.PUBLISHED ? new Date() : undefined,
      isVerified: user.isVerified,
      rating: 0,
      coords: { x: Math.random() * 100, y: Math.random() * 100 }
    }, false);
  };

  const canProceedToStep2 = formData.title && formData.location && formData.neighborhood;
  const canProceedToStep3 = formData.price > 0 && formData.utilities && formData.deposit;
  const canSubmit = formData.images.length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <Icon type="arrow-left" className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            )}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {isEditing ? 'Edit Listing' : 'Add New Listing'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Step {step} of 3</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <Icon type="x" className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex gap-2">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-brand-light' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-brand-light' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-brand-light' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6 max-h-[calc(100vh-250px)] overflow-y-auto">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g. Modern Studio at Bangsar South"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Full Address *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="e.g. Bangsar South, Kuala Lumpur"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Neighborhood *
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => updateField('neighborhood', e.target.value)}
                    placeholder="e.g. Bangsar"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Property Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {propertyTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => updateField('type', type)}
                      className={`p-3 rounded-xl border-2 font-semibold transition-all ${
                        formData.type === type
                          ? 'border-brand-light bg-brand-light/10 text-brand-dark dark:text-brand-light'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-light/50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.beds}
                    onChange={(e) => updateField('beds', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.baths}
                    onChange={(e) => updateField('baths', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Sqft
                  </label>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={formData.sqft}
                    onChange={(e) => updateField('sqft', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Pricing & Terms */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Monthly Rent (RM) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={formData.price}
                    onChange={(e) => updateField('price', parseInt(e.target.value))}
                    placeholder="2000"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Promotional Price (RM)
                    <span className="ml-2 text-xs font-normal text-gray-500">Optional</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={formData.promotionalPrice || ''}
                    onChange={(e) => updateField('promotionalPrice', e.target.value ? parseInt(e.target.value) : undefined)}
                    placeholder="1800"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Utilities *
                </label>
                <input
                  type="text"
                  value={formData.utilities}
                  onChange={(e) => updateField('utilities', e.target.value)}
                  placeholder="e.g. Included except Electricity"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Deposit *
                  </label>
                  <input
                    type="text"
                    value={formData.deposit}
                    onChange={(e) => updateField('deposit', e.target.value)}
                    placeholder="e.g. 2 + 0.5 Months"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Lease Terms
                  </label>
                  <input
                    type="text"
                    value={formData.leaseTerms}
                    onChange={(e) => updateField('leaseTerms', e.target.value)}
                    placeholder="e.g. Minimum 12 Months"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Amenities
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {commonAmenities.map(amenity => (
                    <button
                      key={amenity}
                      onClick={() => formData.amenities.includes(amenity) ? removeAmenity(amenity) : addAmenity(amenity)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        formData.amenities.includes(amenity)
                          ? 'bg-brand-light text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity(amenityInput))}
                    placeholder="Add custom amenity"
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white text-sm"
                  />
                  <button
                    onClick={() => addAmenity(amenityInput)}
                    className="px-4 py-2 bg-brand-light text-white font-semibold rounded-xl hover:bg-brand-mid transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Lifestyle Tags */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Lifestyle Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {commonTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => formData.lifestyleTags.includes(tag) ? removeTag(tag) : addTag(tag)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        formData.lifestyleTags.includes(tag)
                          ? 'bg-brand-light text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(tagInput))}
                    placeholder="Add custom tag"
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-brand-light focus:ring-2 focus:ring-brand-light/20 transition-all text-gray-900 dark:text-white text-sm"
                  />
                  <button
                    onClick={() => addTag(tagInput)}
                    className="px-4 py-2 bg-brand-light text-white font-semibold rounded-xl hover:bg-brand-mid transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Photos */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Property Photos * (At least 1 photo required)
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Upload clear, recent photos of your property. Good photos get 3x more inquiries!
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                      <img
                        src={image}
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon type="x" className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-brand-light text-white text-xs font-bold rounded">
                          Cover Photo
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add Photo Button */}
                  <button
                    onClick={addImagePlaceholder}
                    className="aspect-[4/3] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-brand-light hover:bg-brand-light/5 transition-all"
                  >
                    <Icon type="upload" className="w-8 h-8 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Add Photo</span>
                  </button>
                </div>

                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                  Note: For demo purposes, clicking "Add Photo" generates placeholder images. In production, this would upload real photos.
                </p>
              </div>

              {/* Final Review Info */}
              {!user.isVerified && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 font-semibold mb-2">
                    Manual Review Required
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-500">
                    Your listing will be reviewed within 24-48 hours. We'll notify you via email once it's approved.
                    After 3 approved listings, future submissions will be auto-published.
                  </p>
                </div>
              )}

              {user.isVerified && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <p className="text-sm text-green-700 dark:text-green-400 font-semibold mb-2">
                    Auto-Verified Listing
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-500">
                    Your Autorentic verification means this listing will be published immediately with a verified badge.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 rounded-b-3xl flex gap-3">
          <button
            onClick={handleSaveDraft}
            className="flex-1 md:flex-none md:px-6 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:border-brand-light hover:text-brand-light transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Icon type="save" className="w-5 h-5" />
            <span>Save Draft</span>
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 ? !canProceedToStep2 : !canProceedToStep3}
              className="flex-1 bg-brand-light hover:bg-brand-mid text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex-1 bg-brand-light hover:bg-brand-mid text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Icon type="send" className="w-5 h-5" />
              <span>{user.isVerified ? 'Publish Listing' : 'Submit for Review'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PMListingForm;

import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import { useMutation } from '@apollo/client';
import { CREATE_MARKETPLACE_ITEM } from '@/utils/graphql_queries';
import TWFileInput from '@/components/inputs/file';

const RegistryPublishPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    description: '',
    version: '1.0.0',
    price: '',
    tags: [],
    files: null
  });

  const [createItem, { loading }] = useMutation(CREATE_MARKETPLACE_ITEM);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-100 mb-2">
            Publish to Marketplace
          </h1>
          <p className="text-zinc-400">
            Share your AI components with the Upstrima community
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[
            { num: 1, label: 'Basic Info' },
            { num: 2, label: 'Files & Documentation' },
            { num: 3, label: 'Review & Publish' }
          ].map((s) => (
            <div key={s.num} className="flex-1 relative">
              <div className={`flex items-center ${s.num !== 3 ? 'after:content-[""] after:h-px after:flex-1 after:mx-4 after:bg-zinc-800' : ''}`}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step === s.num
                    ? 'bg-green-500 text-white'
                    : step > s.num
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {step > s.num ? (
                    <Icon icon="heroicons:check" className="w-5 h-5" />
                  ) : (
                    s.num
                  )}
                </div>
                <span className={`ml-3 text-sm ${
                  step >= s.num ? 'text-zinc-300' : 'text-zinc-500'
                }`}>
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                {/* Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Component Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: 'AGENT', label: 'AI Agent', icon: 'streamline-emojis:robot-face-1' },
                      { value: 'TOOL', label: 'Tool', icon: 'heroicons:wrench-screwdriver' },
                      { value: 'WORKFLOW', label: 'Workflow', icon: 'heroicons:command-line' }
                    ].map((type) => (
                      <label
                        key={type.value}
                        className={`relative flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer border ${
                          formData.type === type.value
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-zinc-700 hover:bg-zinc-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name="type"
                          value={type.value}
                          checked={formData.type === type.value}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="sr-only"
                        />
                        <Icon icon={type.icon} className="w-8 h-8 text-green-500" />
                        <span className="text-sm text-zinc-300">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Basic Info */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Component Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                      focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Research Assistant Pro"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                      focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Describe your component..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Version
                    </label>
                    <input
                      type="text"
                      value={formData.version}
                      onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                        focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="1.0.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Price (Optional)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                        focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Upload Files
                  </label>
                  <TWFileInput
                    accept=".py,.json,.yaml,.md"
                    onChange={(e) => setFormData({ ...formData, files: e.target.files })}
                  />
                  <p className="mt-2 text-sm text-zinc-500">
                    Supported formats: Python files, JSON, YAML, Markdown
                  </p>
                </div>

                {/* Documentation */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Documentation
                  </label>
                  <textarea
                    rows={8}
                    className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                      focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="# Getting Started..."
                  />
                  <p className="mt-2 text-sm text-zinc-500">
                    Supports Markdown formatting
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800">
                    <span className="text-zinc-400">Type</span>
                    <span className="text-zinc-100">{formData.type}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800">
                    <span className="text-zinc-400">Name</span>
                    <span className="text-zinc-100">{formData.name}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800">
                    <span className="text-zinc-400">Version</span>
                    <span className="text-zinc-100">{formData.version}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-800">
                    <span className="text-zinc-400">Price</span>
                    <span className="text-zinc-100">
                      {formData.price ? `$${formData.price}` : 'Free'}
                    </span>
                  </div>
                </div>

                {/* Terms */}
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-zinc-700 text-green-500 focus:ring-green-500"
                    />
                    <span className="text-sm text-zinc-300">
                      I confirm that this component complies with Upstrima's marketplace guidelines
                      and I have the rights to distribute this content.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-zinc-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-zinc-300 hover:text-white"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              
              <button
                type="button"
                onClick={() => {
                  if (step < 3) {
                    setStep(step + 1);
                  } else {
                    // Submit form
                  }
                }}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg 
                  hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Icon icon="heroicons:arrow-path" className="w-5 h-5 animate-spin" />
                    <span>Publishing...</span>
                  </div>
                ) : (
                  <span>{step === 3 ? 'Publish' : 'Continue'}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistryPublishPage;
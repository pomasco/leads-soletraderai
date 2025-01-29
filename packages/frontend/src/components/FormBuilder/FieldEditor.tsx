import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { FormFieldConfig } from '../../lib/formBuilder/types';

interface FieldEditorProps {
  field: FormFieldConfig;
  onUpdate: (id: string, updates: Partial<FormFieldConfig>) => void;
  onDelete: (id: string) => void;
}

const FieldEditor: React.FC<FieldEditorProps> = ({ field, onUpdate, onDelete }) => {
  const handleChange = (key: string, value: any) => {
    onUpdate(field.id, { [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Edit Field</h2>
        <motion.button
          onClick={() => onDelete(field.id)}
          className="text-red-500 hover:text-red-600 p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="space-y-4">
        {/* Label */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => handleChange('label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={field.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
          />
        </div>

        {/* Required Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="required"
            checked={field.required}
            onChange={(e) => handleChange('required', e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="required" className="text-sm text-gray-700">
            Required field
          </label>
        </div>

        {/* Field-specific settings */}
        {field.type === 'text' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Placeholder
              </label>
              <input
                type="text"
                value={field.placeholder || ''}
                onChange={(e) => handleChange('placeholder', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Length
                </label>
                <input
                  type="number"
                  value={field.minLength || ''}
                  onChange={(e) => handleChange('minLength', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Length
                </label>
                <input
                  type="number"
                  value={field.maxLength || ''}
                  onChange={(e) => handleChange('maxLength', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        )}

        {field.type === 'number' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Value
              </label>
              <input
                type="number"
                value={field.min || ''}
                onChange={(e) => handleChange('min', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Value
              </label>
              <input
                type="number"
                value={field.max || ''}
                onChange={(e) => handleChange('max', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}

        {field.type === 'select' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options
            </label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) => {
                      const newOptions = [...(field.options || [])];
                      newOptions[index] = {
                        ...newOptions[index],
                        label: e.target.value,
                        value: e.target.value.toLowerCase()
                      };
                      handleChange('options', newOptions);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={() => {
                      const newOptions = field.options?.filter((_, i) => i !== index);
                      handleChange('options', newOptions);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newOptions = [...(field.options || []), { label: '', value: '' }];
                  handleChange('options', newOptions);
                }}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                + Add Option
              </button>
            </div>
          </div>
        )}

        {field.type === 'keywords' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Keywords
            </label>
            <input
              type="number"
              value={field.maxItems || ''}
              onChange={(e) => handleChange('maxItems', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldEditor;
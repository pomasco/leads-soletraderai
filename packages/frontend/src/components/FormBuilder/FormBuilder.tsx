import React from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Settings, Save } from 'lucide-react';
import { FormConfig, FormFieldConfig } from '../../lib/formBuilder/types';
import FieldEditor from './FieldEditor';
import { supabase } from '../../lib/supabase';

interface FormBuilderProps {
  agentId: string;
  initialConfig?: FormConfig;
  onSave: (config: FormConfig) => Promise<void>;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ agentId, initialConfig, onSave }) => {
  const [formConfig, setFormConfig] = React.useState<FormConfig>(initialConfig || {
    id: crypto.randomUUID(),
    name: 'New Form',
    fields: [],
    validation: {},
    metadata: {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      author: ''
    }
  });

  const [selectedField, setSelectedField] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const fields = Array.from(formConfig.fields);
    const [reorderedField] = fields.splice(result.source.index, 1);
    fields.splice(result.destination.index, 0, reorderedField);

    // Update order numbers
    const updatedFields = fields.map((field, index) => ({
      ...field,
      order: index
    }));

    setFormConfig({
      ...formConfig,
      fields: updatedFields
    });
  };

  const addField = (type: string) => {
    const newField: FormFieldConfig = {
      id: crypto.randomUUID(),
      type,
      label: `New ${type} Field`,
      required: false,
      order: formConfig.fields.length,
      description: ''
    };

    setFormConfig({
      ...formConfig,
      fields: [...formConfig.fields, newField]
    });
    setSelectedField(newField.id);
  };

  const updateField = (fieldId: string, updates: Partial<FormFieldConfig>) => {
    setFormConfig({
      ...formConfig,
      fields: formConfig.fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    });
  };

  const deleteField = (fieldId: string) => {
    setFormConfig({
      ...formConfig,
      fields: formConfig.fields.filter(field => field.id !== fieldId)
    });
    setSelectedField(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({
        ...formConfig,
        metadata: {
          ...formConfig.metadata,
          lastUpdated: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error saving form:', error);
      // Show error notification
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-full">
      {/* Field List */}
      <div className="w-1/4 bg-white border-r border-gray-200 p-4">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Add Fields</h2>
          <div className="grid grid-cols-2 gap-2">
            {['text', 'number', 'select', 'location', 'keywords'].map(type => (
              <motion.button
                key={type}
                onClick={() => addField(type)}
                className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 
                         transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                {type}
              </motion.button>
            ))}
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {formConfig.fields.map((field, index) => (
                  <Draggable
                    key={field.id}
                    draggableId={field.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-3 bg-white border rounded-lg cursor-pointer
                                ${selectedField === field.id ? 'border-blue-500' : 'border-gray-200'}`}
                        onClick={() => setSelectedField(field.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{field.label}</span>
                          <Settings className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Field Editor */}
      <div className="flex-1 p-4">
        {selectedField ? (
          <FieldEditor
            field={formConfig.fields.find(f => f.id === selectedField)!}
            onUpdate={updateField}
            onDelete={deleteField}
          />
        ) : (
          <div className="text-center text-gray-500 mt-8">
            Select a field to edit its properties
          </div>
        )}
      </div>

      {/* Save Button */}
      <motion.button
        onClick={handleSave}
        disabled={isSaving}
        className="fixed bottom-4 right-4 btn-primary flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSaving ? (
          <>
            <span className="animate-spin">⌛</span>
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Save Form
          </>
        )}
      </motion.button>
    </div>
  );
};

export default FormBuilder;
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

interface EditableFieldProps {
  name: string;
  value: string | number | boolean;
  type?: "text" | "number" | "select" | "boolean";
  options?: string[];
  onSave: (value: string | number | boolean) => void;
  editable?: boolean;
}

function EditableField({
  name,
  value,
  type = "text",
  options = [],
  onSave,
  editable = true,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (editValue === value) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving field:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const displayValue = () => {
    if (type === "boolean") {
      return value ? "Yes" : "No";
    }
    return value || "/";
  };

  if (!editable) {
    return (
      <div>
        <label className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          {name}
        </label>
        <p className="text-white font-medium">{displayValue()}</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div>
        <label className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          {name}
        </label>
        <div className="flex items-center gap-2 mt-1">
          {type === "select" ? (
            <select
              value={String(editValue)}
              onChange={(e) => setEditValue(e.target.value)}
              className=""
              disabled={isSaving}
              autoFocus
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : type === "boolean" ? (
            <select
              value={String(editValue)}
              onChange={(e) => setEditValue(e.target.value === "true")}
              className=""
              disabled={isSaving}
              autoFocus
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          ) : (
            <input
              type={type}
              value={String(editValue)}
              onChange={(e) =>
                setEditValue(
                  type === "number" ? Number(e.target.value) : e.target.value,
                )
              }
              className=""
              disabled={isSaving}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
            />
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className=""
            title="Save"
          >
            <CheckIcon fontSize="small" />
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className=""
            title="Cancel"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
        {name}
      </label>
      <div className="flex items-center gap-2 group w-fit">
        <p className="text-white font-medium flex-1">{displayValue()}</p>
        {/* <button
          // onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100  text-dark-CTA-bg"
          title="Edit"
        >
          <EditIcon fontSize="small" />
        </button> */}
      </div>
    </div>
  );
}

export default EditableField;

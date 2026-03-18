import { X, Loader2, ExternalLink, CheckCircle, XCircle } from "lucide-react";

const SuggestionModal = ({ isOpen, onClose, suggestion, isLoading }) => {
  if (!isOpen) return null;

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - more compact */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Suggestion Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body - reduced padding */}
        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            </div>
          ) : suggestion ? (
            <div className="space-y-3">
              {/* Two-column details with smaller text and gap */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="text-xs text-gray-500">Course Code</label>
                  <p className="font-medium">{suggestion.course_code}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Course Name</label>
                  <p className="font-medium">{suggestion.course_name}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Department</label>
                  <p className="truncate">{suggestion.dept || "—"}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Intake</label>
                  <p>{suggestion.intake || "—"}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Section</label>
                  <p>{suggestion.section || "—"}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Exam Type</label>
                  <p>{suggestion.exam_type || "—"}</p>
                </div>
              </div>

              {/* Description with less padding */}
              <div>
                <label className="text-xs text-gray-500">Description</label>
                <p className="bg-gray-50 p-2 rounded text-sm">{suggestion.description}</p>
              </div>

              {/* Attachment button - contains the URL */}
              {suggestion.attachment_url && (
                <div>
                  <label className="text-xs text-gray-500">Attachment</label>
                  <a
                    href={suggestion.attachment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="truncate flex-1">{suggestion.attachment_url}</span>
                    <ExternalLink className="h-4 w-4 shrink-0" />
                  </a>
                </div>
              )}

              {/* Metadata grid - more compact */}
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                <div>
                  <label className="text-xs text-gray-500">Stars</label>
                  <p>{suggestion.stars || 0}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Votes</label>
                  <p>{suggestion.votedBy?.length || 0}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Uploaded By</label>
                  <p className="truncate">{suggestion.uploaded_by?.name || suggestion.uploaded_by || "—"}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Status</label>
                  <p className="capitalize">{suggestion.status}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Created</label>
                  <p>{formatDate(suggestion.createdAt)}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Updated</label>
                  <p>{formatDate(suggestion.updatedAt)}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4 text-sm">No details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionModal;
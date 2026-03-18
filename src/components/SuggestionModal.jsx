import { X, Loader2 } from "lucide-react";

const SuggestionModal = ({ isOpen, onClose, suggestion, isLoading, onApprove, onReject }) => {
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
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Suggestion Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : suggestion ? (
            <div className="space-y-4">
              {/* Two-column details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Course Code</label>
                  <p className="font-medium">{suggestion.course_code}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Course Name</label>
                  <p className="font-medium">{suggestion.course_name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Department</label>
                  <p>{suggestion.dept || "—"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Intake</label>
                  <p>{suggestion.intake || "—"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Section</label>
                  <p>{suggestion.section || "—"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Exam Type</label>
                  <p>{suggestion.exam_type || "—"}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-gray-500">Description</label>
                <p className="bg-gray-50 p-3 rounded-lg">{suggestion.description}</p>
              </div>

              {/* Attachment */}
              {suggestion.attachment_url && (
                <div>
                  <label className="text-sm text-gray-500">Attachment</label>
                  <a
                    href={suggestion.attachment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:underline break-all"
                  >
                    {suggestion.attachment_url}
                  </a>
                </div>
              )}

              {/* Metadata grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Stars</label>
                  <p>{suggestion.stars || 0}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Votes</label>
                  <p>{suggestion.votedBy?.length || 0}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Uploaded By</label>
                  <p>{suggestion.uploaded_by?.name || suggestion.uploaded_by || "—"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Status</label>
                  <p className="capitalize">{suggestion.status}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Created</label>
                  <p>{formatDate(suggestion.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Last Updated</label>
                  <p>{formatDate(suggestion.updatedAt)}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  onClick={() => onApprove(suggestion._id)}
                >
                  Approve
                </button>
                <button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  onClick={() => onReject(suggestion._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionModal;
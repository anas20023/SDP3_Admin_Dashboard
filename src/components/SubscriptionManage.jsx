import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BadgeDollarSign,
  CalendarDays,
  CheckCircle2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { manageApi } from "../services/api";
import DataTable from "./common/DataTable";
import StatsCard from "./common/StatsCard";
import { useToast } from "../context/ToastContext";

const defaultForm = {
  name: "",
  price: 0,
  durationInDays: 30,
  downloadLimit: 0,
  features: "",
  isActive: true,
};

const normalizeSubscriptions = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.subscriptions)) {
    return payload.subscriptions;
  }

  return [];
};

const renderValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "—";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
};

const SubscriptionModal = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  isSaving,
  mode,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {mode === "create" ? "Create Subscription Plan" : "Edit Subscription Plan"}
          </h3>
          <button
            type="button"
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="size-4" />
          </button>
        </div>

        <form className="space-y-4 p-6" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="form-control">
              <span className="mb-2 text-sm font-medium text-gray-700">Plan Name</span>
              <input
                className="input input-bordered"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Premium"
                required
              />
            </label>

            <label className="form-control">
              <span className="mb-2 text-sm font-medium text-gray-700">Price</span>
              <input
                className="input input-bordered"
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-control">
              <span className="mb-2 text-sm font-medium text-gray-700">Duration In Days</span>
              <input
                className="input input-bordered"
                name="durationInDays"
                type="number"
                min="1"
                value={form.durationInDays}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-control">
              <span className="mb-2 text-sm font-medium text-gray-700">Download Limit</span>
              <input
                className="input input-bordered"
                name="downloadLimit"
                type="number"
                min="0"
                value={form.downloadLimit}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="form-control">
            <span className="mb-2 text-sm font-medium text-gray-700">Features</span>
            <textarea
              className="textarea textarea-bordered min-h-32"
              name="features"
              value={form.features}
              onChange={handleChange}
              placeholder={"Unlimited suggestions view\n50 downloads per month\nPriority support"}
              required
            />
            <span className="mt-2 text-xs text-gray-500">Enter one feature per line.</span>
          </label>

          <label className="inline-flex items-center gap-3">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            <span className="text-sm font-medium text-gray-700">Plan is active</span>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : mode === "create" ? (
                "Create Plan"
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SubscriptionManage = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [form, setForm] = useState(defaultForm);

  const {
    data: subscriptionsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: manageApi.getSubscriptions,
  });

  const subscriptions = useMemo(
    () => normalizeSubscriptions(subscriptionsResponse),
    [subscriptionsResponse]
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSubscription(null);
    setForm(defaultForm);
  };

  const createMutation = useMutation({
    mutationFn: manageApi.createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      showToast("Subscription plan created successfully", "success");
      handleCloseModal();
    },
    onError: (mutationError) => {
      showToast(
        mutationError?.response?.data?.message || "Failed to create subscription plan",
        "error"
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => manageApi.updateSubscription(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      showToast("Subscription plan updated successfully", "success");
      handleCloseModal();
    },
    onError: (mutationError) => {
      showToast(
        mutationError?.response?.data?.message || "Failed to update subscription plan",
        "error"
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: manageApi.deleteSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      showToast("Subscription plan deleted successfully", "success");
    },
    onError: (mutationError) => {
      showToast(
        mutationError?.response?.data?.message || "Failed to delete subscription plan",
        "error"
      );
    },
  });

  const handleCreate = () => {
    setEditingSubscription(null);
    setForm(defaultForm);
    setIsModalOpen(true);
  };

  const handleEdit = (subscription) => {
    setEditingSubscription(subscription);
    setForm({
      name: subscription.name || "",
      price: subscription.price ?? 0,
      durationInDays: subscription.durationInDays ?? 30,
      downloadLimit: subscription.downloadLimit ?? 0,
      features: Array.isArray(subscription.features)
        ? subscription.features.join("\n")
        : "",
      isActive: Boolean(subscription.isActive),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (subscription) => {
    if (window.confirm(`Delete "${subscription.name}" subscription plan?`)) {
      deleteMutation.mutate(subscription._id);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      durationInDays: Number(form.durationInDays),
      downloadLimit: Number(form.downloadLimit),
      features: form.features
        .split("\n")
        .map((feature) => feature.trim())
        .filter(Boolean),
      isActive: Boolean(form.isActive),
    };

    if (!payload.name || payload.features.length === 0) {
      showToast("Name and at least one feature are required", "warning");
      return;
    }

    if (editingSubscription?._id) {
      updateMutation.mutate({ id: editingSubscription._id, data: payload });
      return;
    }

    createMutation.mutate(payload);
  };

  const filteredSubscriptions = useMemo(() => {
    if (!searchTerm.trim()) {
      return subscriptions;
    }

    const normalizedQuery = searchTerm.toLowerCase();

    return subscriptions.filter((subscription) =>
      Object.values(subscription || {}).some((value) =>
        renderValue(value).toLowerCase().includes(normalizedQuery)
      )
    );
  }, [searchTerm, subscriptions]);

  const activePlans = useMemo(
    () => subscriptions.filter((subscription) => subscription.isActive).length,
    [subscriptions]
  );

  const columns = useMemo(
    () => [
      { key: "name", label: "Plan Name" },
      {
        key: "price",
        label: "Price",
        render: (value) => `BDT ${Number(value || 0).toLocaleString()}`,
      },
      { key: "durationInDays", label: "Duration (Days)" },
      { key: "downloadLimit", label: "Download Limit" },
      {
        key: "features",
        label: "Features",
        render: (value) => (
          <div className="max-w-md whitespace-normal text-sm leading-6">
            {Array.isArray(value) && value.length > 0 ? value.join(", ") : "—"}
          </div>
        ),
      },
      {
        key: "isActive",
        label: "Status",
        render: (value) => (
          <span className={`badge ${value ? "badge-success" : "badge-ghost"}`}>
            {value ? "Active" : "Inactive"}
          </span>
        ),
      },
    ],
    []
  );

  const actions = (subscription) => (
    <div className="flex justify-end gap-2">
      <button
        className="btn btn-ghost btn-xs text-info hover:bg-info/10"
        onClick={() => handleEdit(subscription)}
        title="Edit Plan"
      >
        <Pencil size={16} />
      </button>
      <button
        className="btn btn-ghost btn-xs text-error hover:bg-error/10"
        onClick={() => handleDelete(subscription)}
        title="Delete Plan"
        disabled={deleteMutation.isPending}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-4">
        <div className="alert alert-error">
          <span>Failed to load subscriptions: {error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-4 bg-slate-50 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          title="Total Plans"
          value={subscriptions.length}
          icon={BadgeDollarSign}
          colorClass="blue-500"
        />
        <StatsCard
          title="Active Plans"
          value={activePlans}
          icon={CheckCircle2}
          colorClass="green-500"
        />
        <StatsCard
          title="Visible Rows"
          value={filteredSubscriptions.length}
          icon={CalendarDays}
          colorClass="amber-500"
        />
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Subscription Plans</h2>
          <button className="btn btn-primary gap-2" onClick={handleCreate}>
            <Plus className="size-4" />
            Add Plan
          </button>
        </div>

        <DataTable
          columns={columns}
          data={filteredSubscriptions}
          onSearch={setSearchTerm}
          isLoading={isLoading}
          actions={actions}
        />
      </div>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        isSaving={createMutation.isPending || updateMutation.isPending}
        mode={editingSubscription ? "edit" : "create"}
      />
    </div>
  );
};

export default SubscriptionManage;

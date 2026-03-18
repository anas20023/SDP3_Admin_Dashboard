const DashboardRouteLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-sm font-medium text-base-content/70">Loading dashboard...</p>
      </div>
    </div>
  )
}

export default DashboardRouteLoader

import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, BarChart as BarChartComponent, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Eye, Users, TrendingUp, Phone, MessageSquare, LogOut, Lock, Calendar, Star } from "lucide-react";
import ReportGenerator from "@/components/ReportGenerator";
import { toast } from "sonner";

const COLORS = ["#a61c00", "#1e3450", "#f59e0b", "#10b981"];

export default function Dashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [passwordInput, setPasswordInput] = useState("");
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Calculate default date range (last 7 days)
  const getDefaultDates = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return {
      start: sevenDaysAgo.toISOString().split("T")[0],
      end: today.toISOString().split("T")[0],
    };
  };

  const defaults = getDefaultDates();
  const queryStartDate = startDate || defaults.start;
  const queryEndDate = endDate || defaults.end;

  const { data: analytics, isLoading: analyticsLoading, refetch } = trpc.dashboard.getAnalytics.useQuery(
    {
      startDate: queryStartDate,
      endDate: queryEndDate,
    },
    {
      enabled: isPasswordVerified || (isAuthenticated && user?.role === "admin"),
    }
  );

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dashboardPassword = process.env.REACT_APP_DASHBOARD_PASSWORD || "Maldonado";

    if (passwordInput === dashboardPassword) {
      setIsPasswordVerified(true);
      setPasswordInput("");
      toast.success("Password verified!");
    } else {
      toast.error("Incorrect password");
      setPasswordInput("");
    }
  };

  const resetConversions = trpc.dashboard.resetConversions.useMutation({
    onSuccess: () => {
      toast.success("Conversion numbers reset successfully");
      // Refetch analytics data
      setTimeout(() => refetch(), 500);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to reset conversions");
    },
  });

  const handleResetConversions = async () => {
    if (confirm("Are you sure you want to reset quote requests, contact forms, and phone calls to 0? This cannot be undone.")) {
      resetConversions.mutate({
        eventTypes: ["quote_request", "contact_form", "phone_call"],
      });
    }
  };

  const handleResetDates = () => {
    setStartDate("");
    setEndDate("");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8">
          <p className="text-gray-600">Loading...</p>
        </Card>
      </div>
    );
  }

  // Password verification for non-admin users
  if (!isPasswordVerified && (!isAuthenticated || user?.role !== "admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3450] to-[#a61c00] p-4">
        <Card className="w-full max-w-md p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Lock className="w-12 h-12 text-[#a61c00]" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-[#1e3450]">Analytics Dashboard</h1>
            <p className="text-gray-600">Enter password to access</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter dashboard password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a61c00] focus:border-transparent outline-none"
              />
            </div>

            <Button
              type="submit"
              disabled={!passwordInput}
              className="w-full bg-[#a61c00] hover:bg-[#8b1600] text-white"
            >
              Verify Password
            </Button>
          </form>

          {!isAuthenticated && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Or login as admin:</p>
              <Button
                onClick={() => window.location.href = getLoginUrl()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Login with Manus
              </Button>
            </div>
          )}

          {isAuthenticated && user?.role === "admin" && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Admin Access</p>
              <Button
                onClick={logout}
                variant="outline"
                className="w-full"
              >
                Logout
              </Button>
            </div>
          )}
        </Card>
      </div>
    );
  }

  if (analyticsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8">
          <p className="text-gray-600">Loading analytics...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#1e3450]">Analytics Dashboard</h1>
          <div className="flex items-center gap-3">
            {isAuthenticated && user?.role === "admin" && <ReportGenerator />}
            <Button
              onClick={() => {
                if (isAuthenticated) {
                  logout();
                } else {
                  setIsPasswordVerified(false);
                  setPasswordInput("");
                }
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              {isAuthenticated ? "Logout" : "Exit"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
        {/* Date Range Filter */}
        <Card className="p-6 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#a61c00]" />
              <span className="font-medium text-gray-700">Date Range:</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div>
                <label htmlFor="start-date" className="block text-sm text-gray-600 mb-1">
                  Start Date
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a61c00] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm text-gray-600 mb-1">
                  End Date
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a61c00] focus:border-transparent outline-none"
                />
              </div>
              <div className="pt-6">
                <Button
                  onClick={handleResetDates}
                  variant="outline"
                  className="text-sm"
                >
                  Reset to Last 7 Days
                </Button>
              </div>
            </div>
            <div className="text-sm text-gray-500 ml-auto">
              Showing data from {queryStartDate} to {queryEndDate}
            </div>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Visitors</p>
                <p className="text-3xl font-bold text-[#1e3450] mt-2">{analytics?.totalVisitors.toLocaleString()}</p>
              </div>
              <Users className="w-12 h-12 text-[#a61c00] opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Page Views</p>
                <p className="text-3xl font-bold text-[#1e3450] mt-2">{analytics?.pageViews.toLocaleString()}</p>
              </div>
              <Eye className="w-12 h-12 text-[#a61c00] opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Bounce Rate</p>
                <p className="text-3xl font-bold text-[#1e3450] mt-2">{analytics?.bounceRate}%</p>
              </div>
              <TrendingUp className="w-12 h-12 text-[#a61c00] opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Session</p>
                <p className="text-3xl font-bold text-[#1e3450] mt-2">{analytics?.avgSessionDuration}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-[#a61c00] opacity-20" />
            </div>
          </Card>
        </div>

        {/* Conversions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Quote Requests</p>
                <p className="text-3xl font-bold text-[#1e3450] mt-2">{analytics?.conversions.quoteRequests}</p>
              </div>
              <MessageSquare className="w-12 h-12 text-[#a61c00] opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Contact Forms</p>
                <p className="text-3xl font-bold text-[#1e3450] mt-2">{analytics?.conversions.contactFormSubmissions}</p>
              </div>
              <MessageSquare className="w-12 h-12 text-[#a61c00] opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Phone Calls</p>
                <p className="text-3xl font-bold text-[#1e3450] mt-2">{analytics?.conversions.phoneCallsTracked}</p>
              </div>
              <Phone className="w-12 h-12 text-[#a61c00] opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Facebook Clicks</p>
                <p className="text-3xl font-bold text-[#1e3450] mt-2">{analytics?.conversions.facebookClicks}</p>
              </div>
              <MessageSquare className="w-12 h-12 text-[#a61c00] opacity-20" />
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Google Review Clicks</p>
                <p className="text-3xl font-bold text-[#1e3450] mt-2">{analytics?.conversions.googleReviewClicks}</p>
              </div>
              <Star className="w-12 h-12 text-[#a61c00] opacity-20" />
            </div>
          </Card>
        </div>

        {/* Reset Conversions Button - Admin Only */}
        {isAuthenticated && user?.role === "admin" && (
          <div className="mb-8">
            <Button
              onClick={handleResetConversions}
              variant="destructive"
              disabled={resetConversions.isPending}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resetConversions.isPending ? "Resetting..." : "Reset Conversion Numbers"}
            </Button>
            <p className="text-sm text-gray-500 mt-2">This will reset quote requests, contact forms, and phone calls to 0</p>
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Visitors Chart */}
          <Card className="p-6 bg-white shadow-sm">
            <h2 className="text-lg font-bold text-[#1e3450] mb-4">Daily Visitors</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics?.dailyVisitors || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#a61c00" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Traffic Sources */}
          <Card className="p-6 bg-white shadow-sm">
            <h2 className="text-lg font-bold text-[#1e3450] mb-4">Traffic Sources</h2>
            <div className="space-y-3">
              {analytics?.trafficSources.map((source, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="text-gray-700 font-medium">{source.source}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${source.percentage}%`,
                          backgroundColor: COLORS[idx % COLORS.length],
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{source.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Device Breakdown */}
        <Card className="p-6 bg-white shadow-sm mb-8">
          <h2 className="text-lg font-bold text-[#1e3450] mb-4">Device Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChartComponent data={analytics?.deviceBreakdown || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="device" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visitors" fill="#a61c00" />
            </BarChartComponent>
          </ResponsiveContainer>
        </Card>

        {/* Top Pages */}
        <Card className="p-6 bg-white shadow-sm">
          <h2 className="text-lg font-bold text-[#1e3450] mb-4">Top Pages</h2>
          <div className="space-y-3">
            {analytics?.topPages.map((page, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="text-gray-700">{page.path}</span>
                <div className="flex gap-4">
                  <span className="text-sm text-gray-600">{page.views} views</span>
                  <span className="text-sm text-gray-600">{page.visitors} visitors</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

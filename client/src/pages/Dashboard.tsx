import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Eye, Users, TrendingUp, Phone, MessageSquare, LogOut, Lock } from "lucide-react";

const COLORS = ["#a61c00", "#1e3450", "#f59e0b", "#10b981"];

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyPasswordMutation = trpc.dashboard.verifyPassword.useMutation();
  const { data: analytics } = trpc.dashboard.getAnalytics.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await verifyPasswordMutation.mutateAsync({ password });
      if (result.isValid) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3450] to-[#a61c00] p-4">
        <Card className="w-full max-w-md p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-[#a61c00] text-white p-4 rounded-full">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center mb-2 text-[#1e3450]">Analytics Dashboard</h1>
          <p className="text-center text-gray-600 mb-6">Enter your password to access analytics</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter dashboard password"
                disabled={loading}
                className="w-full"
              />
            </div>

            {error && <div className="p-3 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

            <Button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-[#a61c00] hover:bg-[#8b1600] text-white"
            >
              {loading ? "Verifying..." : "Access Dashboard"}
            </Button>
          </form>
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
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Visitors Chart */}
          <Card className="p-6 bg-white shadow-sm">
            <h2 className="text-xl font-bold text-[#1e3450] mb-4">Daily Visitors</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics?.dailyVisitors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#a61c00" strokeWidth={2} dot={{ fill: "#a61c00" }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Device Breakdown */}
          <Card className="p-6 bg-white shadow-sm">
            <h2 className="text-xl font-bold text-[#1e3450] mb-4">Device Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics?.deviceBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ device, percentage }) => `${device} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {analytics?.deviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Traffic Sources */}
          <Card className="p-6 bg-white shadow-sm">
            <h2 className="text-xl font-bold text-[#1e3450] mb-4">Traffic Sources</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics?.trafficSources}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#a61c00" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Pages */}
          <Card className="p-6 bg-white shadow-sm">
            <h2 className="text-xl font-bold text-[#1e3450] mb-4">Top Pages</h2>
            <div className="space-y-3">
              {analytics?.topPages.map((page, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{page.path}</p>
                    <p className="text-sm text-gray-600">{page.visitors} visitors</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#a61c00]">{page.views}</p>
                    <p className="text-xs text-gray-600">views</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Conversions */}
        <Card className="p-6 bg-white shadow-sm">
          <h2 className="text-xl font-bold text-[#1e3450] mb-6">Conversions & Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Quote Requests</p>
                  <p className="text-2xl font-bold text-blue-900">{analytics?.conversions.quoteRequests}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-600 font-medium">Contact Forms</p>
                  <p className="text-2xl font-bold text-green-900">{analytics?.conversions.contactFormSubmissions}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3">
                <Phone className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">Phone Calls</p>
                  <p className="text-2xl font-bold text-purple-900">{analytics?.conversions.phoneCallsTracked}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

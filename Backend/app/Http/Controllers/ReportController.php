<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Report;
use App\Models\Reservation;
use App\Models\DiningTable;
use App\Models\Users;
use Illuminate\Support\Facades\DB; 
use Carbon\Carbon;



class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::all();
        return response()->json(['reports' => $reports]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'report_type' => 'required|string',
        ]);

        $reportType = $data['report_type'];
        $content = '';

        switch ($reportType) {
            case 'reservation_volume':
                $count = Reservation::count();
                $content = "Total reservations: $count";
                break;

            case 'today_reservations':
                $count = Reservation::whereDate('created_at', now())->count();
                $content = "Today's reservations: $count";
                break;

            case 'table_utilization':
                $occupiedTables = DiningTable::where('status', true)->count();
                $totalTables = DiningTable::count();
                $rate = $totalTables ? round(($occupiedTables / $totalTables) * 100, 2) : 0;
                $content = "Current table utilization: $rate%";
                break;

            case 'weekly_reservations':
                $weeklyReservations = DB::table('reservation')
                    ->select(DB::raw("DATE_TRUNC('week', reservation_date) as week_start"), DB::raw('count(*) as total'))
                    ->groupBy('week_start')
                    ->orderBy('week_start', 'desc')
                    ->get();

                $content = "Weekly reservations report:\n";
                foreach ($weeklyReservations as $week) {
                    $weekStart = date('Y-m-d', strtotime($week->week_start));
                    $content .= "Week starting $weekStart: $week->total reservation\n";
                }
                break;

            case 'reservation_by_time':
                $reservationsByTime = DB::table('reservation')
                    ->select(DB::raw("TO_CHAR(reservation_time, 'HH24:00') as hour_slot"), DB::raw('count(*) as total'))
                    ->groupBy('hour_slot')
                    ->orderBy('hour_slot')
                    ->get();

                $content = "Reservations by Time Slot:\n";
                foreach ($reservationsByTime as $row) {
                    $content .= "{$row->hour_slot}: {$row->total} reservation\n";
                }
                break;

            case 'empty_tables':
                $emptyTables = DiningTable::where('status', false)->count();
                $content = "Number of empty tables: $emptyTables";
                break;

            case 'user_role_active_report':
                $totalUsers = Users::count();
                $roleCounts = Users::select('roletype')
                    ->selectRaw('count(*) as total')
                    ->groupBy('roletype')
                    ->get();
                $activeUsersCount = Users::where('is_active', true)->count();

                $content = "Total users: $totalUsers\n";
                $content .= "Active users: $activeUsersCount\n";
                $content .= "Users by role_type:\n";
                foreach ($roleCounts as $role) {
                    $content .= "- {$role->roletype}: {$role->total}\n";
                }
                break;

            case 'cancelled_reservations_by_day':
                $startOfWeek = Carbon::now()->startOfWeek();
                $endOfWeek = Carbon::now()->endOfWeek();

                $cancelledCounts = Reservation::selectRaw('DATE(reservation_date) as day, count(*) as total')
                    ->where('status', 'Cancelled')
                    ->whereBetween('reservation_date', [$startOfWeek, $endOfWeek])
                    ->groupBy('day')
                    ->orderBy('day')
                    ->get();

                $content = "Cancelled Reservations by Day (This Week):\n";
                foreach ($cancelledCounts as $dayCount) {
                    $content .= $dayCount->day . ": " . $dayCount->total . "\n";
                }
                break;

            case 'cancelled_reservations_total':
                $cancelledCount = Reservation::where('status', 'Cancelled')->count();
                $content = "Total Cancelled Reservations: $cancelledCount";
                break;

            case 'Confirmed_reservations_total':
                $confirmedCount = Reservation::where('status', 'Confirmed')->count();
                $content = "Total Confirmed Reservations: $confirmedCount";
                break;

            case 'cancelled_reservations_today':
                $cancelledToday = Reservation::where('status', 'Cancelled')
                    ->whereDate('reservation_date', Carbon::today())
                    ->count();
                $content = "Cancelled Reservations Today: $cancelledToday";
                break;

            default:
                $content = "No report logic found for type: $reportType";
        }

        $data['content'] = $content;
        $data['user_id'] = auth()->check() ? auth()->id() : null;
        $data['generated_at'] = now();

        $report = Report::create($data);

        return response()->json(['message' => 'Report created successfully', 'report' => $report]);
    }

    public function edit(Report $report)
    {
        return response()->json(['report' => $report]);
    }

    public function update(Report $report, Request $request)
    {
        $data = $request->validate([
            'report_type' => 'required|string',
            'content' => 'required|string',
        ]);

        $report->update($data);

        return response()->json(['message' => 'Report updated successfully', 'report' => $report]);
    }

    public function destroy(Report $report)
    {
        $report->delete();
        return response()->json(['message' => 'Report deleted successfully']);
    }

    public function show(Report $report)
    {
        return response()->json($report);
    }
}
